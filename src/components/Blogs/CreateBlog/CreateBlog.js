import styles from './CreateBlog.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from "react-hook-form";
import { Select, Snackbar, TextField, MenuItem, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Textarea } from "@mui/joy";
import UserContext from "../../Context/User/UserContext";
import BlogContext from "../../Context/Blog/BlogContext";

function CreateBlog({ close }) {
    const { user } = useContext(UserContext);
    const { fetchBlogs } = useContext(BlogContext);
    const [successSnackBar, setSuccessSnackBar] = useState(false);
    const [errorSnackBar, setErrorSnackBar] = useState(false);

    const closeSuccessSnackBar = () => {
        setSuccessSnackBar(false);
    };
    const openSuccessSnackBar = () => {
        setSuccessSnackBar(true);
    };

    const closeErrorSnackBar = () => {
        setErrorSnackBar(false);
    };

    const {
        register,
        reset,
        handleSubmit,
        control,
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        const formattedData = {
            trainerId: user.id,
            title: data.title,
            headerText: data.headerText,
            mainText: data.mainText,
            blogType: data.blogType,
            image: 'Images/etrendKep2.jpg',
        };

        try {
            const response =  await axios.post('/blog/', formattedData);
            await savePictureToBlog(response, data.file[0]);
            reset();
            await fetchBlogs();
            openSuccessSnackBar();
            setTimeout(close, 2000);
        } catch (error) {
            console.error('Error creating blog:', error);
            setErrorSnackBar(true);
        }
    };

    const savePictureToBlog = async (response, file) => {
        try {
            const formData = new FormData();
            formData.append('file', file); // Hozzáadjuk a fájlt a FormData-hoz

            const valasz = await axios.post(`/blog/upload-picture/${response.data.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(valasz)
        } catch (e) {
            console.error("Error updating training:", e);
        }
    };

    const blogTypes = ["TRAINING", "DIET"];

    return (
        <div className={styles.container}>
            <div className={styles.closeButton}><CloseIcon onClick={close}/></div>
            <div>
                <h1 className={styles.pageTitle}>Blog létrehozása</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.textInputs}>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue={null}
                            rules={{required: "A cím megadása kötelező!"}}
                            render={({field, fieldState: {error}}) => (
                                <>
                                    <TextField
                                        className={styles.titleInput}
                                        label="Cím"
                                        type="text"
                                        {...field}
                                    />
                                    {error && <span style={{color: 'red'}}>{error.message}</span>}
                                </>
                            )}
                        />

                        <Controller
                            name="blogType"
                            control={control}
                            defaultValue={"DIET"}
                            rules={{required: "A blog típus megadása kötelező!"}}
                            render={({field, fieldState: {error}}) => (
                                <>
                                    <Select
                                        className={styles.typeSelect}
                                        {...field}
                                    >
                                        {blogTypes.map((type, key) => (
                                            <MenuItem key={key} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {error && <span className={styles.errorMessage}>{error.message}</span>}
                                </>
                            )}
                        />
                    </div>
                    <div>
                        <Controller
                            name="headerText"
                            control={control}
                            defaultValue={null}
                            rules={{required: "A bevezetés szöveg megadása kötelező!"}}
                            render={({field, fieldState: {error}}) => (
                                <>
                                    <Textarea
                                        className={styles.textInput}
                                        minRows={10}
                                        placeholder="A Blog bevezetés szöveg megadása"
                                        {...field}
                                    />
                                    {error && <span style={{color: 'red'}}>{error.message}</span>}
                                </>
                            )}
                        />
                    </div>
                    <div>
                        <Controller
                            name="mainText"
                            control={control}
                            defaultValue={null}
                            rules={{required: "A fő szöveg megadása kötelező!"}}
                            render={({field, fieldState: {error}}) => (
                                <>
                                    <Textarea
                                        className={styles.textInput}
                                        minRows={10}
                                        placeholder="A Blog fő szöveg megadása"
                                        {...field}
                                    />
                                    {error && <span style={{color: 'red'}}>{error.message}</span>}
                                </>
                            )}
                        />
                    </div>
                    <div>
                        <input type="file"
                               className={styles.textInput}
                               {...register("file", {required: "Kötelező képet feltölteni"})}
                        />
                    </div>
                    <div>
                        <Button type="submit" variant="contained" className={styles.submitButton}>
                            Létrehozás
                        </Button>
                    </div>
                </form>
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
            </div>
        </div>
    );
}

export default CreateBlog;