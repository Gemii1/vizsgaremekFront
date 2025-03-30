import styles from './LandingPage.module.css';
import Navbar from '../Navbar/Navbar';
import React, { useEffect, useState } from 'react';
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
import axios from "axios";

function LandingPage() {
    const navigate = useNavigate();
    const { isUserLoggedIn } = useContext(UserContext);
    const [trainers, setTrainers] = useState([]);
    const [trainerImages, setTrainerImages] = useState({});

    // Fetch trainers
    const fetchTrainers = async () => {
        try {
            const response = await axios.get('/trainer/');
            setTrainers(response.data);
            // Fetch images for each trainer after trainers are loaded
            fetchTrainerImages(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch trainer images
    const fetchTrainerImages = async (trainers) => {
        const imagePromises = trainers.map(async (trainer) => {
            try {
                const response = await axios.get(`/trainer/picture/${trainer.id}`, {
                    responseType: 'arraybuffer' // Get raw binary data instead of JSON
                });
                const byteArray = new Uint8Array(response.data);
                const blob = new Blob([byteArray], { type: 'image/jpeg' });
                const imageUrl = URL.createObjectURL(blob);
                return { id: trainer.id, url: imageUrl };
            } catch (error) {
                console.error(`Failed to fetch image for trainer ${trainer.id}:`, error);
                return { id: trainer.id, url: null }; // Fallback if image fetch fails
            }
        });

        const images = await Promise.all(imagePromises);
        const imageMap = images.reduce((acc, { id, url }) => {
            acc[id] = url;
            return acc;
        }, {});
        setTrainerImages(imageMap);
    };

    useEffect(() => {
        fetchTrainers();
    }, []);

    const handleRegButton = () => {
        if (!isUserLoggedIn) {
            return (
                <Button
                    style={{ fontSize: '200%' }}
                    variant="contained"
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
            <link href="https://fonts.googleapis.com/css?family=Inter" rel="stylesheet" />
            <meta name="viewport" content="width=720" />
            <div style={{ fontFamily: "Inter" }}>
                <Navbar />
                <section className={styles.banner}>
                    <div>
                        <div className={styles.registration}>
                            <h3 style={{ margin: '10px' }}>Eddz velünk!</h3>
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
                                    trainers.map((trainer, index) => {
                                        if (index < 5) {
                                            const imageUrl = trainerImages[trainer.id] || ''; // Use fetched image URL or empty string
                                            return (
                                                <div className={styles.cards} key={trainer.id}>
                                                    <Card variant="outlined" sx={{ width: 320 }}>
                                                        <CardOverflow>
                                                            <AspectRatio minHeight="575px">
                                                                <div
                                                                    className={styles.trainerImage}
                                                                    style={{ backgroundImage: `url(${imageUrl})` }}
                                                                />
                                                            </AspectRatio>
                                                        </CardOverflow>
                                                        <CardContent className={styles.cardContent}>
                                                            <div>
                                                                <Typography>{trainer.name}</Typography>
                                                                <Typography>{formatPhoneNumber(trainer.phoneNumber)}</Typography>
                                                                <Typography>{formatQualification(trainer.qualification)}</Typography>
                                                            </div>
                                                            <div className={styles.rating}>
                                                                <label>{trainer.rating}</label>
                                                                <StarRateIcon className={styles.star} color="primary" />
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
    );
}

export default LandingPage;