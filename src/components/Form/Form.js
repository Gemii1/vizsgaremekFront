import Input from '@mui/joy/Input';
import styles from './Form.module.css';


function Form({userType}){

    function handleUserType(){
        if (userType){
            return (
                <>
                    <div className={styles.form}>
                        <Input placeholder="Teljes Név"/>
                        <Input type='email' placeholder="Emailcím"/>
                        <Input type='tel' placeholder="Telefonszám"/>
                        <Input type='date' placeholder="Születési év"/>
                        {/*Gender input comes here*/}

                        <Input type='password' placeholder="Jelszó"/>
                        <div><a href=" ">Már edző vagyok..</a></div>
                    </div>
                </>
            );
        } else if (!userType) {
            return (
                <>
                    <div className={styles.form}>
                        <Input placeholder="Teljes Név"/>
                        <Input type='email' placeholder="Emailcím"/>
                        <Input type='tel' placeholder="Telefonszám"/>
                        <Input type='date' placeholder="Születési év"/>
                        {/*Gender input comes here*/}
                        <Input type='password' placeholder="Jelszó"/>
                        <div><a href=" ">Már kliens vagyok..</a></div>
                    </div>
                </>
            );
        }
    }

    return (
        <>
            {handleUserType()}
        </>
    )

}

export default Form;