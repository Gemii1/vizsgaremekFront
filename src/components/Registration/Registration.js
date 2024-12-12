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


    let [trainerFormData, setTrainerFormData] =useState({
        name:'',
        birthDate:'',
        gender:'',
        picture:'Images/img1.jpg',
        qualification:'',
        phoneNumber:'',
        rating:'3',
        loginId:''
    })

    let [clientFormData, setClientFormData] =useState({
        name:'',
        birthDate:'',
        gender:'',
        phoneNumber:'',
        loginId:''
    })

    let [login,setLoginData]=useState({
        email:'',
        password:''
    })


    function setTrainerFormDataFromReg(selectedValues){
        setTrainerFormData(selectedValues);
    }

    function setClientFormDataFromReg(selectedValues){
        setClientFormData(selectedValues);
    }

    function qualificationToEnum(){
        let qualSplitted = trainerFormData.qualification.toUpperCase().split(" ");
        if (qualSplitted.length > 1){
            let upperCaseQual = qualSplitted[0]+"_"+qualSplitted[1];
            trainerFormData.qualification = upperCaseQual;
        }else{
            trainerFormData.qualification = trainerFormData.qualification.toUpperCase();
        }

    }

    function save(trainerFormData,loginData,clientFormData){
        qualificationToEnum();
        axios.post('/login/',loginData).then(({data})=>{
            if (userType){
                trainerFormData.loginId = data.loginId
                axios.post('/trainer/',trainerFormData).then(({data})=>{
                    navigate("/login")
                }).catch((error)=>{
                    alert("A regisztrálás nem volt sikeres!! Kérlek győződj meg róla, hogy minden mezőt kitöltöttél!")
                    console.log(error)
                })
            }else if (!userType){
                clientFormData.loginId = data.loginId
                console.log(clientFormData)
                axios.post('/client/',clientFormData).then(({data})=>{
                    navigate("/login")
                }).catch((error)=>{
                    alert("A regisztrálás nem volt sikeres!! Kérlek győződj meg róla, hogy minden mezőt kitöltöttél!")
                    console.log(error)
                })
            }

        }).catch((error)=>{
            console.log(error)
        })
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
                        <Form sendImage={handleImage}
                              userType={userType}
                              clientFormData={clientFormData}
                              setClientFormData={setClientFormDataFromReg}
                              trainerFormData={trainerFormData}
                              setTrainerFormData={setTrainerFormDataFromReg}
                              logindData={login}
                        />
                    </TabPanel>
                    <TabPanel value={1}>
                        <Form sendImage={handleImage}
                              userType={userType}
                              clientFormData={clientFormData}
                              setClientFormData={setClientFormDataFromReg}
                              trainerFormData={trainerFormData}
                              setTrainerFormData={setTrainerFormDataFromReg}
                              logindData={login}
                        />
                    </TabPanel>
                </Tabs>
                <div className={styles.buttons}>
                    <Button className={styles.closeButton} variant="contained" color="error" onClick={() => {navigate("/landingPage")}}>Bezárás</Button>
                    <Button className={styles.closeButton} variant="contained" color="info" onClick={() => {
                        save(trainerFormData,login, clientFormData)
                    }}>Regisztrálás</Button>
                </div>
            </div>
        </>
    )

}


export default Registration;
