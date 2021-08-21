import React, {useState} from 'react'
import {auth} from "../firebase/config";
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';

export const AuthContext = React.createContext();

export default function AuthProvider({children}) {
    const history = useHistory();
    
    const [user, setUser] = useState({});
    const [isLoading, setisLoading] = useState(true);

    React.useEffect(() => {
        const unsubcribed = auth.onAuthStateChanged((user) => {
            if (user) {
                const {displayName, email, uid, photoURL} = user;
                setUser(displayName, email, uid, photoURL);
                setisLoading(false);
                history.push("/");
                return;
            }

            setisLoading(false);
            history.push("/login");
        })

        // clean function
        return () => {
            unsubcribed();
        }
    }, [history]);

    return (
        <div>
            <AuthContext.Provider value={user}>
                {isLoading ? <Spin /> : children}
            </AuthContext.Provider>            
        </div>
    )
}
