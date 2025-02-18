import styles from './EditBlog.module.css';
import React, { useContext, useState } from "react";
import BlogContext from "../../Context/Blog/BlogContext";
import { Controller, useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { Select, Snackbar, TextField, MenuItem, Button } from "@mui/material";
import { Textarea } from "@mui/joy";
import axios from "axios";

function EditBlog({ blog, close }) {
    const { fetchBlogs } = useContext(BlogContext);
    const [successSnackBar, setSuccessSnackBar] = useState(false);
    const [errorSnackBar, setErrorSnackBar] = useState(false);
    const blogTypes = ["TRAINING", "DIET"];

    const closeSuccessSnackBar = () => {
        setSuccessSnackBar(false);
    };
    const openSuccessSnackBar = () => {
        setSuccessSnackBar(true);
    };

    const closeErrorSnackBar = () => {
        setErrorSnackBar(false);
    };
    const openErrorSnackBar = () => {
        setErrorSnackBar(true);
    };

    const { reset, handleSubmit, control } = useForm({
        defaultValues: {
            title: blog.title,
            text: blog.text,
            blogType: blog.blogType,
        }
    });

    const onSubmit = async (data) => {
        const formattedData = {
            trainerId: blog.trainer.id,
            title: data.title,
            text: data.text,
            blogType: data.blogType,
            image: 'Images/edzesTervKep1.jpg',
        };

        try {
            await axios.put(`/blog/${blog.id}`, formattedData);
            reset();
            await fetchBlogs();
            openSuccessSnackBar();
            setTimeout(close, 2000);
        } catch (error) {
            console.error('Error updating blog:', error);
            openErrorSnackBar();
            setTimeout(close, 2000);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.closeButton}><CloseIcon onClick={close} /></div>
            <div>
                <h1 className={styles.pageTitle}>Blog módosítása</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.textInputs}>
                        <Controller
                            name="title"
                            control={control}
                            rules={{ required: "A cím megadása kötelező!" }}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <TextField
                                        className={styles.titleInput}
                                        label="Cím"
                                        type="text"
                                        {...field}
                                    />
                                    {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                </>
                            )}
                        />

                        <Controller
                            name="blogType"
                            control={control}
                            rules={{ required: "A blog típus megadása kötelező!" }}
                            render={({ field, fieldState: { error } }) => (
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
                            name="text"
                            control={control}
                            rules={{ required: "A szöveg megadása kötelező!" }}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Textarea
                                        className={styles.textInput}
                                        minRows={10}
                                        placeholder="A Blog szöveg megadása kötelező"
                                        {...field}
                                    />
                                    {error && <span style={{ color: 'red' }}>{error.message}</span>}
                                </>
                            )}
                        />
                    </div>
                    <div>
                        <Button type="submit" variant="contained" className={styles.submitButton}>
                            Módosítás
                        </Button>
                    </div>
                </form>
                <Snackbar
                    open={successSnackBar}
                    autoHideDuration={6000}
                    onClose={closeSuccessSnackBar}
                    message="Sikeresen módosítva!"
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
                    message="Sikertelen módosítás!"
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

export default EditBlog;