import styles from './CreateTraining.module.css';
import {Controller, useForm} from "react-hook-form";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import Button from "@mui/material/Button";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Select, Snackbar, TextField} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import React, {useContext, useState} from "react";
import UserContext from "../../../Context/User/UserContext";
import axios from "axios";
import ProgramContext from "../../../Context/Program/ProgramContext";



function CreateTraining({close}) {

    const {user}= useContext(UserContext);
    const {fetchPrograms} = useContext(ProgramContext);
    const [snackBar, setSnackBar] = useState(false);
    const closeSnackBar = () => {
        setSnackBar(false);
    }
    const openSnackBar = () => {
        setSnackBar(true);
    }

    const {
        reset,
        handleSubmit,
        control,
        formState:{errors},
    }= useForm();

    const onSubmit = async (data) => {
        const formattedData = {
            trainerId: user.id,
            startTime: formatDateTime(data.date.$d, data.startTime.$d),
            endTime: formatDateTime(data.date.$d, data.endTime.$d),
            price: data.price,
            capacity: data.capacity,
            programType: data.programType.toUpperCase()
        };

        await axios.post('/program/', formattedData);
        reset();
        await fetchPrograms();
        await openSnackBar();
        setTimeout(() =>{
            close();
        },[2000])
    }


    const formatDateTime = (dateString, timeString) => {
        const date = new Date(dateString);
        const time = new Date(timeString);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;

    }

    const programTypes = ["Strength_Training", "B_Fit","Pilates", "Crossfit", "TRX","Functional_Training", "Spinning"]


    return(
        <div className={styles.container}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form  onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.inputs}>
                        <div>
                            <Controller
                                name="date"
                                control={control}
                                defaultValue={null}
                                rules={{ required: "A dátum megadása kötelező!" }}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <DatePicker
                                            label="Nap"
                                            {...field}
                                            onChange={(newValue) => field.onChange(newValue)}
                                        />
                                        {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                    </>
                                )}
                            />
                        </div>
                        <div>
                            <Controller
                                name="startTime"
                                control={control}
                                defaultValue={null}
                                rules={{required: "A kezdés idő megadása kötelező!"}}
                                render={({field,fieldState:{error}}) => (
                                    <>
                                        <TimePicker
                                            label="Kezdete"
                                            {...field}
                                            onChange={(newValue) => field.onChange(newValue)}
                                        />
                                        {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                    </>
                            )}
                            />

                        </div>
                        <div>
                            <Controller
                                name="endTime"
                                control={control}
                                defaultValue={null}
                                rules={{required: "A program végének ideje megadása kötelező!"}}
                                render={({field,fieldState:{error}}) => (
                                   <>
                                       <TimePicker
                                           label="Vége"
                                           {...field}
                                           onChange={(newValue) => field.onChange(newValue)}
                                       />
                                       {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                   </>
                            )}
                            />
                        </div>
                        <div>
                            <Controller
                                name="price"
                                control={control}
                                defaultValue={null}
                                rules={{required: "Az ár megadása kötelező!"}}
                                render={({field,fieldState:{error}}) => (
                                    <>
                                        <TextField className={styles.textFields}
                                                   label="Ár"
                                                   type="number"
                                                   {...field}
                                                   onChange={(newValue) => field.onChange(newValue)}
                                        />
                                        {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                    </>
                            )}
                            />

                        </div>
                        <div>
                            <Controller
                                name="capacity"
                                control={control}
                                defaultValue={null}
                                rules={{required: "A létszám megadása kötelező"}}
                                render={({field,fieldState:{error}}) => (
                                    <>
                                        <TextField className={styles.textFields}
                                                   label="Max létszám"
                                                   type="number"
                                                   {...field}
                                                   onChange={(newValue) => field.onChange(newValue)}
                                        />
                                        {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                    </>
                                )}
                            />

                        </div>
                        <div>
                            <Controller
                                name="programType"
                                control={control}
                                defaultValue={"TRX"}
                                rules={{required: "A program típus megadása kötelező!"}}

                                render={({ field,fieldState:{error} }) => (
                                    <>
                                        <Select
                                            className={styles.textFields}
                                            aria-label="Program Típus"
                                            {...field}
                                            onChange={(newValue) => field.onChange(newValue)}
                                        >
                                            {programTypes.map((type, key) => (
                                                <MenuItem key={key} value={type}>
                                                    {type}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                    </>
                            )}
                            />
                        </div>
                        <Button type="submit" variant="contained" className={styles.submitButton}>
                            Létrehozás
                        </Button>
                    </div>
                </form>
            </LocalizationProvider>
            <Snackbar
                open={snackBar}
                autoHideDuration={6000}
                onClose={closeSnackBar}
                message="Sikeresen létrehozás!"
            />
        </div>
    )
}

export default CreateTraining;