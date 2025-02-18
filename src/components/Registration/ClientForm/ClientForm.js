import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import styles from "../TrainerForm/TrainerForm.module.css";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { Button } from "@mui/material";

function ClientForm({ save }) {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        try {
            const formattedData = {
                name: data.name,
                birthDate: data.birthDate,
                gender: data.gender,
                phone: data.phone,
            };
            save("", { email: data.email, password: data.password }, formattedData, false);
        } catch (error) {
            console.error("Form submission error:", error);
        }
    };

    return (
        <div className={styles.form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputs}>
                    <div>
                        <label>Teljes név:</label>
                        <input
                            className={styles.input}
                            placeholder="Jhon Do"
                            {...register("name", {
                                required: "A név megadása kötelező!",
                                minLength: {
                                    value: 2,
                                    message: "A név legalább 2 karakter hosszú kell legyen!"
                                },
                                pattern: {
                                    value: /^[A-Za-z]+$/i,
                                    message: "A név csak betűket tartalmazhat!"
                                },
                            })}
                        />
                        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            className={styles.input}
                            placeholder="pelda@gmail.com"
                            type="email"
                            {...register("email", {
                                required: "Az email megadása kötelező!",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Érvénytelen email formátum!"
                                },
                            })}
                        />
                        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                    </div>
                    <div>
                        <label>Telefonszám:</label>
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
                                    inputStyle={{ width: '110%', padding: '18px', height: 'auto', paddingInline: '50px' }}
                                />
                            )}
                        />
                        {errors.phone && <span className={styles.error}>{errors.phone.message + "!"}</span>}
                    </div>
                    <div>
                        <label>Születési év:</label>
                        <input
                            className={styles.input}
                            placeholder="Születési év"
                            type="date"
                            {...register("birthDate", { required: "A születési év megadása kötelező!" })}
                        />
                        {errors.birthDate && <span className={styles.error}>{errors.birthDate.message}</span>}
                    </div>
                    <div>
                        <label>Jelszó:</label>
                        <input
                            className={styles.input}
                            placeholder="Jelszó"
                            type="password"
                            {...register("password", { required: "A jelszó megadása kötelező!" })}
                        />
                        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                    </div>
                    <div className={styles.formRadio}>
                        <label>Nem:</label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                value="MALE"
                                {...register("gender", { required: "Válasszon egy nemet!" })}
                            />
                            Férfi
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="FEMALE"
                                {...register("gender", { required: "Válasszon egy nemet!" })}
                            />
                            Nő
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="OTHER"
                                {...register("gender", { required: "Válasszon egy nemet!" })}
                            />
                            Egyéb
                        </label>
                        {errors.gender && <span className={styles.error}>{errors.gender.message}</span>}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <Button className={styles.closeButton} variant="contained" color="error" onClick={() => navigate("/landingPage")}>Bezárás</Button>
                    <Button className={styles.closeButton} variant="contained" color="info" type="submit">Regisztrálás</Button>
                </div>
            </form>
        </div>
    );
}

export default ClientForm;