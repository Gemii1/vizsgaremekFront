import styles from './Navbar.module.css';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import { useState } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router"

function Navbar(){

    let navigate = useNavigate();


    return(
        <>
            <div className={styles.body}>
                <div className={styles.container}>
                    <div className={styles.nav}>
                        <div>
                            {<FitnessCenterOutlinedIcon fontSize='large'/>}
                        </div>
                        <div className={styles.pages}>
                            <div className={styles.pageBlog}>Blogok</div>
                            <div className={styles.pageTraining}>Tréning</div>
                            <Button className={styles.loginButton}  variant="contained" color="inherit" onClick={() => navigate("/login")}>Bejelentkezés</Button>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}
export default Navbar;