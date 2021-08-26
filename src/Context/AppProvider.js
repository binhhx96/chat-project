import React, {useState} from 'react'
import { AuthContext } from './AuthProvider';
import useFirestore from '../hooks/useFirestore';

export const AppContext = React.createContext();

export default function AppProvider({children}) {
    const [isAddRoomVisiable, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisiable, setIsInviteMemberVisible] = useState(false);
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

    const selectedRoom = React.useMemo(() => rooms.find(room => room.id === selectedRoomId), [rooms, selectedRoomId]);

    const membersConditions = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom ? selectedRoom.members : [],
        }
    }, [selectedRoom]);

    const members = useFirestore('users', membersConditions);

    return (
        <div>
            <AppContext.Provider value={{
                    rooms,members, 
                    isAddRoomVisiable, setIsAddRoomVisible,
                    isInviteMemberVisiable, setIsInviteMemberVisible,
                    selectedRoomId, setSelectedRoomId, selectedRoom
                }}>
                {children}
            </AppContext.Provider>            
        </div>
    )
}
