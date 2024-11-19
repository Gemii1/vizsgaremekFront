import styles from './Registration.module.css';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



function Registration({close}) {
    return(
        <>
            <div className={styles.container}>
                <h3>Pick a User</h3>
                <div className={styles.userTypePicker}>
                    Kliensként
                    {<ArrowForwardIosIcon className={styles.arrow} fontSize='small'/>}
                </div>
                <div className={styles.userTypePicker}>
                    Edzőként 
                    {<ArrowForwardIosIcon className={styles.arrow} fontSize='small'/>}
                </div>

                <div></div>
                <Button className={styles.closeButton} variant="outlined" color="error" onClick={()=>{close()}}>Close</Button>
            </div>
        </>
    )

}


export default Registration;
