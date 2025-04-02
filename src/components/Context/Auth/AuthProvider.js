import AuthContext from './AuthContext';
import axios from "axios";
import * as response from "react-router";
function AuthProvider({children}) {
    let accesToken = '';
    const login = async (email, password) => {
        try {
            const response = await axios.post('/auth/login', { email, password });
            const token = response.headers['jwt_token'];

            handleLoginData(token);
            console.log('Response:', response);
            console.log('Token:', token);
            return response.data;
        } catch (error) {
            console.error('Login Error:', error);
            throw error;
        }
    };


    const handleLoginData = (jwtToken) => {
        accesToken = jwtToken;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + accesToken;
        localStorage.setItem('access_token', accesToken);
    }

    return (
        <AuthContext.Provider value={{login}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;