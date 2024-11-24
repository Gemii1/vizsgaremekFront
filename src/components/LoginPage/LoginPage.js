
import Modal from '@mui/material/Modal';
import styles from './LoginPage.module.css'
import * as React from 'react';
import Button from "@mui/material/Button";


function LoginPage({isLoginOpen,openLogin}) {
    console.log("rawr")
    return (

        <React.Fragment>

            <Modal open={isLoginOpen} className={styles.modal}>
                <div className={styles.modalContent}>
                    loremsipsum

                </div>
            </Modal>
        </React.Fragment>
    )
}

export default LoginPage;