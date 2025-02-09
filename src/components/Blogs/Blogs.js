import Navbar from "../Navbar/Navbar";
import styles from "./Blogs.module.css";
import {useContext, useEffect, useState} from "react";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Divider from '@mui/joy/Divider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/joy/Grid';
import UserContext from "../Context/User/UserContext";
import {useNavigate} from "react-router";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import BlogContext from "../Context/Blog/BlogContext";
import Modal from "@mui/material/Modal";
import CreateBlog from "./CreateBlog/CreateBlog";

function Blogs(){


    const navigate = useNavigate();
    const {userType,isUserLoggedIn} = useContext(UserContext)

    const {blogs,setBlogs} = useContext(BlogContext);
    useEffect(()=>{
        setBlogs(blogsDummy);
        console.log(blogs)
    },[])

    const [blogsDummy, setBlogsDummy]=useState([
        {
        id:1,
        title: 'EdzésTervteszt',
        blogType: 'Training',
        blogWriter: 'rawr',
        blogText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
            ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
            ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
            ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
            ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
            ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        blogImage:'Images/edzesTervKep1.jpg'
        },{
            id:2,
            title: 'Kajateszt',
            blogType: 'food',
            blogWriter: 'raw2',
            blogText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
                ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
                'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            blogImage:'Images/edzesTervKep1.jpg'

        },
        {
            id:3,
            title: 'Kajateszt2',
            blogType: 'food',
            blogWriter: 'raw2',
            blogText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
                ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
                'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            blogImage:'Images/edzesTervKep1.jpg'

        },
        {
            id:4,
            title: 'EdzésTervteszt2',
            blogType: 'food',
            blogWriter: 'raw2',
            blogText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
                ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
                'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            blogImage:'Images/edzesTervKep1.jpg'

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

    const handleCreateButton = (userType)=>{
        if(userType) {
            return (
                <div className={styles.buttons}>
                    <Fab size="small" color="info" aria-label="add" >
                        <AddIcon />
                    </Fab>
                </div>
            )
        }
    }


    return (
        <div className={styles.blogs}>
            <Navbar/>
            <div>
                <div className={styles.container}>
                    <div className={styles.blogContainer}>
                        <Grid container style={{justifyContent: 'center'}} spacing={2} sx={{flexGrow: 1}}>
                            {blogs.length > 0 ? (
                                blogs.map((blog, index) => {
                                    return (
                                        <div key={index} className={styles.blog}>
                                            <Card variant="outlined" className={styles.card}>
                                                <CardOverflow onClick={() => {
                                                    navigate("/openedBlog", {state: blog});
                                                }}>
                                                    <AspectRatio ratio="1.6">
                                                        <img
                                                            src={blog.blogImage}
                                                            loading="lazy"
                                                            alt=""
                                                        />
                                                    </AspectRatio>
                                                </CardOverflow>
                                                <CardContent onClick={() => {
                                                    navigate("/openedBlog", {state: blog});
                                                }}>
                                                    <Typography level="title-xl" sx={{
                                                        fontWeight: 'xl',
                                                        fontSize: '1.3rem'
                                                    }}>{blog.title}</Typography>
                                                    <Typography level="body-sm">{blog.writer}</Typography>
                                                </CardContent>
                                                <CardOverflow variant="soft" sx={{bgcolor: 'background.level1'}}>
                                                    <Divider inset="context"/>
                                                    <CardContent orientation="horizontal">
                                                        <Typography
                                                            level="body-xs"
                                                            textColor="text.secondary"
                                                            sx={{fontWeight: 'md', fontSize: '1rem'}}
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
                        {handleCreateButton(userType)}
                    </div>
                    <div className={style.createModal}>
                        <Modal>
                            <div>
                                <CreateBlog/>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blogs;