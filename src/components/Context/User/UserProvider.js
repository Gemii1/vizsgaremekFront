import React, {useState} from 'react';
import UserContext from './UserContext';
import axios from "axios";

const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
    const [user, setUser] = useState([
        {email: ''},
    ]);
    const fetchUser = async (usertype) => {
       try{
           if (usertype){
               const response = await axios.get(`/trainer/${user.id}`);
               setUser(response.data);
           }else {
               const response = await axios.get(`/client/${user.id}`);
               setUser(response.data);
           }

        }catch(err){
            console.log("Error fetching User"+err);
        }
    }

    const deleteUser = async (usertype) => {
        try{
            if (usertype){
                const response = await axios.delete(`/trainer/${user.id}`);
                setUser(response.data);
            }else {
                const response = await axios.delete(`/client/${user.id}`);
                setUser(response.data);
            }

        }catch(err){
            console.log("Error deleting User"+err);
        }
    }
    return (
        <UserContext.Provider value={{userType,isUserLoggedIn, setIsUserLoggedIn, user, setUser,setUserType, fetchUser, deleteUser}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
