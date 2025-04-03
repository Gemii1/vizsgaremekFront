import AuthContext from './AuthContext';
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import UserContext from "../User/UserContext";
function AuthProvider({children}) {

    const {setIsUserLoggedIn} = useContext(UserContext);

    const [accessToken, setAccessToken] = useState(' ');
    const login = async (email, password) => {
        try {
            const response = await axios.post('/auth/login', { email, password });
            const token = response.headers['jwt_token'];
            handleLoginData(token);

            return response.data;
        } catch (error) {
            console.error('Login Error:', error);
            throw error;
        }
    };
    const logout = () => {
        setAccessToken(' ');
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('access_token');
        setIsUserLoggedIn(false);
    };


    const handleLoginData = (jwtToken) => {
        setAccessToken(jwtToken);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwtToken;
        localStorage.setItem('access_token', jwtToken);
        setIsUserLoggedIn(true);
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('access_token');
        if (storedToken) {
            setAccessToken(storedToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            setIsUserLoggedIn(true);
        } else {
            logout();
        }
    }, []);

    return (
        <AuthContext.Provider value={{login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;