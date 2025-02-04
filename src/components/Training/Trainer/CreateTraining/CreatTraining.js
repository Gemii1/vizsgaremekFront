import styles from './CreateTraining.module.css';
import {Controller, useForm} from "react-hook-form";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import Button from "@mui/material/Button";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Select, TextField} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import {useContext, useState} from "react";
import UserContext from "../../../Context/User/UserContext";
import axios from "axios";
import ProgramContext from "../../../Context/Program/ProgramContext";



function CreateTraining() {

    const {user}= useContext(UserContext);
    const {fetchPrograms} = useContext(ProgramContext);

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
            programType: data.programType
        };

        await axios.post('/program/', formattedData);
        reset();
        await fetchPrograms();
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

    const programTypes = ["Pe", "Fitness","Pilates", "Crossfit", "TRX","Pound", "Other"]


    return(
        <div className={styles.container}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.inputs}>
                        <div>
                            <Controller
                                name="date"
                                control={control}
                                defaultValue={null}
                                render={({field}) => (
                                    <DatePicker
                                        label="Nap"
                                        {...field}
                                        onChange={(newValue) => field.onChange(newValue)}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Controller
                                name="startTime"
                                control={control}
                                defaultValue={null}
                                render={({field}) => (
                                    <TimePicker
                                        label="Kezdete"
                                        {...field}
                                        onChange={(newValue) => field.onChange(newValue)}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Controller
                                name="endTime"
                                control={control}
                                defaultValue={null}
                                render={({field}) => (
                                    <TimePicker
                                        label="Vége"
                                        {...field}
                                        onChange={(newValue) => field.onChange(newValue)}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Controller
                                name="price"
                                control={control}
                                defaultValue={null}
                                render={({field}) => (
                                    <TextField className={styles.textFields}
                                       label="Ár"
                                       type="number"
                                       {...field}
                                       onChange={(newValue) => field.onChange(newValue)}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Controller
                                name="capacity"
                                control={control}
                                defaultValue={null}
                                render={({field}) => (
                                    <TextField className={styles.textFields}
                                       label="Max létszám"
                                       type="number"
                                       {...field}
                                       onChange={(newValue) => field.onChange(newValue)}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Controller
                                name="programType"
                                control={control}
                                defaultValue={"TRX"}
                                render={({ field }) => (
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
                                )}
                            />
                        </div>
                        <Button type="submit" variant="contained">
                            Létrehozás
                        </Button>
                    </div>
                </form>
            </LocalizationProvider>
        </div>
    )
}

export default CreateTraining;