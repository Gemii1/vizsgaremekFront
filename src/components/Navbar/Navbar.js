import styles from './Navbar.module.css';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import { useState } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';


function Navbar(){

    let navigate = useNavigate();
    const [isUserLoggedIn, setUserLoggedIn] = useState(true);
    const [user, setUser] = useState({
        name:'rawr',
        email:'myemail@gmail.com'
    });


    function handleLoginNavbarChange(){
        if(!isUserLoggedIn){
            return(
                <>
                    <div className={styles.body}>
                        <div className={styles.container}>
                            <div className={styles.nav}>
                                <div onClick={() => navigate("/landingPage")}>
                                    {<FitnessCenterOutlinedIcon fontSize='large'/>}
                                </div>
                                <div className={styles.pages}>
                                    <div className={styles.pageBlog} onClick={() => navigate("/blogs")}>Blogok</div>
                                    <div className={styles.pageTraining} onClick={() => navigate("/training")}>Tréning</div>
                                    <Button className={styles.loginButton} variant="contained" color="inherit"
                                            onClick={() => navigate("/login")}>Bejelentkezés</Button>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )
        }else{
            return(
                <>
                    <div className={styles.body}>
                        <div className={styles.container}>
                            <div className={styles.nav}>
                                <div onClick={() => navigate("/landingPage")}>
                                    {<FitnessCenterOutlinedIcon fontSize='large'/>}
                                </div>
                                <div className={styles.pages}>
                                    <div className={styles.pageBlog} onClick={() => navigate("/blogs")}>Blogok</div>
                                    <div className={styles.pageTraining} onClick={() => navigate("/training")}>Tréning</div>
                                    <Dropdown>
                                        <MenuButton className={styles.menuButton}><AccountCircleIcon
                                            style={{fontSize: 'xxx-large'}}/></MenuButton>
                                        <Menu>
                                            <MenuItem>{user.name}</MenuItem>
                                            <MenuItem>{user.email}</MenuItem>
                                            <MenuItem>
                                                <div onClick={() => {
                                                    setUserLoggedIn(false)
                                                }}>Logout
                                                </div>
                                            </MenuItem>
                                        </Menu>
                                    </Dropdown>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }

    return (
        <>
            {handleLoginNavbarChange()}
        </>
    )
}

export default Navbar;