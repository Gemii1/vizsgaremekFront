import Input from '@mui/joy/Input';
import styles from './Form.module.css';
import Radio from '@mui/joy/Radio';
import * as React from 'react';
import {useState, useEffect} from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function Form({sendImage,userType,clientFormData, setClientFormData, trainerFormData,setTrainerFormData, logindData}) {

    const mediaMatch = window.matchMedia('(min-width:500px)');
    const [matches, setMatches] = useState(mediaMatch.matches);
    const [image,setImage]=useState(null);
    const trainerQualifications = ["Personal trainer", "Fitness Instructor","Pilates Instructor", "Crossfit Coach", "TRX Trainer","Pound Trainer", "Other"]

    const handleChange = (event) => {
        if (userType){
            handleClientOrTrainerForm(event,trainerFormData,setTrainerFormData);
        }else if(!userType){
            handleClientOrTrainerForm(event,clientFormData,setClientFormData);
        }
    }

    function handleClientOrTrainerForm(event,formData,setFormData){
        if (event.target === undefined) {
            formData.phoneNumber = event;
        }else {
            if (event.target.name === 'email') {
                logindData.email = event.target.value;
            }else if(event.target.name === 'password'){
                logindData.password = event.target.value;
            }else{
                setFormData(values => ({
                    ...values,
                    [event.target.name]: event.target.value
                }))
            }
        }

    }

    //Ablakméret figyelő
    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addListener(handler);
        return () => mediaMatch.removeListener(handler);
    });
    //Image kezelő
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
        sendImage(image);
    }

    function handleUserType(){
        if (userType){
            return (
                <div className={styles.form}>
                    <Input name="name" onChange={handleChange} placeholder="Teljes Név"/>
                    <Input name="email"  onChange={handleChange} type='email' placeholder="Emailcím"/>

                    <PhoneInput
                        onChange={handleChange}
                        country={"hu"}
                        className = {styles.phone}
                        inputStyle={mediaMatch.matches?{width:'90.5%', backgroundColor:'#fbfcfe'}:{width:'85%',backgroundColor:'#fbfcfe'}}
                    />
                    <Input name="birthDate" onChange={handleChange} type='date' placeholder="Születési év"/>
                    <FormControl className={styles.qualification} fullWidth>
                    <InputLabel id="demo-simple-select-label">Végzettség</InputLabel>
                        <Select
                            style={mediaMatch.matches?{width:'90.5%'}:{width:'85%'}}
                            name="qualification"
                            value={trainerFormData.qualification}
                            label="Végzettség"
                            onChange={handleChange}
                        >
                            {trainerQualifications.map((qualification)=>{
                                return (
                                    <MenuItem value={qualification} key={qualification}>
                                        {qualification}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <Input name="password" onChange={handleChange} type='password' placeholder="Jelszó"/>
                    <div className={styles.formRadio}>
                        <Radio
                            checked={trainerFormData.gender === 'MALE'}
                            onChange={handleChange}
                            value="MALE"
                            name="gender"
                            label="Férfi"
                            key="male"
                        />
                        <Radio
                            checked={trainerFormData.gender === 'FEMALE'}
                            onChange={handleChange}
                            value="FEMALE"
                            name="gender"
                            label="nő"
                            key="female"

                        />
                        <Radio
                            checked={trainerFormData.gender === 'OTHER'}
                            onChange={handleChange}
                            value="OTHER"
                            name="gender"
                            label="egyéb"
                            key="other"
                        />
                    </div>
                    {/*<Input type='file' onChange={onImageChange} placeholder="File"/>*/}
                </div>
            );
        } else if (!userType) {
            return (
                <div className={styles.form}>
                    <Input name="name" onChange={handleChange} placeholder="Teljes Név"/>
                    <Input name="email" onChange={handleChange} type='email' placeholder="Emailcím"/>
                    <PhoneInput
                        name="phoneNumber"
                        country={"hu"}
                        className = {styles.phone}
                        inputStyle={mediaMatch.matches?{width:'90.5%'}:{width:'85%'}}
                        onChange={handleChange}
                    />
                    <Input name="birthDate" onChange={handleChange} type='date' placeholder="Születési év"/>
                    <Input name="password" onChange={handleChange} type='password' placeholder="Jelszó"/>
                    <div className={styles.formRadio}>
                        <Radio
                            checked={clientFormData.gender === 'MALE'}
                            onChange={handleChange}
                            value="MALE"
                            name="gender"
                            label="Férfi"
                            key="male"
                        />
                        <Radio
                            checked={clientFormData.gender === 'FEMALE'}
                            onChange={handleChange}
                            value="FEMALE"
                            name="gender"
                            label="nő"
                            key="female"
                        />
                        <Radio
                            checked={clientFormData.gender === 'OTHER'}
                            onChange={handleChange}
                            value="OTHER"
                            name="gender"
                            label="egyéb"
                            key="other"
                        />
                    </div>
                </div>
            );
        }
    }
    return (
        <>
            {handleUserType()}
        </>
    )
}

export default Form;