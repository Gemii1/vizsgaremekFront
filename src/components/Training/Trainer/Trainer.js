import styles from './Trainer.module.css';
import Grid from '@mui/joy/Grid';
import Divider, { dividerClasses } from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Trainer({ programs }) {
    const daysOfWeek = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];

    const formatDate = (dateString) => {
        const date = new Date(dateString.replace(' ', 'T'));
        const options = { weekday: 'long' };
        const dayName = new Intl.DateTimeFormat('hu-HU', options).format(date);
        return dayName.charAt(0).toUpperCase() + dayName.slice(1);
    };

    const groupedPrograms = programs.reduce((acc, program) => {
        const day = formatDate(program.startDate);
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(program);
        return acc;
    }, {});

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
                                                        {program.startDate} - {program.endDate}
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
                                <Button variant="contained"><AddIcon /></Button>
                                <Button variant="contained"><EditIcon /></Button>
                                <Button variant="contained"><DeleteIcon /></Button>
                            </div>
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
}

export default Trainer;
