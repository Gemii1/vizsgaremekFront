import styles from './Registration.module.css';
import Button from '@mui/material/Button';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

function Registration({close}) {
    return (
        <>
            <div className={styles.container}>
                <Tabs >
                    <TabList tabFlex="auto">
                        <Tab>Edzőként</Tab>
                        <Tab>Kliensként</Tab>
                    </TabList>
                    <TabPanel value={0}>
                        <b>First</b> tab panel
                    </TabPanel>
                    <TabPanel value={1}>
                        <b>Second</b> tab panel
                    </TabPanel>
                </Tabs>
                <Button className={styles.closeButton} variant="outlined" color="error" onClick={() => {
                    close()
                }}>Close</Button>
            </div>
        </>
    )

}


export default Registration;

/*
<h3>Válassz felhasználót</h3>
<div className={styles.userTypePicker}>
    Kliensként
    {<ArrowForwardIosIcon className={styles.arrow} fontSize='small'/>}
</div>
<div className={styles.userTypePicker}>
    Edzőként
    {<ArrowForwardIosIcon className={styles.arrow} fontSize='small'/>}
</div>

<div></div>

 */