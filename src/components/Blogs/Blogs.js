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
import {type} from "@testing-library/user-event/dist/type";

function Blogs(){


    const navigate = useNavigate();
    const {userType,isUserLoggedIn} = useContext(UserContext)
    const [createBlog, setCreateBlog] = useState(false);
    const closeCreateBlog = () => {
        setCreateBlog(false);
    }
    const openCreateBlog = () => {
        setCreateBlog(true);
    }

    const {blogs,fetchBlogs} = useContext(BlogContext);
    useEffect(()=>{
        fetchBlogs()
        console.log(blogs)
    },[]);







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
                    <Fab size="small" color="info" aria-label="add" onClick={() => openCreateBlog()} >
                        <AddIcon />
                    </Fab>
                </div>
            )
        }
    }

    const handleBlogType= (blogType)=>{
        if(blogType==="TRAINING") {
            return "Edzés"
        }else if(blogType === "DIET"){
            return "Étrend"
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
                                                            {handleBlogType(blog.blogType)}
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
                    <div className={styles.createModal}>
                        <Modal open={createBlog} onClose={closeCreateBlog}>
                            <div>
                                <CreateBlog close={closeCreateBlog}/>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blogs;