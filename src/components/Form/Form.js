import Input from '@mui/joy/Input';
import styles from './Form.module.css';
import Radio from '@mui/joy/Radio';
import * as React from 'react';
import {useState, useEffect} from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'


function Form({sendImage,userType}) {

    const [selectedValue, setSelectedValue] =useState('MALE')
    const mediaMatch = window.matchMedia('(min-width:500px)');
    const [matches, setMatches] = useState(mediaMatch.matches);
    const [image,setImage]=useState(null);


    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

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
                <>
                    <div className={styles.form}>
                        <Input placeholder="Teljes Név"/>
                        <Input type='email' placeholder="Emailcím"/>

                        <PhoneInput
                            country={"hu"}
                            className = {styles.phone}
                            inputStyle={mediaMatch.matches?{width:'90.5%'}:{width:'85%'}}
                        />
                        <Input type='date' placeholder="Születési év"/>
                        {/* Select lesz a végezettség*/}
                        <Input type='text' placeholder="Végzettség"></Input>
                        <Input type='password' placeholder="Jelszó"/>
                        <div className={styles.formRadio}>
                            <Radio
                                checked={selectedValue === 'MALE'}
                                onChange={handleChange}
                                value="MALE"
                                name="radio-buttons"
                                label="Férfi"
                            />
                            <Radio
                                checked={selectedValue === 'FEMALE'}
                                onChange={handleChange}
                                value="FEMALE"
                                name="radio-buttons"
                                label="nő"
                            />
                            <Radio
                                checked={selectedValue === 'OTHER'}
                                onChange={handleChange}
                                value="OTHER"
                                name="radio-buttons"
                                label="egyéb"
                            />
                        </div>
                        <Input type='file' onChange={onImageChange} placeholder="File"/>
                    </div>
                </>
        );
        } else if (!userType) {
            return (
                <>
                    <div className={styles.form}>
                        <Input placeholder="Teljes Név"/>
                        <Input type='email' placeholder="Emailcím"/>
                        <PhoneInput
                            country={"hu"}
                            className = {styles.phone}
                            inputStyle={mediaMatch.matches?{width:'90.5%'}:{width:'85%'}}
                        />
                        <Input type='date' placeholder="Születési év"/>
                        <div className={styles.formRadio}>
                            <Radio
                                checked={selectedValue === 'MALE'}
                                onChange={handleChange}
                                value="MALE"
                                name="radio-buttons"
                                label="Férfi"
                            />
                            <Radio
                                checked={selectedValue === 'FEMALE'}
                                onChange={handleChange}
                                value="FEMALE"
                                name="radio-buttons"
                                label="nő"
                            />
                            <Radio
                                checked={selectedValue === 'OTHER'}
                                onChange={handleChange}
                                value="OTHER"
                                name="radio-buttons"
                                label="egyéb"
                            />
                        </div>
                        <Input type='password' placeholder="Jelszó"/>
                    </div>

                </>
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