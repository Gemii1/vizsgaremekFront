import styles from './LandingPage.module.css'
import Navbar from '../Navbar/Navbar'

function LandingPage(){

    return(
        <>
        <div>
           
            <div>
                <Navbar/>   
            </div>
            <div className={styles.banner}>
            </div>
        </div>

        </>
    )
}

export default LandingPage;