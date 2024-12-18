import styles from './Trainer.module.css';
import Grid from '@mui/joy/Grid';

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
        <Grid container spacing={2} sx={{ flexGrow: 1 }} className={styles.calendar}>
            <div className={styles.days}>
                {daysOfWeek.map((day) => (
                    <div key={day}>
                        <div>
                            <h2>{day}</h2>
                            <div className={styles.programOnDay}>
                                {groupedPrograms[day] ? (
                                    groupedPrograms[day].map((program, index) => (
                                        <div key={index}>{program.trainingType}</div>
                                    ))
                                ) : (
                                    <div>Nincs program</div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Grid>
    );
}

export default Trainer;
