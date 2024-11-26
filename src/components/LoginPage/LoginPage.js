
import Modal from '@mui/material/Modal';
import styles from './LoginPage.module.css'
import * as React from 'react';
import Button from "@mui/material/Button";
import Input from '@mui/joy/Input';


function LoginPage({isLoginOpen, closeLoginModal}) {


    return (
        <>
            <React.Fragment>
                <Modal open={isLoginOpen} className={styles.modal}>
                    <div className={styles.container}>
                        <h3>Bejelentkezés</h3>
                        <div className={styles.inputs}>
                            <Input type='email' placeholder="Emailcím"/>
                            <Input type='password' placeholder="Jelszó"/>
                        </div>
                        <div className={styles.buttons}>
                            <Button className={styles.closeButton} variant="contained" color="error"
                                    onClick={() => {
                                        closeLoginModal()
                                    }}>Bezárás</Button>
                            <Button className={styles.closeButton} variant="contained" color="info"
                                    onClick={() => {

                                    }}>Regisztrálás</Button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        </>

    )
}

export default LoginPage;