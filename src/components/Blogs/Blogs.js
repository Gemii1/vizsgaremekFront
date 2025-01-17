import Navbar from "../Navbar/Navbar";
import styles from "./Blogs.module.css";
import {useContext, useState} from "react";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Divider from '@mui/joy/Divider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/joy/Grid';
import UserContext from "../Context/UserContext";

function Blogs(){



    const {userType,isUserLoggedIn} = useContext(UserContext)

    const [blogs, setBlogs]=useState([
        {
        title: 'EdzésTervteszt',
        blogType: 'Training',
        blogWriter: 'rawr',
        blogText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
            ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

        },{
            title: 'Kajateszt',
            blogType: 'food',
            blogWriter: 'raw2',
            blogText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
                ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
                'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        }

        ]);

    function isUserTypeTrainer(userType){
        if (userType){
            return(
                <>
                    <div className={styles.trainerButtons}>
                        <EditIcon/>
                        <DeleteIcon/>
                    </div>
                </>
            )
        }
    }


    return (
        <div className={styles.blogs}>
            <Navbar/>
            <div >
                <div className={styles.container}>
                    <div className={styles.blogContainer}>
                        <Grid container style={{justifyContent:'center'}} spacing={2} sx={{flexGrow: 1}}>
                            {blogs.length>0?(
                                blogs.map((blog) => {
                                    return (
                                        <div className={styles.blog}>
                                            <Card variant="outlined"  className={styles.card}>
                                                <CardOverflow>
                                                    <AspectRatio ratio="2">
                                                        <img
                                                            src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                                                            srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                                                            loading="lazy"
                                                            alt=""
                                                        />
                                                    </AspectRatio>
                                                </CardOverflow>
                                                <CardContent>
                                                    <Typography level="title-xl" sx={{fontWeight:'xl',fontSize:'1.3rem'}}>{blog.title}</Typography>
                                                    <Typography level="body-sm">{blog.writer}</Typography>
                                                </CardContent>
                                                <CardOverflow variant="soft" sx={{bgcolor: 'background.level1'}}>
                                                    <Divider inset="context"/>
                                                    <CardContent orientation="horizontal">
                                                        <Typography
                                                            level="body-xs"
                                                            textColor="text.secondary"
                                                            sx={{fontWeight: 'md',fontSize: '1rem'}}
                                                        >
                                                            {blog.blogType}
                                                        </Typography>
                                                        <Divider orientation="vertical"/>
                                                        <Typography
                                                            level="body-xs"
                                                            textColor="text.secondary"
                                                            sx={{fontWeight: 'md'}}
                                                        >
                                                            {isUserTypeTrainer(userType)}
                                                        </Typography>
                                                    </CardContent>
                                                </CardOverflow>
                                            </Card>
                                        </div>

                                    )
                                })
                            ) : (
                                <>
                                    <h1 className={styles.blogError}>Jelenleg egy blog sem elérhető</h1>
                                </>
                            )}
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blogs;