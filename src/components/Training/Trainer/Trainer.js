import styles from './Trainer.module.css';
import Grid from '@mui/joy/Grid';
import Divider, { dividerClasses } from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "@mui/material/Modal";
import {useContext, useState} from "react";
import CreateTraining from "./CreateTraining/CreatTraining";
import EditTraining from "./EditTraining/EditTraining";
import ProgramContext from "../../Context/Program/ProgramContext";
import axios from "axios";

function Trainer() {
    const daysOfWeek = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];
    const [createModal,setCreateModal] = useState(false);
    const [editModal,setEditModal] = useState(false);
    const {programs,fetchPrograms} = useContext(ProgramContext);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long' };
        const dayName = new Intl.DateTimeFormat('hu-HU', options).format(date);
        return dayName.charAt(0).toUpperCase() + dayName.slice(1);
    };

    const groupedPrograms = programs.reduce((acc, program) => {
        const day = formatDate(program.startTime);
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(program);
        return acc;
    }, {});

    const getProgramTime = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const openCreateModal=()=>{
        setCreateModal(true);
    }
    const closeCreateModal=()=>{
        setCreateModal(false);
    }
    const openEditModal=()=>{
        setEditModal(true);
    }
    const closeEditModal=()=>{
        setEditModal(false);
    }
    const [openedProgram, setOpenedProgram] = useState([]);

    const deleteProgram = async (id) => {
        try {
            await axios.delete(`/program/${id}`);
            await fetchPrograms();
        } catch (error) {
            console.error('Error deleting Programs:', error);
        }
    };

    return (
        <div className={styles.calendar}>
            <Grid container rowSpacing ={1} spacing={2} columns={{ xs: 2, sm: 2, md: 12 }} >
                    {daysOfWeek.map((day) => (
                        <Grid item xs={2.4} key={day} className={styles.days}>
                            <div className={styles.program}>
                                <h2>{day}</h2>
                                <Divider color='black' />
                                <div className={styles.programOnDay}>
                                    <p>Foglalt időpontok:</p>
                                    {groupedPrograms[day] ?
                                        ( groupedPrograms[day].map((program, index) => (
                                                <>
                                                    <Divider />
                                                    <div key={index} className={styles.dates}>
                                                        <div>
                                                            {getProgramTime(program.startTime)} - {getProgramTime(program.endTime)}
                                                        </div>
                                                        <div style={styles.programIcons}>
                                                            <EditIcon onClick={()=>{
                                                                setOpenedProgram(program)
                                                                openEditModal()
                                                                console.log(openedProgram)
                                                            }}/>
                                                            <DeleteIcon onClick={()=>{
                                                                deleteProgram(program.id)
                                                            }} />
                                                        </div>
                                                    </div>
                                                </>
                                            ))
                                        ) : (
                                            <>
                                                <Divider />
                                                <div className={styles.dates}>Nincs program</div>
                                            </>
                                        )}
                                </div>
                            </div>
                            <div className={styles.buttons}>
                                <Button variant="contained" onClick={openCreateModal}><AddIcon/></Button>
                            </div>
                        </Grid>

                    ))}
            </Grid>
            <Modal open={createModal} onClose={closeCreateModal}>
                <CreateTraining/>
            </Modal>
            <Modal open={editModal} onClose={closeEditModal} >
                <EditTraining program={openedProgram}/>
            </Modal>
        </div>
    );
}

export default Trainer;
