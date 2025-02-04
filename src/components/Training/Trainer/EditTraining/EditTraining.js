import styles from "../CreateTraining/CreateTraining.module.css";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Controller, useForm} from "react-hook-form";
import {Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {useEffect} from "react";

function EditTraining({program}) {

    const {
        register,
        handleSubmit,
        control,
        formState:{errors},
    }= useForm();

    const onSubmit = (data) => {
        console.log(program);

        console.log(data);
    }
    const programTypes = ["Personal", "Fitness","PILATES", "Crossfit", "TRX","Pound", "Other"]


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

export default EditTraining;