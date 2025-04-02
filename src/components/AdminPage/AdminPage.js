import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminPage.module.css';
import Navbar from "../Navbar/Navbar"; // Import CSS Module

const AdminPage = () => {
    const [trainers, setTrainers] = useState([]);
    const [isTrainerSectionOpen, setIsTrainerSectionOpen] = useState(true);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await axios.get('/trainer/');
                const data = response.data;
                setTrainers(data);
            } catch (error) {
                console.error('Error fetching trainers:', error);
                alert('Failed to fetch trainers. Please try again later.');
            }
        };
        fetchTrainers();
    }, []);

    const handleDeleteTrainer = async (trainerId) => {
        try {
            const response = await axios.delete(`/api/trainers/${trainerId}`);

            if (response.status === 200 || response.status === 204) {
                setTrainers(trainers.filter((trainer) => trainer.id !== trainerId));
                alert('Trainer deleted successfully!');
            } else {
                alert('Failed to delete trainer.');
            }
        } catch (error) {
            console.error('Error deleting trainer:', error);
            alert('Error deleting trainer. Please try again.');
        }
    };

    const canDeleteTrainer = async (trainer) => {
        const blogResponse = await axios.get(`/blog/`);

        return !trainer.hasProgram && !trainer.hasBlog;
    };

    return (
        <div className={styles.adminPage}>
            <Navbar/>
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
                                    onClick={() => handleDeleteTrainer(trainer.id)}
                                    disabled={!canDeleteTrainer(trainer)}
                                >
                                    TÖRLÉS
                                </button>
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
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;