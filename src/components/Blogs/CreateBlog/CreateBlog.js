import styles from './CreateBlog.module.css';
import CloseIcon from '@mui/icons-material/Close';
import {Controller, useForm} from "react-hook-form";
import {Select, Snackbar, TextField} from "@mui/material";
import React, {useContext, useState} from "react";
import axios from "axios";
import {Textarea} from "@mui/joy";
import MenuItem from "@mui/material/MenuItem";
import UserContext from "../../Context/User/UserContext";
import BlogContext from "../../Context/Blog/BlogContext";
import Button from "@mui/material/Button";

function CreateBlog({close}) {
    const {user}= useContext(UserContext);
    const {fetchBlogs} = useContext(BlogContext);
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
    const {
        reset,
        handleSubmit,
        control,
        formState:{},
    }= useForm();


    const onSubmit = async (data) => {
        console.log(data);
        const formattedData = {
            trainerId: user.id,
            title: data.title,
            text: data.text,
            blogType: data.blogType,
            image: 'Images/edzesTervKep1.jpg',
        };



        await axios.post('/blog/', formattedData);
        reset();
        await fetchBlogs();
        await openSuccessSnackBar();
        setTimeout(() =>{
            close()
        },[2000])
    }

    const blogTypes = ["TRAINING","DIET"]
    return (
        <div className={styles.container}>
            <div className={styles.closeButton}><CloseIcon onClick={()=>{close()}}/></div>
            <div>
                <h1 className={styles.pageTitle}>Blog létrehozása</h1>
                <form onSubmit={    handleSubmit(onSubmit)} >
                    <div className={styles.textInputs}>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue={null}
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
                            defaultValue={"DIET"}
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
                                    {error && <span className={styles.errorMessage} >{error.message}</span>}
                                </>
                            )}
                        />
                    </div>


                    <div>
                        <Controller
                            name="text"
                            control={control}
                            defaultValue={null}
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
                    message="Sikertelen létrehozás!"
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

export default CreateBlog;