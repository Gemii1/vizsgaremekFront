import styles from "../CreateTraining/CreateTraining.module.css";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Controller, useForm} from "react-hook-form";
import {Select, Snackbar, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import React, {useContext, useState} from "react";
import dayjs from "dayjs";
import axios from "axios";
import ProgramContext from "../../../Context/Program/ProgramContext";

function EditTraining({program, close}) {
    const {fetchPrograms} = useContext(ProgramContext);
    const {
        reset,
        handleSubmit,
        control,
    }= useForm();

    const onSubmit = async (data) => {
        const editedData = {
            trainerId: program.trainer.id,
            startTime: formatDateTime(data.date.$d, data.startTime.$d),
            endTime: formatDateTime(data.date.$d, data.endTime.$d),
            price: data.price,
            capacity: data.capacity,
            programType: data.programType.toUpperCase()
        };
        try {
            await axios.put(`/program/${program.id}`, editedData);
            await openSuccessSnackBar();
        }catch (error) {
            await openErrorSnackBar();
        }
        reset();
        await fetchPrograms();
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
    const [successSnackBar, setSuccessSnackBar] = useState(false);
    const [errorSnackBar, setErrorSnackBar] = useState(false);

    const closeSuccessSnackBar = () => {
        setSuccessSnackBar(false);
    }
    const openSuccessSnackBar = () => {
        setSuccessSnackBar(true);
    }

    const closeErrorSnackBar = () => {
        setErrorSnackBar(false);
    }
    const openErrorSnackBar = () => {
        setErrorSnackBar(true);
    }
    return(
        <div className={styles.container}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.inputs}>
                        <div>
                            <Controller
                                name="date"
                                control={control}
                                defaultValue={dayjs(program.endTime)}
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
                                defaultValue={dayjs(program.startTime)}
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
                                defaultValue={dayjs(program.endTime)}
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
                                defaultValue={program.price}

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
                                defaultValue={program.capacity}

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
                                defaultValue={program.programType}
                                render={({field}) => (
                                    <Select
                                        className={styles.textFields}
                                        aria-label="Program Típus"
                                        {...field}
                                        onChange={(newValue) => field.onChange(newValue)}
                                    >
                                        {programTypes.map((type, key) => (
                                            <MenuItem key={key} value={type.toUpperCase()}>
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
                    <Snackbar
                        open={successSnackBar}
                        autoHideDuration={6000}
                        onClose={closeSuccessSnackBar}
                        message="Sikeresen létrehozás!"
                        sx={{
                            '& .MuiSnackbarContent-root': {
                                backgroundColor: 'green',
                            }
                        }}

                    />
                    <Snackbar
                        open={errorSnackBar}
                        autoHideDuration={6000}
                        onClose={closeErrorSnackBar}
                        message="Sikertelen létrehozás!"
                        sx={{
                            '& .MuiSnackbarContent-root': {
                                backgroundColor: 'red',
                            }
                        }}
                    />
                </form>
            </LocalizationProvider>
        </div>
    )
}

export default EditTraining;