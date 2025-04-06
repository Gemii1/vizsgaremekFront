import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminPage.module.css';
import Navbar from '../Navbar/Navbar';
import Confirmation from '../Confirmation';
import { Modal, Snackbar } from '@mui/material';

const AdminPage = () => {
    const [trainers, setTrainers] = useState([]);
    const [isTrainerSectionOpen, setIsTrainerSectionOpen] = useState(true);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [snackBarError, setSnackBarError] = useState(false);

    const closeSnackBarError = () => setSnackBarError(false);
    const openSnackBarError = () => setSnackBarError(true);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await axios.get('/trainer/');
                const data = response.data;
                setTrainers(data);
            } catch (error) {
                console.error('Error fetching trainers:', error);
                openSnackBarError();
            }
        };
        fetchTrainers();
    }, []);

    const handleDeleteTrainer = async (trainerId) => {
        try {
            const response = await axios.delete(`/auth/delete/${trainerId}`);
            if (response.status === 200 || response.status === 204) {
                setTrainers(trainers.filter((trainer) => trainer.id !== trainerId));
                setDeleteModal(false);
            } else {
                openSnackBarError();
            }
        } catch (error) {
            console.error('Error deleting trainer:', error);
            openSnackBarError();
        }
    };

    const canDeleteTrainer = async (trainer) => {
        try {
            const blogResponse = await axios.get(`/blog/`);
            return !trainer.hasProgram && !trainer.hasBlog;
        } catch (error) {
            console.error('Error checking trainer deletability:', error);
            return false;
        }
    };

    const openDeleteModal = (id) => {
        setDeleteModal(true);
        setDeletingId(id);
    };
    const closeDeleteModal = () => setDeleteModal(false);

    return (
        <div className={styles.adminPage}>
            <Navbar />
            <div className={styles.contentWrapper}>
                <div className={styles.section}>
                    <div
                        className={styles.sectionHeader}
                        onClick={() => setIsTrainerSectionOpen(!isTrainerSectionOpen)}
                    >
                        <span>Edzők kezelése</span>
                        <span className={styles.toggleIcon}>{isTrainerSectionOpen ? '▼' : '▶'}</span>
                    </div>

                    {isTrainerSectionOpen && (
                        <div className={styles.sectionContent}>
                            {trainers.map((trainer) => (
                                <div key={trainer.id} className={styles.endpoint}>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => openDeleteModal(trainer.id)}
                                        disabled={!canDeleteTrainer(trainer)}
                                    >
                                        Törlés
                                    </button>
                                    <div className={styles.endpointInfo}>
                                        <span className={styles.endpointPath}>/trainer/{trainer.id}</span>
                                        <span className={styles.endpointDescription}>
                                            Edző: {trainer.name} (ID: {trainer.id})
                                        </span>
                                        <span className={styles.status}>
                                            {canDeleteTrainer(trainer)
                                                ? 'Nem írt blogot vagy nincs programja'
                                                : 'Írt blogot vagy van programja'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Modal open={deleteModal} onClose={closeDeleteModal}>
                <Confirmation close={closeDeleteModal} deletingId={deletingId} deleteFunction={handleDeleteTrainer} />
            </Modal>
            <Snackbar
                open={snackBarError}
                autoHideDuration={6000}
                onClose={closeSnackBarError}
                message="Sikertelen művelet!"
                sx={{ '& .MuiSnackbarContent-root': { backgroundColor: '#d32f2f' } }}
            />
        </div>
    );
};

export default AdminPage;