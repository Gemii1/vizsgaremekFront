import styles from './Client.module.css';
import { Grid } from '@mui/joy';
import { Divider, Button, Snackbar, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/User/UserContext";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ProgramContext from "../../Context/Program/ProgramContext";
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Rating from '@mui/material/Rating';

function Client() {
    const { user, isUserLoggedIn } = useContext(UserContext);
    const { programs } = useContext(ProgramContext);
    const [snackBarSuccess, setSnackBarSuccess] = useState(false);
    const [snackBarError, setSnackBarError] = useState(false);
    const [registeredPrograms, setRegisteredPrograms] = useState({});
    const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
    const [participatedPrograms, setParticipatedPrograms] = useState({});

    const closeSnackBarSuccess = () => setSnackBarSuccess(false);
    const openSnackBarSuccess = () => setSnackBarSuccess(true);
    const closeSnackBarError = () => setSnackBarError(false);
    const openSnackBarError = () => setSnackBarError(true);

    const getWeekDays = (startDate) => {
        const days = [];
        const start = new Date(startDate);
        start.setDate(start.getDate() - start.getDay() + 1);
        for (let i = 0; i < 5; i++) {
            const day = new Date(start);
            day.setDate(start.getDate() + i);
            days.push(day);
        }
        return days;
    };

    const [weekDays, setWeekDays] = useState(getWeekDays(currentWeekStart));

    const handlePrevWeek = () => {
        const newStart = new Date(currentWeekStart);
        newStart.setDate(newStart.getDate() - 7);
        setCurrentWeekStart(newStart);
        setWeekDays(getWeekDays(newStart));
    };

    const handleNextWeek = () => {
        const newStart = new Date(currentWeekStart);
        newStart.setDate(newStart.getDate() + 7);
        setCurrentWeekStart(newStart);
        setWeekDays(getWeekDays(newStart));
    };

    const formatDate = (date) => {
        const options = { weekday: 'long' };
        const dayName = new Intl.DateTimeFormat('hu-HU', options).format(date);
        return dayName.charAt(0).toUpperCase() + dayName.slice(1);
    };

    const filteredPrograms = programs.filter(program => {
        const programDate = new Date(program.startTime);
        const weekStart = new Date(weekDays[0]);
        const weekEnd = new Date(weekDays[4]);
        return programDate >= weekStart && programDate <= weekEnd;
    });

    const groupedPrograms = filteredPrograms.reduce((acc, program) => {
        const day = formatDate(new Date(program.startTime));
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(program);
        return acc;
    }, {});

    const getTime = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const handleUserRegistrationToProgram = async (program) => {
        try {
            await axios.post(`/program/${program.id}/clients/${user.id}`);
            await getProgramClients(program);
            openSnackBarSuccess();
        } catch (error) {
            openSnackBarError();
        }
    };

    const handleUserCancellationToProgram = async (program) => {
        try {
            await axios.delete(`/program/${program.id}/clients/${user.id}`);
            await getProgramClients(program);
            openSnackBarSuccess();
        } catch (error) {
            openSnackBarError();
        }
    };

    const getProgramClients = async (program) => {
        try {
            const response = await axios.get(`/program/${program.id}/client-list`);
            if (response.data && Array.isArray(response.data)) {
                const isRegistered = response.data.some(client => client.id === user.id);
                setRegisteredPrograms(prevState => ({
                    ...prevState,
                    [program.id]: isRegistered
                }));
            }
        } catch (error) {
            console.error("Hiba a jelentkezők lekérése során:", error);
        }
    };

    // Ellenőrzi, hogy a kliens részt vett-e a programon
    const wasOnProgram = async (clientId, programId) => {
        try {
            const response = await axios.get(`/program/${programId}/client-list`);
            return response.data.some(client => client.id === clientId);
        } catch (error) {
            console.error("Hiba a program résztvevőinek ellenőrzésekor:", error);
            return false;
        }
    };

    useEffect(() => {
        programs.forEach(program => {
            getProgramClients(program);
        });
    }, [programs]);

    const handleRatingSubmit = async (trainerId, score) => {
        try {
            if (score > 0) {
                await axios.post(`/trainer/${trainerId}/rating`, {
                    score: score
                });
                openSnackBarSuccess();
            }
        } catch (error) {
            console.error("Hiba az értékelés beküldésekor:", error);
            openSnackBarError();
        }
    };

    const handleApplication = (isLoggedIn, program) => {
        if (isLoggedIn && program.status === "UPCOMING" && !registeredPrograms[program.id]) {
            return (
                <Button variant='contained' sx={{ fontSize: '1.3rem' }} onClick={() => handleUserRegistrationToProgram(program)}>
                    Jelentkezés
                </Button>
            );
        } else if (isLoggedIn && program.status === "UPCOMING" && registeredPrograms[program.id]) {
            return (
                <Button variant='outlined' color='error' sx={{ fontSize: '1.3rem' }} onClick={() => handleUserCancellationToProgram(program)}>
                    Lemondás
                </Button>
            );
        } else if (isLoggedIn && program.status === "COMPLETED") {
            return (
                <div >
                    <Rating
                        name={`rating-${program.id}`}
                        defaultValue={0}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                handleRatingSubmit(program.trainer.id, newValue);
                            }
                        }}
                        size="medium"
                    />
                </div>
            );
        }
        return null;
    };

    const handleStatus = (status) => {
        let color, statusText;
        switch (status) {
            case "UPCOMING":
                color = 'green';
                statusText = 'Közelgő';
                break;
            case "ONGOING":
                color = 'orange';
                statusText = 'Folyamatban lévő';
                break;
            case "COMPLETED":
                color = 'red';
                statusText = 'Befejezett';
                break;
            default:
                return null;
        }
        return (
            <>
                <MoreVertIcon style={{ color: color }} />
                <div>{statusText}</div>
            </>
        );
    };

    const handleProgramType = (programType) => {
        let typeText;
        switch (programType) {
            case "FUNCTIONAL_TRAINING":
                typeText = "Funkcionális edzés";
                break;
            case "B_FIT":
                typeText = "B edzés";
                break;
            case "PILATES":
                typeText = "Pilates edzés";
                break;
            default:
                return null;
        }
        return <>{typeText}</>;
    };

    return (
        <div className={styles.calendar}>
            <meta name="viewport" content="width=720" />
            <div className={styles.calendarWeek}>
                <IconButton onClick={handlePrevWeek}>
                    <ArrowBackIcon />
                </IconButton>
                <h3>{`${weekDays[0].toLocaleDateString('hu-HU')} - ${weekDays[4].toLocaleDateString('hu-HU')}`}</h3>
                <IconButton onClick={handleNextWeek}>
                    <ArrowForwardIcon />
                </IconButton>
            </div>
            <Grid container rowSpacing={1} spacing={2} columns={{ xs: 2, sm: 2, md: 12 }}>
                {weekDays.map((date) => {
                    const day = formatDate(date);
                    return (
                        <Grid item xs={2.4} key={day} className={styles.days}>
                            <div className={styles.program}>
                                <h2>{day}</h2>
                                <Divider color='black' />
                                <div className={styles.programOnDay}>
                                    <p>Programok:</p>
                                    {groupedPrograms[day] ? (
                                        groupedPrograms[day].map((program, index) => (
                                            <div key={index}>
                                                <Divider />
                                                <div className={styles.status}>
                                                    {handleStatus(program.status)}
                                                </div>
                                                <div className={styles.dates}>
                                                    <div><h3>Edzés: </h3> {handleProgramType(program.programType)}</div>
                                                    <div><h3>Edző: </h3> {program.trainer.name}</div>
                                                    <div><h3>Kezdés: </h3> {getTime(program.startTime)}</div>
                                                    <div><h3>Vége: </h3> {getTime(program.endTime)}</div>
                                                    <div><h3>Ár: </h3> {program.price} Ft</div>
                                                </div>
                                                <div className={styles.signUpButton}>
                                                    {handleApplication(isUserLoggedIn, program)}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            <Divider />
                                            <div>Nincs program</div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Grid>
                    );
                })}
            </Grid>
            <Snackbar
                open={snackBarSuccess}
                autoHideDuration={6000}
                onClose={closeSnackBarSuccess}
                message="Sikeres!"
                sx={{ '& .MuiSnackbarContent-root': { backgroundColor: 'green' } }}
            />
            <Snackbar
                open={snackBarError}
                autoHideDuration={6000}
                onClose={closeSnackBarError}
                message="Sikertelen próbálkozás!"
                sx={{ '& .MuiSnackbarContent-root': { backgroundColor: 'red' } }}
            />
        </div>
    );
}

export default Client;