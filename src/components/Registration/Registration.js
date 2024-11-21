import styles from './Registration.module.css';
import Button from '@mui/material/Button';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Form from '../Form/Form'
import {useState} from "react";

function Registration({close}) {

    //False == Cliens, True == Edző
    const [userType, setUserType]=useState(true);

    function save(){

    }
    return (
        <>
            <div className={styles.container}>
                <Tabs >
                    <TabList tabFlex="auto">
                        <Tab className={styles.tab}>
                            <div className={styles.tabText} style={{}}
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
                        <Form userType={userType}/>
                    </TabPanel>
                    <TabPanel value={1}>
                        <Form userType={userType}/>
                    </TabPanel>
                </Tabs>
                <div className={styles.buttons}>
                    <Button className={styles.closeButton} variant="contained" color="error" onClick={() => {close()}}>Bezárás</Button>
                    <Button className={styles.closeButton} variant="contained" color="info" onClick={() => {save()}}>Regisztrálás</Button>
                </div>
            </div>
        </>
    )

}


export default Registration;
