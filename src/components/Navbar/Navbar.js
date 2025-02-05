import styles from './Navbar.module.css';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import {useContext, useEffect, useState} from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/material/MenuItem';
import UserContext from "../Context/User/UserContext";

import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import {Select, Snackbar, TextField} from "@mui/material";
import dayjs from "dayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
function Navbar(){

    let navigate = useNavigate();
    const {userType,isUserLoggedIn, setIsUserLoggedIn, user} =  useContext(UserContext);
    const [openInfoModal, setOpenInfoModal] = useState(false);
    const handleOpenInfo = () => setOpenInfoModal(true);
    const handleCloseInfo = () => setOpenInfoModal(false);
    const [email, setEmail] = useState('');
    const trainerQualifications = ["Personal Trainer", "Fitness Instructor","Pilates Instructor", "Crossfit Coach", "TRX Trainer","Pound Trainer", "Other"]
    const [isSelectEdited, setIsSelectEdited] = useState(true);
    const [isBirthYearEdited, setIsBirthYearEdited] = useState(true);
    const [isPhoneEdited, setIsPhoneEdited] = useState(true);
    const [snackBar, setSnackBar] = useState(false);
    const closeSnackBar = () => {
        setSnackBar(false);
    }
    const openSnackBar = () => {
        setSnackBar(true);
    }
    useEffect(() => {
        if (user && user.login && user.login.email) {
            setEmail(user.login.email);
        }
    }, [user]);

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


    function isThereQualification(){
        if(userType){
            return (
                <div className={styles.info}>
                    <h4>Végzettség:</h4>
                    <Select
                        className={styles.textFields}
                        aria-label="Program Típus"
                        disabled={isSelectEdited}
                        defaultValue={user.qualification}
                        className={styles.editInputs}
                    >
                        {trainerQualifications.map((qualification, key) => (
                            <MenuItem key={key} value={qualification.toUpperCase().replace(" ","_")}>
                                {qualification}
                            </MenuItem>
                        ))}
                    </Select>
                    <div onClick={() => {
                        setIsSelectEdited(false);
                    }}><EditIcon/>{
                        isSelectEdited ? (<></>) : (<Button onClick={(e) => {
                            e.stopPropagation();
                            setIsSelectEdited(true);
                            openSnackBar()
                        }}>Ok</Button>)}
                    </div>
                </div>
            )
        }
    }


    function handleLoginNavbar() {
        if (isUserLoggedIn) {
            return (
                <>
                    <Dropdown>
                        <MenuButton className={styles.menuButton}><AccountCircleIcon
                            style={{fontSize: 'xxx-large'}}/></MenuButton>
                        <Menu>
                            <div>
                            <div className={styles.dropdownHead}>
                                    <div><AccountCircleIcon style={{fontSize: 'xxx-large'}}/></div>
                                    <div>{user.name}</div>
                                </div>
                                <div className={styles.userType}>
                                    {whichUser(userType)}
                                </div>
                                <MenuItem onClick={handleOpenInfo}>Adataim</MenuItem>
                                <MenuItem onClick={()=>{
                                    handleLogout();
                                }}>Kijelentkezés</MenuItem>
                            </div>
                        </Menu>
                    </Dropdown>
                </>
            )

        }else{
            return (
                <>
                    <Button className={styles.loginButton} variant="contained" color="inherit"
                            onClick={() => navigate("/login")}>Bejelentkezés</Button>
                </>
            )
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={styles.body}>
                <div className={styles.container}>
                    <div className={styles.nav}>
                        <div onClick={() => navigate("/landingPage")}>
                            {<FitnessCenterOutlinedIcon fontSize='large'/>}
                        </div>
                        <div className={styles.pages}>
                            <div className={styles.pageBlog} onClick={() => navigate("/blogs")}>Blogok</div>
                            <div className={styles.pageTraining} onClick={() => navigate("/training")}>Tréning</div>
                            {handleLoginNavbar()}
                        </div>
                    </div>
                </div>
                <Modal open={openInfoModal} onClose={handleCloseInfo}>
                    <div className={styles.modalContainer}>
                        <div className={styles.modalHeadder}>
                            <div><AccountCircleIcon className={styles.icon}/></div>
                            <h2>{user.name}</h2>
                        </div>
                        <div className={styles.informations}>
                            <div className={styles.info}>
                                <h4>Email:</h4>
                                {email}
                                <div></div>
                            </div>
                            <div className={styles.info}>
                                <h4>Születési év:</h4>
                                <DatePicker
                                    disabled={isBirthYearEdited}
                                    defaultValue={dayjs(user.birthDate)}
                                    className={styles.editInputs}
                                />
                                <div onClick={() => {
                                    setIsBirthYearEdited(false);
                                }}><EditIcon/>{
                                    isBirthYearEdited ? (<></>) : (<Button onClick={(e) => {
                                        e.stopPropagation();
                                        setIsBirthYearEdited(true);
                                        openSnackBar()
                                    }}>Ok</Button>)}
                                </div>
                            </div>
                            {isThereQualification()}
                            <div className={styles.info}>
                                <h4>Telefonszám:</h4>
                                <TextField className={styles.editInputs}
                                           label="Ár"
                                           type="number"
                                           disabled={isPhoneEdited}
                                           defaultValue={user.phoneNumber}

                                />
                                <div onClick={()=>{
                                    setIsPhoneEdited(false);
                                }}><EditIcon/>{
                                isPhoneEdited?(<></>):(<Button onClick={(e)=>{
                                    e.stopPropagation();
                                    setIsPhoneEdited(true);
                                    openSnackBar()
                                }} >Ok</Button>)}
                                </div>
                            </div>

                        </div>
                    </div>

                </Modal>
                <Snackbar
                    open={snackBar}
                    autoHideDuration={6000}
                    onClose={closeSnackBar}
                    message="Sikeres módosítás!"
                />
            </div>
        </LocalizationProvider>
    )
}

export default Navbar;