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



function Form({sendImage,userType, selectedValues,setSelectedValues}) {


    const mediaMatch = window.matchMedia('(min-width:500px)');
    const [matches, setMatches] = useState(mediaMatch.matches);
    const [image,setImage]=useState(null);



    const handleChange = (event) => {

        if (event.target.name === 'password') {

        }
        setSelectedValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }))
        toEnum();
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

    const trainerQualifications = ["Personal trainer", "Fitness Instructor","Pilates Instructor", "Crossfitt Coach", "TRX Trainer","Pound Trainer", "Other"]



    function toEnum(){
        let var1 = selectedValues.qualification.toUpperCase().split(" ");
        let var2 = var1[0]+"_"+var1[1];
        selectedValues.qualification = var2;
    }
//FormControlra átírás

    function handleUserType(){
        if (userType){
            return (
                <>

                    <div className={styles.form}>
                        <Input name="name" onChange={handleChange} placeholder="Teljes Név"/>
                        <Input name="email"  onChange={handleChange} type='email' placeholder="Emailcím"/>

                        <PhoneInput
                            name="phoneNumber"
                            country={"hu"}
                            className = {styles.phone}
                            inputStyle={mediaMatch.matches?{width:'90.5%', backgroundColor:'#fbfcfe'}:{width:'85%',backgroundColor:'#fbfcfe'}}
                        />
                        <Input name="birthYear" onChange={handleChange} type='date' placeholder="Születési év"/>
                        <FormControl className={styles.qualification} fullWidth>
                        <InputLabel id="demo-simple-select-label">Végzettség</InputLabel>
                            <Select
                                style={mediaMatch.matches?{width:'90.5%'}:{width:'85%'}}
                                name="qualification"
                                value={selectedValues.qualification}
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
                                checked={selectedValues.gender === 'MALE'}
                                onChange={handleChange}
                                value="MALE"
                                name="gender"
                                label="Férfi"
                            />
                            <Radio
                                checked={selectedValues.gender === 'FEMALE'}
                                onChange={handleChange}
                                value="FEMALE"
                                name="gender"
                                label="nő"
                            />
                            <Radio
                                checked={selectedValues.gender === 'OTHER'}
                                onChange={handleChange}
                                value="OTHER"
                                name="gender"
                                label="egyéb"
                            />
                        </div>
                        {/*<Input type='file' onChange={onImageChange} placeholder="File"/>*/}
                    </div>
                </>
        );
        } else if (!userType) {
            return (
                <>
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
                        <Input name="birthYear" onChange={handleChange} type='date' placeholder="Születési év"/>
                        <Input name="password" onChange={handleChange} type='password' placeholder="Jelszó"/>
                        <div className={styles.formRadio}>
                            <Radio
                                checked={selectedValues === 'MALE'}
                                onChange={handleChange}
                                value="MALE"
                                name="gender"
                                label="Férfi"
                            />
                            <Radio
                                checked={selectedValues === 'FEMALE'}
                                onChange={handleChange}
                                value="FEMALE"
                                name="gender"
                                label="nő"
                            />
                            <Radio
                                checked={selectedValues === 'OTHER'}
                                onChange={handleChange}
                                value="OTHER"
                                name="gender"
                                label="egyéb"
                            />
                        </div>
                    </div>

                </>
            );
        }
    }
    return (
        <>
            {handleUserType()}
            {console.log(selectedValues.password)}
        </>
    )
}

export default Form;