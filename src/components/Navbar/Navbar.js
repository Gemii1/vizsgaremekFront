import styles from './Navbar.module.css';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import { useState } from 'react';
import * as React from 'react';
import Modal from '@mui/material/Modal';
import Registration from '../Registration/Registration';
import Button from '@mui/material/Button';
import LoginPage from "../LoginPage/LoginPage";


function Navbar(){

    const [isLoginOpen,setIsLoginOpen]=useState(false)

    function closeLoginModal(){
        setIsLoginOpen(false);
    }
    function openLoginModal(){
        setIsLoginOpen(true);
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

                            <Button  variant="contained" onClick={() => openLoginModal()}>Bejelentkezés</Button>
                        </div>

                    </div>
                </div>
            </div>

            <div>
                <LoginPage isLoginOpen={isLoginOpen} closeLoginModal={closeLoginModal}/>

            </div>




        </>
    )
}
export default Navbar;