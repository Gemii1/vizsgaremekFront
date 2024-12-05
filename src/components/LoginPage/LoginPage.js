import styles from './LoginPage.module.css'
import * as React from 'react';
import Button from "@mui/material/Button";
import Input from '@mui/joy/Input';
import {useNavigate} from "react-router";
import {useState} from "react";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";


function LoginPage() {

    let navigate = useNavigate();
    const [users,setUsers] = useState();
    const [user, setUser] = React.useState({
        email: '',
        password: ''
    });



    const onSubmit = async () => {

       const respone =  await axios.get('http://localhost:8080/trainer/listAll')

        respone.data.map((user)=>{
            console.log(user.contact.email);
        })

    }

    const handleChange = (event) => {
        setUser(values => ({...values,
            [event.target.name]: event.target.value}))
    }

    return (
        <>
            <div  className={styles.login}>
                <div className={styles.container}>
                    <h3>Bejelentkezés</h3>
                    <div className={styles.inputs}>
                        <Input onChange={handleChange} name='email' type='email' placeholder="Emailcím"/>
                        <Input onChange={handleChange} name='password' type='password' placeholder="Jelszó"/>
                    </div>
                    <div className={styles.buttons}>
                        <Button className={styles.closeButton} variant="contained" color="error"
                                onClick={() => {
                                    navigate("/landingPage")
                                }}>Vissza</Button>
                        <Button className={styles.closeButton} variant="contained" color="info"
                                onClick={() => {
                                    onSubmit()
                                }}>Bejelentkezés</Button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default LoginPage;