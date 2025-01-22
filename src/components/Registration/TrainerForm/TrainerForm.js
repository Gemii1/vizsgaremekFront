import styles from './TrainerForm.module.css';
import {useForm,Controller} from "react-hook-form";
import PhoneInput from "react-phone-input-2";

function TrainerForm() {

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

    const onSubmit = (data) => {
        setLoginData(data)
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
                        <input
                            placeholder="Teljes név"
                            {...register("userName", {
                                required: true,
                                minLength: 2,
                                pattern: /^[A-Za-z]+$/i,
                            })}
                        />
                        {errors.userName && <span className={styles.error}>Hibás név!</span>}
                    </div>
                    <div>
                        <input
                            placeholder="Email"
                            type="email"
                            {...register("email", {
                                required: true,
                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            })}
                        />
                        {errors.email && <span className={styles.error}>Hibás email!</span>}
                    </div>
                    <div>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{ required: 'A telefonszám megadása kötelező!' }}
                            render={({ field: { onChange, value } }) => (
                                <PhoneInput
                                    value={value}
                                    onChange={onChange}
                                    country="hu"
                                    className={styles.phone}
                                />
                            )}
                        />
                        {errors.phone && <span className={styles.error}>{errors.phone.message+"!"}</span>}
                    </div>
                    <div>
                        <input
                            placeholder="Születési év"
                            type="date"
                            {...register("birthDay", {
                                required: true,
                            })}
                        />
                        {errors.birthDay && <span className={styles.error}>Hibás születési év!</span>}
                    </div>
                    <div>
                        <select {...register("qualification",{required:true})}>
                            {trainerQualifications.map((qualification,index) => (
                                <option value={qualification} key={index}> {qualification}</option>
                            ))}
                        </select>
                        {errors.qualification && <span className={styles.error}>Hibás foglalkozás!</span>}
                    </div>
                    <div>
                        <input
                            placeholder="Jelszó"
                            type="password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        {errors.password && <span className={styles.error}>Hibás jelszó!</span>}
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="MALE"
                                {...register("gender", {required: true})}
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="FEMALE"
                                {...register("gender", {required: true})}
                            />
                            Female
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="OTHER"
                                {...register("gender", {required: true})}
                            />
                            Other
                        </label>
                        {errors.gender && <span className={styles.error}>Hibás nem!</span>}
                    </div>
                </div>
                <button type="submit">Küldés</button>
            </form>
        </div>
    );
}

export default TrainerForm;