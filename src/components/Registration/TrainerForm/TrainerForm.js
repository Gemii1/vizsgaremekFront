import styles from './TrainerForm.module.css';
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";

function TrainerForm({ save }) {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            qualificationToEnum(data);
            const formattedData = {
                name: data.name,
                birthDate: data.birthDate,
                gender: data.gender,
                qualification: data.qualification,
                picture: 'Images/img1.jpg',
                phoneNumber: data.phoneNumber,
                rating: 3
            };
            const response = await save(formattedData, { email: data.email, password: data.password }, "", true);
            await savePictureToTrainer(response, data.file[0]); // Küldjük a fájlt
        } catch (error) {
            console.error("Form submission error:", error);
        }
    };

    const savePictureToTrainer = async (response, file) => {
        try {
            const formData = new FormData();
            formData.append('file', file); // Hozzáadjuk a fájlt a FormData-hoz

            const valasz = await axios.post(`/trainer/upload-picture/${response.data.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (e) {
            console.error("Error updating training:", e);
        }
    };

    const trainerQualifications = ["Personal Trainer", "Fitness Instructor", "Pilates Instructor", "Crossfit Coach", "TRX Trainer", "Pound Trainer", "Other"];

    const qualificationToEnum = (data) => {
        let qualSplitted = data.qualification.toUpperCase().split(" ");
        if (qualSplitted.length > 1) {
            data.qualification = qualSplitted.join("_");
        } else {
            data.qualification = data.qualification.toUpperCase();
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
                            name="phoneNumber"
                            control={control}
                            rules={{ required: 'A telefonszám megadása kötelező!' }}
                            render={({ field: { onChange, value } }) => (
                                <PhoneInput
                                    value={value}
                                    onChange={onChange}
                                    country="hu"
                                    inputStyle={{ width: '110%', padding: '18px', height: 'auto', paddingInline: '50px' }}
                                />
                            )}
                        />
                        {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber.message + "!"}</span>}
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
                    <div className={styles.select}>
                        <label>Foglalkozás:</label>
                        <select className={styles.input} {...register("qualification", { required: "Válasszon egy foglalkozást!" })}>
                            {trainerQualifications.map((qualification, index) => (
                                <option value={qualification} key={index}> {qualification}</option>
                            ))}
                        </select>
                        {errors.qualification && <span className={styles.error}>{errors.qualification.message}</span>}
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
                    <div>
                        <label>Kép: </label>
                        <input type="file" {...register("file", { required: "A kép feltöltése kötelező!" })} />
                        {errors.file && <span className={styles.error}>{errors.file.message}</span>}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <Button  variant="contained" color="error" onClick={() => navigate("/landingPage")}>Bezárás</Button>
                    <Button  variant="contained" color="info" type="submit">Regisztrálás</Button>
                </div>
            </form>
        </div>
    );
}

export default TrainerForm;