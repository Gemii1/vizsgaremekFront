import styles from './LoginPage.module.css'
import * as React from 'react';
import Button from "@mui/material/Button";
import Input from '@mui/joy/Input';
import {useNavigate} from "react-router";
import {useState} from "react";
import axios from "axios";


function LoginPage() {

    let navigate = useNavigate();
    const [users,setUsers] = useState();
    const [user, setUser] = React.useState({
        email: '',
        password: ''
    });


    const onSubmit = () => {


        axios.get('http://localhost:8080/trainer/listAll').then(({data})=>{
            const users = data;
            setUsers(users);


        }).catch((error)=>{
            console.log(error)
        })

        setUser({
            email: users[1].email,
            password: users[1].password
        })
        console.log(user);
    }

    return (
        <>
            <div  className={styles.login}>
                <div className={styles.container}>
                    <h3>Bejelentkezés</h3>
                    <div className={styles.inputs}>
                        <Input type='email' placeholder="Emailcím"/>
                        <Input type='password' placeholder="Jelszó"/>
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