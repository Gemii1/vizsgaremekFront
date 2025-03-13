import styles from './LandingPage.module.css';
import Navbar from '../Navbar/Navbar';
import React from 'react';
import {
    AspectRatio,
    Card,
    CardContent,
    CardOverflow,
    Typography,
    Grid,
    Divider
} from '@mui/joy';
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useContext } from "react";
import UserContext from "../Context/User/UserContext";
import StarRateIcon from '@mui/icons-material/StarRate';

function LandingPage({ trainers }) {
    const navigate = useNavigate();
    const { isUserLoggedIn } = useContext(UserContext);

    const handleRegButton = () => {
        if (!isUserLoggedIn) {
            return (
                <Button
                    style={{ fontSize: '200%' }}
                    variant="contained"
                    className={styles.registrationButton}
                    color="info"
                    onClick={() => navigate("/registration")}
                >
                    Regisztrálás
                </Button>
            );
        }
    };

    const formatQualification = (text) => {
        return text
            .toLowerCase()
            .replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/(\d{2})(\d{2})(\d{3})(\d{3})/, '+$1 ($2) $3-$4');
    };

    return (
        <>
            {/* Font import */}
            <link href="https://fonts.googleapis.com/css?family=Kalam" rel="stylesheet" />
            <meta name="viewport" content="width=720" />
            <div style={{ fontFamily: "Kalam" }}>
                <Navbar />
                <section className={styles.banner}>
                    <div>
                        <div className={styles.registration}>
                            <h3 style={{ margin: '10px' }}>Eddz velünk</h3>
                            <p className={styles.quote}>„Nem a kő súlya az, ami számít. Hanem az ok, amiért felemeled.” --Hugo Girard</p>
                            {handleRegButton()}
                        </div>
                    </div>
                </section>
                <Divider />
                <section>
                    <div className={styles.container}>
                        <div className={styles.title}>Edzőink</div>
                        <div className={styles.cardsContainer}>
                            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                                {trainers.length > 0 ? (
                                    trainers.map((trainer, index) =>{
                                        if (index<5) {
                                            return (
                                                <div className={styles.cards} key={trainer.id}>
                                                    <Card variant="outlined" sx={{width: 320}}>
                                                        <CardOverflow>
                                                            <AspectRatio minHeight="575px">
                                                                <div
                                                                    className={styles.trainerImage}
                                                                    style={{backgroundImage: `url(${trainer.picture})`}}
                                                                />
                                                            </AspectRatio>
                                                        </CardOverflow>
                                                        <CardContent className={styles.cardContent}>
                                                            <div>
                                                                <Typography level="title-md">{trainer.name}</Typography>
                                                                <Typography
                                                                    level="body-sm">{formatPhoneNumber(trainer.phoneNumber)}</Typography>
                                                                <Typography
                                                                    level="body-sm">{formatQualification(trainer.qualification)}</Typography>
                                                            </div>
                                                            <div className={styles.rating}>
                                                                <label>{trainer.rating}</label>
                                                                <StarRateIcon className={styles.star} color="primary"/>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            );

                                        }
                                        return null;
                                    })
                                    ) : (
                                    <h1 className={styles.trainerError}>Jelenleg egy edző se dolgozik nálunk!</h1>
                            )}
                        </Grid>
                    </div>
            </div>
        </section>
</div>
</>
)
    ;
}

export default LandingPage;