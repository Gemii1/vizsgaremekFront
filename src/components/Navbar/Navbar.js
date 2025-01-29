import styles from './Navbar.module.css';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import {useContext, useState} from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import UserContext from "../Context/UserContext";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function Navbar(){

    let navigate = useNavigate();
    const {userType,isUserLoggedIn, setIsUserLoggedIn} = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function whichUser(userType){
        if(userType){
            return <>Edző</>;
        }else{
            return <>Kliens</>
        }
    }

    function handleLogout(){
        navigate('/landingPage');
        setIsUserLoggedIn(false);
    }


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
                                            <div>
                                                <div className={styles.dropdownHead}>
                                                    <div><AccountCircleIcon style={{fontSize: 'xxx-large'}}/></div>
                                                    <div>userneve</div>
                                                </div>
                                                <div className={styles.userType}>
                                                    {whichUser(userType)}
                                                </div>
                                                <MenuItem onClick={handleOpen}>Adataim</MenuItem>
                                                <MenuItem onClick={()=>{
                                                    handleLogout();
                                                }}>Kijelentkezés</MenuItem>
                                            </div>
                                        </Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                        <Modal open={open} onClose={handleClose}>
                            <div className={styles.modalContainer}>
                                <div className={styles.modalHeadder}>
                                    <div><AccountCircleIcon className={styles.icon}/></div>
                                    <h2>userneve</h2>
                                </div>
                                <div className={styles.information}>
                                    <div className={styles.email}>
                                        <div>Email:</div>
                                        <div> rawrwar</div>
                                    </div>

                                </div>
                            </div>
                        </Modal>
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