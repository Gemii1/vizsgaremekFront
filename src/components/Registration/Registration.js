import styles from './Registration.module.css';
import { Tabs, TabList, Tab, TabPanel } from '@mui/joy';
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import TrainerForm from "./TrainerForm/TrainerForm";
import ClientForm from "./ClientForm/ClientForm";

function Registration() {
    const [ setUserType] = useState(true); // false == Client, true == Trainer
    const navigate = useNavigate();

    async function save(trainerFormData, loginData, clientFormData, isTrainer) {
        try {
            const loginResponse = await axios.post('/login/', loginData);
            const loginId = loginResponse.data.loginId;
            let response;
            if (isTrainer) {
                response =  await saveTrainerData(trainerFormData, loginId);
            } else {
                response =  await saveClientData(clientFormData, loginId);
            }

            navigate('/login');
            return response;
        } catch (error) {
            console.error(error);
            alert('A regisztrálás nem volt sikeres! Kérlek győződj meg róla, hogy minden mezőt kitöltöttél!');
        }
    }

    async function saveTrainerData(trainerFormData, loginId) {
        try {
            trainerFormData.loginId = loginId;
           const response =  await axios.post('/trainer/', trainerFormData);
           return response;
        } catch (error) {
            throw new Error('Trainer registration failed.');
        }
    }

    async function saveClientData(clientFormData, loginId) {
        try {
            clientFormData.loginId = loginId;
            return await axios.post('/client/', clientFormData);
        } catch (error) {
            throw new Error('Client registration failed.');
        }
    }

    return (
        <div className={styles.container}>
            <meta name="viewport" content="width=720"/>
            <Tabs>
                <TabList tabFlex="auto">
                    <Tab className={styles.tab}>
                        <div className={styles.tabText} onClick={() => setUserType(true)}>Edzőként</div>
                    </Tab>
                    <Tab className={styles.tab}>
                        <div className={styles.tabText} onClick={() => setUserType(false)}>Kliensként</div>
                    </Tab>
                </TabList>
                <TabPanel value={0}>
                    <TrainerForm save={save}/>
                </TabPanel>
                <TabPanel value={1}>
                    <ClientForm save={save}/>
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default Registration;