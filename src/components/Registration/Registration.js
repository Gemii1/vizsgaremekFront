import styles from './Registration.module.css';
import Button from '@mui/material/Button';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Form from '../Form/Form'
import {useState} from "react";
import {useNavigate} from "react-router";
import axios from "axios";

function Registration() {

    //False == Cliens, True == Edző
    const [userType, setUserType]=useState(true);
    const [image, setImage]=useState(null);
    let navigate = useNavigate();

    const [selectedValues, setSelectedValues] =useState({
        name:'',
        phoneNumber:'',
        birthYear:'',
        qualification:'',
        picture:'',
        rating:'',
        loginId:'',
        gender:''
    })

    const [login,setLoginData]=useState({
        email:'',
        password:''
    })


    function setSelectedValuesFromReg(selectedValues){
        setSelectedValues(selectedValues);
    }

    function save(formData,loginData){
        console.log(selectedValues.password+"jelszo");
        let loginID = null;
        axios.post('/login/',loginData).then(({data})=>{
            loginID = data.loginId
            console.log(data)
        }).catch((error)=>{
            console.log(error)
        })

        if (userType){
            axios.post('/login/',loginData).then(({data})=>{

                console.log(data)
            }).catch((error)=>{
                console.log(error)
            })
        }

    }
    const handleImage=(image)=>{
        setImage(image);
    }



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
                        <Form sendImage={handleImage} userType={userType} selectedValues={selectedValues} setSelectedValues={setSelectedValuesFromReg}/>
                    </TabPanel>
                    <TabPanel value={1}>
                        <Form sendImage={handleImage} userType={userType}/>
                    </TabPanel>
                </Tabs>
                <div className={styles.buttons}>
                    <Button className={styles.closeButton} variant="contained" color="error" onClick={() => {navigate("/landingPage")}}>Bezárás</Button>
                    <Button className={styles.closeButton} variant="contained" color="info" onClick={() => {save(selectedValues,login)}}>Regisztrálás</Button>
                </div>
            </div>
        </>
    )

}


export default Registration;
