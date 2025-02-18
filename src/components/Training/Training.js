import Navbar from "../Navbar/Navbar";
import { useContext, useEffect } from "react";
import styles from "./Training.module.css";
import Trainer from "./Trainer/Trainer";
import Client from "./Client/Client";
import UserContext from "../Context/User/UserContext";
import ProgramContext from "../Context/Program/ProgramContext";

function Training() {
    const { fetchPrograms } = useContext(ProgramContext);
    const { userType } = useContext(UserContext);

    useEffect(() => {
        fetchPrograms();
    }, [fetchPrograms]);

    const handleUser = () => {
        return userType ? <Trainer /> : <Client />;
    };

    return (
        <>
            <Navbar />
            <div className={styles.calendar}>
                {handleUser()}
            </div>
        </>
    );
}

export default Training;