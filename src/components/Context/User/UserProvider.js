import React, {useState} from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
    const [user, setUser] = useState([
        {email: ''},
    ]);
    return (
        <UserContext.Provider value={{userType,isUserLoggedIn, setIsUserLoggedIn, user, setUser,setUserType}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
