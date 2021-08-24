import React, {useState} from 'react'
import { AuthContext } from './AuthProvider';
import useFirestore from '../hooks/useFirestore';

export const AppContext = React.createContext();

export default function AppProvider({children}) {
    const [isAddRoomVisiable, setIsAddRoomVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');

    const {user:{uid}} = React.useContext(AuthContext);

    const roomsConditions = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    }, [uid]);

    const rooms = useFirestore('rooms', roomsConditions);

    return (
        <div>
            <AppContext.Provider value={{
                    rooms, 
                    isAddRoomVisiable, setIsAddRoomVisible,
                    selectedRoomId, setSelectedRoomId
                }}>
                {children}
            </AppContext.Provider>            
        </div>
    )
}
