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
import MenuItem from '@mui/joy/MenuItem';
import UserContext from "../Context/UserContext";

import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import ModifyUserData from "./UserDataModify/ModifyUserData";
function Navbar(){

    let navigate = useNavigate();
    const {userType,isUserLoggedIn, setIsUserLoggedIn, user} =  useContext(UserContext);
    const [openInfoModal, setOpenInfoModal] = useState(false);
    const handleOpenInfo = () => setOpenInfoModal(true);
    const handleCloseInfo = () => setOpenInfoModal(false);
    const [isEditOpen, setEditOpen] = useState(false);
    const [email, setEmail] = useState('');
    const handleOpenEdit = () => setEditOpen(true);
    const handleCloseEdit = () => setEditOpen(false);


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
                    <div>{user.qualification}</div>
                    <div onClick={handleOpenEdit}><EditIcon/></div>
                </div>
            )
        }
    }

    function handleEdit(data){

    }


    function handleLoginNavbar(){
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
                                <div>{user.birthDate}</div>
                                <div onClick={handleOpenEdit}><EditIcon/></div>
                            </div>
                            {isThereQualification()}
                            <div className={styles.info}>
                                <h4>Telefonszám:</h4>
                                <div>{user.phoneNumber}</div>
                                <div onClick={handleOpenEdit}><EditIcon/></div>
                            </div>

                        </div>
                    </div>
                    <Modal open={isEditOpen} onClose={handleCloseEdit}>
                        <div>
                            <ModifyUserData data={}/>
                        </div>
                    </Modal>
                </Modal>

            </div>
        </>
    )
}

export default Navbar;