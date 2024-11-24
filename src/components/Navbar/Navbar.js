import styles from './Navbar.module.css';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import { useState } from 'react';
import * as React from 'react';
import Modal from '@mui/material/Modal';
import Registration from '../Registration/Registration';
import Button from '@mui/material/Button';
import LoginPage from "../LoginPage/LoginPage";


function Navbar() {

    const [isRegistrationOpen,setIsRegistration]=useState(false)

    function closeRegistration() {
        setIsRegistration(false)
      }






    return(
        <>
            <div className={styles.body}>
                <div className={styles.container}>
                    <div className={styles.nav}>

                    <div className={styles.logo}>
                        {<FitnessCenterOutlinedIcon fontSize='large'/>}
                    </div>

                        <div>

                            <div className={styles.pageBlog}>Blogok</div>
                            <div className={styles.pageTraining}>Tréning</div>

                            <Button  variant="contained" onClick={() => setIsRegistration(true)}>Regisztrálás</Button>
                        </div>

                    </div>
                </div>
            </div>
            <Modal open={isRegistrationOpen} onClose={closeRegistration} className={styles.modal}>
                <div>
                    <Registration close={closeRegistration}/>
                </div>
            </Modal>

        
        </>
    )
}

export default Navbar;