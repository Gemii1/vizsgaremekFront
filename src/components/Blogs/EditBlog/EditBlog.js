import styles from './EditBlog.module.css';
import React, {useContext, useState} from "react";
import BlogContext from "../../Context/Blog/BlogContext";
import {Controller, useForm} from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import {Select, Snackbar, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {Textarea} from "@mui/joy";
import Button from "@mui/material/Button";
import axios from "axios";

function EditBlog({blog, close}) {
    const {fetchBlogs} = useContext(BlogContext);
    const [successSnackBar, setSuccessSnackBar] = useState(false);
    const [errorSnackBar, setErrorSnackBar] = useState(false);
    const blogTypes = ["TRAINING","DIET"]

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


    const {
        reset,
        handleSubmit,
        control,
    }= useForm();

    const onSubmit = async (data) => {
        console.log(blog.image);
        const formattedData = {
            trainerId: blog.trainer.id,
            title: data.title,
            text: data.text,
            blogType: data.blogType,
            image: 'Images/edzesTervKep1.jpg',
        };


       try{
           await axios.put(`/blog/${blog.id}`, formattedData);
           reset();
           await fetchBlogs();
           await openSuccessSnackBar();
           setTimeout(() =>{
               close()
           },[2000])
       }catch(err){
           console.log(err);
           openErrorSnackBar()
           setTimeout(() =>{
               close()
           },[2000])
       }
    }





    return (
        <div className={styles.container}>
            <div className={styles.closeButton}><CloseIcon onClick={() => {
                close()
            }}/></div>
            <div>
                <h1 className={styles.pageTitle}>Blog módosítása</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.textInputs}>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue={blog.title}
                            rules={{required: "A cím megadása kötelező!"}}
                            render={({field, fieldState: {error}}) => (
                                <>
                                    <TextField className={styles.titleInput}
                                               label="Cím"
                                               type="text"
                                               {...field}
                                               onChange={(newValue) => field.onChange(newValue)}
                                    />
                                    {error && <span style={{color: 'red'}}>{error.message}</span>}
                                </>
                            )}
                        />

                        <Controller
                            name="blogType"
                            control={control}
                            defaultValue={blog.blogType}
                            rules={{required: "A blog típus megadása kötelező!"}}

                            render={({field, fieldState: {error}}) => (
                                <>
                                    <Select
                                        className={styles.typeSelect}
                                        {...field}
                                        onChange={(newValue) => field.onChange(newValue)}
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
                            defaultValue={blog.text}
                            rules={{required: "A szöveg megadása kötelező!"}}
                            render={({field, fieldState: {error}}) => (
                                <>
                                    <Textarea className={styles.textInput}
                                              minRows={10}
                                              placeholder="A Blog szöveg megadása kötelező"
                                              {...field}
                                              onChange={(newValue) => field.onChange(newValue)}
                                    />
                                    {error && <span style={{color: 'red'}}>{error.message}</span>}
                                </>
                            )}
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
                    message="Sikertelen módosítás!"
                    sx={{
                        '& .MuiSnackbarContent-root': {
                            backgroundColor: 'red',
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default EditBlog;