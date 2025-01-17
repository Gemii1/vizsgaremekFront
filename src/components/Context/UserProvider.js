import React, {useState} from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
    return (
        <UserContext.Provider value={{userType,isUserLoggedIn, setIsUserLoggedIn}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
