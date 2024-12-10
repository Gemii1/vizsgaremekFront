import styles from './Registration.module.css';
import Button from '@mui/material/Button';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Form from '../Form/Form'
import {useState} from "react";
import {useNavigate} from "react-router";

function Registration() {

    //False == Cliens, True == Edző
    const [userType, setUserType]=useState(true);
    const [image, setImage]=useState(null);

    function save(){

    }
    const handleImage=(image)=>{
        setImage(image);
    }

    let navigate = useNavigate();


    return (
        <>
            <div className={styles.container}>
                <Tabs >
                    <TabList tabFlex="auto">
                        <Tab className={styles.tab}>
                            <div className={styles.tabText}
                            onClick={()=>{
                                setUserType(true);
                            }}>
                                Edzőként
                            </div>
                        </Tab>
                        <Tab className={styles.tab}>
                            <div className={styles.tabText}
                            onClick={()=>{
                                setUserType(false);
                            }}>
                                Kliensként
                            </div>
                        </Tab>
                    </TabList>
                    <TabPanel value={0}>
                        <Form sendImage={handleImage} userType={userType}/>
                    </TabPanel>
                    <TabPanel value={1}>
                        <Form sendImage={handleImage} userType={userType}/>
                    </TabPanel>
                </Tabs>
                <div className={styles.buttons}>
                    <Button className={styles.closeButton} variant="contained" color="error" onClick={() => {navigate("/landingPage")}}>Bezárás</Button>
                    <Button className={styles.closeButton} variant="contained" color="info" onClick={() => {console.log(image)}}>Regisztrálás</Button>
                </div>
            </div>
        </>
    )

}


export default Registration;
