import styles from './LoginPage.module.css'
import * as React from 'react';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";


function LoginPage() {

    let navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState:{errors},
    }= useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <div className={styles.login}>
            <div className={styles.container}>
                <h2>Bejelentkezés</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputs}>
                        <div>
                            <input placeholder="Felhasználó név" className={styles.userName} {...register("userName", {
                                required: true,
                                minLength: 2,
                            })} />
                            <div className={styles.error}>
                                {errors.userName && <span>Hibás felhasználó név</span>}
                            </div>
                        </div>
                        <div>
                            <input placeholder="Jelszó" type={"password"} className={styles.password} {...register("password", {
                                required: true,
                                minLength: 2,
                            })} />
                            <div className={styles.error}>
                                {errors.password && <span>Hibás jelszó!</span>}
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            <Button className={styles.closeButton} variant="contained"
                                    onClick={() => {
                                        navigate("/landingPage")
                                    }}>Bezárás</Button>
                            <Button className={styles.sendButton} variant="contained" color="info"
                                    onClick={handleSubmit(onSubmit)} >Bejelentkezés</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default LoginPage;