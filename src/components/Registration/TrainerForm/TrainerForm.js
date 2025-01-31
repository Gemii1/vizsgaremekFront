import styles from './TrainerForm.module.css';
import {useForm,Controller} from "react-hook-form";
import 'react-phone-input-2/lib/style.css'

import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router";

function TrainerForm() {
    let navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        formState:{errors},
    }= useForm();

    let loginData = {
        userName :'',
        password : ''
    }
    function qualificationToEnum(data){
        let qualSplitted = data.qualification.toUpperCase().split(" ");
        if (qualSplitted.length > 1){
            let upperCaseQual = qualSplitted[0]+"_"+qualSplitted[1];
            data.qualification = upperCaseQual;
        }else{
            data.qualification = data.qualification.toUpperCase();
        }

    }

    const onSubmit = (data) => {
        setLoginData(data)
        qualificationToEnum(data)
        console.log(data);
    };

    const trainerQualifications = ["Personal Trainer", "Fitness Instructor","Pilates Instructor", "Crossfit Coach", "TRX Trainer","Pound Trainer", "Other"]


    const setLoginData = (data) => {
        loginData.userName = data.userName;
        loginData.password  = data.password;
        console.log(loginData);
    };
    return (
        <div className={styles.form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputs}>
                    <div>
                        <label>Teljes név:</label>
                        <input className={styles.input}
                               placeholder="Jhon Do"
                               {...register("userName", {
                                   required: true,
                                   minLength: 2,
                                   pattern: /^[A-Za-z]+$/i,
                               })}
                        />
                        {errors.userName && <span className={styles.error}>Hibás név!</span>}
                    </div>
                    <div>
                        <label>Email:</label>
                        <input className={styles.input}
                               placeholder="pelda@gmail.com"
                               type="email"
                               {...register("email", {
                                   required: true,
                                   pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                               })}
                        />
                        {errors.email && <span className={styles.error}>Hibás email!</span>}
                    </div>
                    <div>
                        <label>Telefonszám:</label>
                        <Controller
                            name="telefon"
                            control={control}
                            rules={{required: 'A telefonszám megadása kötelező!'}}
                            render={({field: {onChange, value}}) => (
                                <PhoneInput
                                    value={value}
                                    onChange={onChange}
                                    country="hu"
                                    inputStyle={{width: '110%', padding: '18px', height: 'auto', paddingInline: '50px'}}
                                />
                            )}
                        />
                        {errors.phone && <span className={styles.error}>{errors.phone.message + "!"}</span>}
                    </div>
                    <div>
                        <label>Születési év:</label>
                        <input className={styles.input}
                               placeholder="Születési év"
                               type="date"
                               {...register("birthDay", {
                                   required: true,
                               })}
                        />
                        {errors.birthDay && <span className={styles.error}>Hibás születési év!</span>}
                    </div>
                    <div className={styles.select}>
                        <label>Foglalkozás:</label>
                        <select className={styles.input} {...register("qualification", {required: true})}>
                            {trainerQualifications.map((qualification, index) => (
                                <option value={qualification} key={index}> {qualification}</option>
                            ))}
                        </select>
                        {errors.qualification && <span className={styles.error}>Hibás foglalkozás!</span>}
                    </div>
                    <div>
                        <label>Jelszó:</label>
                        <input className={styles.input}
                               placeholder="Jelszó"
                               type="password"
                               {...register("password", {
                                   required: true,
                               })}
                        />
                        {errors.password && <span className={styles.error}>Hibás jelszó!</span>}
                    </div>
                    <div className={styles.formRadio}>
                        <label>Nem:</label>
                        <br/>
                        <label>
                            <input
                                type="radio"
                                value="MALE"
                                {...register("gender", {required: true})}
                            />
                            <label>Férfi</label>
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="FEMALE"
                                {...register("gender", {required: true})}
                            />
                            <label>Nő</label>
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="OTHER"
                                {...register("gender", {required: true})}
                            />
                            <label>Egyéb</label>
                        </label>
                        {errors.gender && <span className={styles.error}>Hibás nem!</span>}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <Button className={styles.closeButton} variant="contained" color="error" onClick={() => {
                        navigate("/landingPage")
                    }}>Bezárás</Button>
                    <Button className={styles.closeButton} variant="contained" color="info" onClick={handleSubmit(onSubmit)}>Regisztrálás</Button>
                </div>
            </form>
        </div>
    );
}

export default TrainerForm;