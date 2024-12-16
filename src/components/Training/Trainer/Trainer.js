import styles from './Trainer.module.css';
import Grid from '@mui/joy/Grid';

function Trainer() {
    return (
        <Grid container spacing={2} sx={{flexGrow: 1}} className={styles.calendar}>
            <div>
                <h2>Hétfő</h2>
            </div>
            <div>
                <h2>Kedd</h2>
            </div>
            <div>
                <h2>Szerda</h2>
            </div>
            <div>
                <h2>Csütörtök</h2>
            </div>
            <div>
                <h2>Péntek</h2>
            </div>
        </Grid>
    )
}

export default Trainer;