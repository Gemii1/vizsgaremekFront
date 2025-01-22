import styles from './Registration.module.css';
import Button from '@mui/material/Button';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Form from './Form/Form'
import {useState} from "react";
import {useNavigate} from "react-router";
import axios from "axios";
import TrainerForm from "./TrainerForm/TrainerForm";
import {useForm} from "react-hook-form";

function ClientForm() {
    return null;
}

function Registration() {

    //False == Cliens, True == Edző
    const [userType, setUserType]=useState(true);
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

    async function save(trainerFormData, loginData, clientFormData, userType) {
        try {
            qualificationToEnum();

            const loginResponse = await axios.post('/login/', loginData);
            const loginId = loginResponse.data.loginId;

            if (userType) {
                await saveTrainerData(trainerFormData, loginId);
            } else {
                await saveClientData(clientFormData, loginId);
            }

            navigate('/login');

        } catch (error) {
            console.error(error);
            alert('A regisztrálás nem volt sikeres!! Kérlek győződj meg róla, hogy minden mezőt kitöltöttél!');
        }
    }

    async function saveTrainerData(trainerFormData, loginId) {
        try {
            trainerFormData.loginId = loginId;
            await axios.post('/trainer/', trainerFormData);
        } catch (error) {
            throw new Error('Trainer registration failed.');
        }
    }

    async function saveClientData(clientFormData, loginId) {
        try {
            clientFormData.loginId = loginId;
            await axios.post('/client/', clientFormData);
        } catch (error) {
            throw new Error('Client registration failed.');
        }
    }
    /*
     <Form
          userType={userType}
          clientFormData={clientFormData}
          setClientFormData={setClientFormDataFromReg}
          trainerFormData={trainerFormData}
          setTrainerFormData={setTrainerFormDataFromReg}
          logindData={login}
            />
     */

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
                        <TrainerForm />
                    </TabPanel>
                    <TabPanel value={1}>
                        <ClientForm/>
                    </TabPanel>
                </Tabs>
                <div className={styles.buttons}>
                    <Button className={styles.closeButton} variant="contained" color="error" onClick={() => {navigate("/landingPage")}}>Bezárás</Button>
                    <Button className={styles.closeButton} variant="contained" color="info" >Regisztrálás</Button>
                </div>
            </div>
        </>
    )

}


export default Registration;
