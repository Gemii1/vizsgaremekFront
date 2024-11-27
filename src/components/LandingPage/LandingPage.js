import styles from './LandingPage.module.css'
import Navbar from '../Navbar/Navbar'
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';
import Registration from "../Registration/Registration";
import Modal from "@mui/material/Modal";
import {useState} from "react";
import Button from "@mui/material/Button";



function LandingPage({trainers, open}){

    const [isRegistrationOpen,setIsRegistration]=useState(false)

    function closeRegistration() {
        setIsRegistration(false)
    }
    function openRegistration(){
        setIsRegistration(true)
    }



    return(
        <>
            {/* Font import */}
            <link href="https://fonts.googleapis.com/css?family=Kalam" rel="stylesheet"/>
            <div style={{fontFamily:"Kalam"}}>

                <Navbar/>
                <section className={styles.banner}>
                    <div >
                        <div className={styles.registration}>
                            <h3>Edz nálunk</h3>
                            <Button style={{fontSize:'200%'}} variant="contained" className={styles.registrationButton} color="info" onClick={() => {openRegistration()}}>Regisztrálás</Button>
                        </div>
                    </div>
                </section>
                <section>
                    <div className={styles.container}>
                        <div className={styles.title}>Edzőink</div>
                        <div className={styles.cardsContainer}>
                            <Grid container spacing={2} sx={{flexGrow: 1}}>

                                {
                                    trainers.map((trainer) => {
                                        return (
                                            <>
                                                <div className={styles.cards}>
                                                    <Card variant="outlined" sx={{width: 320}}
                                                    >
                                                        <CardOverflow>
                                                            <AspectRatio minHeight="675px">
                                                                <div className={styles.trainerImage}
                                                                     style={{backgroundImage: `url(${trainer.imgURL})`}}></div>
                                                            </AspectRatio>
                                                        </CardOverflow>
                                                        <CardContent>
                                                            <Typography level="title-md">{trainer.name}</Typography>
                                                            <Typography
                                                                level="body-sm">{trainer.phoneNumber}</Typography>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </Grid>
                        </div>

                    </div>
                </section>
            </div>

            <Modal open={isRegistrationOpen} onClose={closeRegistration} className={styles.modal}>
                <div>
                    <Registration close={closeRegistration}/>
                </div>
            </Modal>

        </>
    )
}

export default LandingPage;