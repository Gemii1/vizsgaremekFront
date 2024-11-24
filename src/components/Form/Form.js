import Input from '@mui/joy/Input';
import styles from './Form.module.css';
import Radio from '@mui/joy/Radio';
import * as React from 'react';
import LoginPage from "../LoginPage/LoginPage";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {useState} from "react";
import {Login} from "@mui/icons-material";
import Registration from "../Registration/Registration";

function Form({userType, close}){

    const [selectedValue, setSelectedValue] =useState('MALE')
    const [isLoginOpen, setIsLoginOpen] =useState(false)

    function openLogin(){
        setIsLoginOpen(true)
    }


    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };





    function handleUserType(){
        if (userType){
            return (
                <>
                    <div className={styles.form}>
                        <Input placeholder="Teljes Név"/>
                        <Input type='email' placeholder="Emailcím"/>
                        <Input type='tel' placeholder="Telefonszám"/>
                        <Input type='date' placeholder="Születési év"/>
                        <div className={styles.formRadio}>
                            <Radio
                                checked={selectedValue === 'MALE'}
                                onChange={handleChange}
                                value="MALE"
                                name="radio-buttons"
                                label="Férfi"
                            />
                            <Radio
                                checked={selectedValue === 'FEMALE'}
                                onChange={handleChange}
                                value="FEMALE"
                                name="radio-buttons"
                                label="nő"
                            />
                            <Radio
                                checked={selectedValue === 'OTHER'}
                                onChange={handleChange}
                                value="OTHER"
                                name="radio-buttons"
                                label="egyéb"
                            />
                        </div>
                        <Input type='password' placeholder="Jelszó"/>
                        <div><Button
                        onClick={() => {
                            openLogin()
                        }}>Már edző vagyok..
                        </Button>
                    </div>
                </div>
                    <LoginPage isLoginOpen={isLoginOpen} openLogin={openLogin}/>
                </>
        );
        } else if (!userType) {
            return (
                <>
                    <div className={styles.form}>
                        <Input placeholder="Teljes Név"/>
                        <Input type='email' placeholder="Emailcím"/>
                        <Input type='tel' placeholder="Telefonszám"/>
                        <Input type='date' placeholder="Születési év"/>
                        <div className={styles.formRadio}>
                            <Radio
                                checked={selectedValue === 'MALE'}
                                onChange={handleChange}
                                value="MALE"
                                name="radio-buttons"
                                label="Férfi"
                            />
                            <Radio
                                checked={selectedValue === 'FEMALE'}
                                onChange={handleChange}
                                value="FEMALE"
                                name="radio-buttons"
                                label="nő"
                            />
                            <Radio
                                checked={selectedValue === 'OTHER'}
                                onChange={handleChange}
                                value="OTHER"
                                name="radio-buttons"
                                label="egyéb"
                            />
                        </div>
                        <Input type='password' placeholder="Jelszó"/>
                        <div><div onClick={()=>{
                            close()
                            openLogin()
                        }}>Már kliens vagyok..</div></div>
                    </div>

                    <LoginPage isLoginOpen={isLoginOpen} openLogin={openLogin}/>

                </>
            );
        }
    }

    return (
        <>
            {handleUserType()}


        </>
    )

}

export default Form;