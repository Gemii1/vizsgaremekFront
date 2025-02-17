import {useNavigate} from "react-router";
import {Controller, useForm} from "react-hook-form";
import styles from "../TrainerForm/TrainerForm.module.css";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'

import Button from "@mui/material/Button";

function ClientForm({save}) {
    let navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        formState:{errors},
    }= useForm();

    let loginData = {
        email :'',
        password : ''
    }

    const onSubmit = (data) => {
        setLoginData(data)
        try {
            setLoginData(data)
            const formattedData = {
                name: data.name,
                birthDate: data.birthDate,
                gender: data.gender,
                phone: data.phone,
            };
            save("",loginData,formattedData,false);
        }catch(error){
            console.log(error)
        }
    };




    const setLoginData = (data) => {
        loginData.email = data.email;
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
                               {...register("name", {
                                   required: true,
                                   minLength: 2,
                                   pattern: /^[A-Za-z]+$/i,
                               })}
                        />
                        {errors.name && <span className={styles.error}>Hibás név!</span>}
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
                            name="phone"
                            control={control}
                            rules={{required: 'A telefonszám megadása kötelező!'}}
                            render={({field: {onChange, value}}) => (
                                <PhoneInput
                                    value={value}
                                    onChange={onChange}
                                    country="hu"
                                    className={styles.phone}
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
                               {...register("birthDate", {
                                   required: true,
                               })}
                        />
                        {errors.birthDate && <span className={styles.error}>Hibás születési év!</span>}
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
export default ClientForm;