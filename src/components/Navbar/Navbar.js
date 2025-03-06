import styles from './Navbar.module.css';
import React, { useContext, useEffect, useState } from 'react';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";
import { Button, Modal, Select, Snackbar, TextField, MenuItem } from "@mui/material";
import { Dropdown, Menu, MenuButton } from '@mui/joy';
import UserContext from "../Context/User/UserContext";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";

function Navbar() {
    const navigate = useNavigate();
    const { userType, isUserLoggedIn, setIsUserLoggedIn, user,fetchUser,deleteUser} = useContext(UserContext);
    const [openInfoModal, setOpenInfoModal] = useState(false);
    const [email, setEmail] = useState('');
    const [isSelectEdited, setIsSelectEdited] = useState(true);
    const [isBirthYearEdited, setIsBirthYearEdited] = useState(true);
    const [isPhoneEdited, setIsPhoneEdited] = useState(true);
    const [isNameEdited, setIsNameEdited] = useState(true);
    const [snackBar, setSnackBar] = useState(false);
    const [patchData,setPatchData] = useState({});
    const trainerQualifications = ["Personal Trainer", "Fitness Instructor", "Pilates Instructor", "Crossfit Coach", "TRX Trainer", "Pound Trainer", "Other"];



    const handleOpenInfo = () => setOpenInfoModal(true);
    const handleCloseInfo = () => setOpenInfoModal(false);
    const closeSnackBar = () => setSnackBar(false);
    const openSnackBar = () => setSnackBar(true);
    const whichUser = (userType) => userType ? <>Edző</> : <>Kliens</>;
    const handleLogout = () => {
        navigate('/landingPage');
        setIsUserLoggedIn(false);
    };
    const isThereQualification = () => {
        if (userType) {
            return (
                <div className={styles.info}>
                    <h4>Végzettség:</h4>
                    <Select
                        className={styles.textFields, styles.editInputs}
                        disabled={isSelectEdited}
                        defaultValue={user.qualification}
                        onChange={handleChange}
                        name = "qualification"
                    >
                        {trainerQualifications.map((qualification, key) => (
                            <MenuItem key={key} value={qualification.toUpperCase().replace(" ", "_")}>
                                {qualification}
                            </MenuItem>
                        ))}
                    </Select>
                    <div onClick={() => setIsSelectEdited(false)}>
                        <EditIcon/>
                        {!isSelectEdited && <Button onClick={(e) => {
                            e.stopPropagation();
                            setIsSelectEdited(true);
                            patchUserData(patchData)
                        }}>Ok</Button>}
                    </div>
                </div>
            );
        }
    };
    const handleLoginNavbar = () => {
        if (isUserLoggedIn) {
            return (
                <Dropdown>
                    <MenuButton className={styles.menuButton}><AccountCircleIcon style={{ fontSize: 'xxx-large' }}/></MenuButton>
                    <Menu>
                        <div>
                            <div className={styles.dropdownHead}>
                                <div><AccountCircleIcon style={{ fontSize: 'xxx-large' }}/></div>
                                <div>{user.name}</div>
                            </div>
                            <div className={styles.userType}>
                                {whichUser(userType)}
                            </div>
                            <MenuItem onClick={handleOpenInfo}>Adataim</MenuItem>
                            <MenuItem onClick={handleLogout}>Kijelentkezés</MenuItem>
                        </div>
                    </Menu>
                </Dropdown>
            );
        } else {
            return (
                <Button className={styles.loginButton} variant="contained" color="inherit" onClick={() => navigate("/login")}>
                    Bejelentkezés
                </Button>
            );
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');


        return `${year}-${month}-${day}`;
    };

    const handleChange = (event)=>{

        let targetName;
        try{
           targetName  = event.target.name;
        }catch(e){
            targetName = "birth_date";
        }
        if(targetName !== "birth_date"){
            setPatchData(values => ({...values,
                "selected" : event.target.name.toUpperCase(),
                "value" : event.target.value
            }));
        }else{
            setPatchData(values => ({...values,
                "selected" : "BIRTH_DATE",
                "value" : formatDate(event.$d)
            }));
        }
    }


    const patchUserData = async (data)=>{
        if (userType){
            await axios.patch(`/trainer/${user.id}`,patchData);
        }else{
            await axios.patch(`/client/${user.id}`,patchData);
        }
        await fetchUser(userType);
        openSnackBar();
    }


    useEffect(() => {
        if (user && user.login && user.login.email) {
            setEmail(user.login.email);
        }
    }, [user]);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={styles.body}>
                <div className={styles.container}>
                    <div className={styles.nav}>
                        <div onClick={() => navigate("/landingPage")}>
                            <FitnessCenterOutlinedIcon fontSize='large'/>
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
                            <h2>
                                <div className={styles.info}>
                                    <TextField
                                        className={styles.editInputs}
                                        label="név"
                                        disabled={isNameEdited}
                                        defaultValue={user.name}
                                        name = "name"
                                        onChange={handleChange}
                                    />
                                    <div onClick={() => setIsNameEdited(false)}>
                                        <EditIcon/>
                                        {!isNameEdited && <Button onClick={(e) => {
                                            e.stopPropagation();
                                            setIsNameEdited(true);
                                            patchUserData(patchData)
                                        }}>Ok</Button>}
                                    </div>
                                </div>
                            </h2>
                        </div>
                        <div className={styles.informations}>
                            <div className={styles.info}>
                                <h4>Email:</h4>
                                {email}
                            </div>
                            <div className={styles.info}>
                                <h4>Születési év:</h4>
                                <DatePicker
                                    disabled={isBirthYearEdited}
                                    defaultValue={dayjs(user.birthDate)}
                                    className={styles.editInputs}
                                    name = "birth_date"
                                    onChange={handleChange}
                                />
                                <div onClick={() => setIsBirthYearEdited(false)}>
                                    <EditIcon/>
                                    {!isBirthYearEdited && <Button onClick={(e) => {
                                        e.stopPropagation();
                                        setIsBirthYearEdited(true);
                                        patchUserData(patchData)
                                    }}>Ok</Button>}
                                </div>
                            </div>
                            {isThereQualification()}
                            <div className={styles.info}>
                                <h4>Telefonszám:</h4>
                                <TextField
                                    className={styles.editInputs}
                                    type="number"
                                    disabled={isPhoneEdited}
                                    defaultValue={user.phoneNumber}
                                    onChange={handleChange}
                                    name = "phone_Number"
                                />
                                <div onClick={() => setIsPhoneEdited(false)}>
                                    <EditIcon/>
                                    {!isPhoneEdited && <Button onClick={(e) => {
                                        e.stopPropagation();
                                        setIsPhoneEdited(true);
                                        patchUserData(patchData)
                                    }}>Ok</Button>}
                                </div>
                            </div>
                            <div className={styles.deleteButton}>
                                <Button color="error" onClick={()=>{
                                    deleteUser(userType);
                                    navigate("/landingPage");
                                    setIsUserLoggedIn(false);
                                    handleCloseInfo();
                                }}>Fiók törlése</Button>
                            </div>
                        </div>
                    </div>
                </Modal>
                <Snackbar
                    open={snackBar}
                    autoHideDuration={6000}
                    onClose={closeSnackBar}
                    message="Sikeres módosítás!"
                    sx={{
                        '& .MuiSnackbarContent-root': {
                            backgroundColor: 'green',
                        }
                    }}
                />

            </div>
        </LocalizationProvider>
    );
}

export default Navbar;