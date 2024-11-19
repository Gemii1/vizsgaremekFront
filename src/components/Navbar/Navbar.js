import styles from './Navbar.module.css';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import { useState } from 'react';

import Modal from '@mui/material/Modal';
import Registration from '../Registration/Registration';


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
                        <div>Blogok</div>
                        <div>Tréning</div>
                        <div onClick={()=>{
                            setIsRegistration(true)
                        }}>Regisztrálás</div>
                      
                    </div>
                    
                    </div>
                </div>
            </div>
            <Modal open={isRegistrationOpen} className={styles.modal}>
                <Registration close={closeRegistration}/>
            </Modal>
        
        </>
    )
}

export default Navbar;