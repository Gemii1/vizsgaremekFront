import Navbar from "../Navbar/Navbar";
import styles from "./Blogs.module.css";
import { useContext, useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardOverflow,
    Typography,
    AspectRatio,
    Divider,
    Grid
} from '@mui/joy';
import  EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router";
import { Fab, Modal } from "@mui/material";
import  AddIcon  from "@mui/icons-material/Add";
import UserContext from "../Context/User/UserContext";
import BlogContext from "../Context/Blog/BlogContext";
import CreateBlog from "./CreateBlog/CreateBlog";
import EditBlog from "./EditBlog/EditBlog";
import axios from "axios";

function Blogs() {
    const navigate = useNavigate();
    const { userType } = useContext(UserContext);
    const [createBlog, setCreateBlog] = useState(false);
    const [editBlog, setEditBlog] = useState(false);
    const [editedBlog, setEditedBlog] = useState(null);

    const { blogs, fetchBlogs } = useContext(BlogContext);

    useEffect(() => {
        fetchBlogs();
        console.log(blogs);
    }, []);

    const blogDelete = async (id) => {
        try {
            await axios.delete(`/blog/${id}`);
            await fetchBlogs();
        } catch (error) {
            console.error('Error deleting Blog:', error);
        }
    };

    const isUserTypeTrainer = (userType, blog) => {
        if (userType) {
            return (
                <div className={styles.trainerButtons}>
                    <EditIcon onClick={() => {
                        setEditBlog(true);
                        setEditedBlog(blog);
                    }} />
                    <DeleteIcon onClick={() => blogDelete(blog.id)} />
                </div>
            );
        }
        return null;
    };

    const handleCreateButton = (userType) => {
        if (userType) {
            return (
                <div className={styles.buttons}>
                    <Fab size="small" color="info" aria-label="add" onClick={() => setCreateBlog(true)}>
                        <AddIcon />
                    </Fab>
                </div>
            );
        }
    };

    const handleBlogType = (blogType) => {
        return blogType === "TRAINING" ? "Edzés" : "Étrend";
    };

    return (
        <div className={styles.blogs}>
            <Navbar />
            <div>
                <div className={styles.container}>
                    <div className={styles.blogContainer}>
                        <Grid container style={{ justifyContent: 'center' }} spacing={2} sx={{ flexGrow: 1 }}>
                            {blogs.length > 0 ? (
                                blogs.map((blog, index) => (
                                    <div key={index} className={styles.blog}>
                                        <Card variant="outlined" className={styles.card}>
                                            <CardOverflow onClick={() => navigate("/openedBlog", { state: blog })}>
                                                {console.log(blog)}
                                                <AspectRatio ratio="1.6">
                                                    <img
                                                        src={blog.image}
                                                        loading="lazy"
                                                        alt=""
                                                    />
                                                </AspectRatio>
                                            </CardOverflow>
                                            <CardContent onClick={() => navigate("/openedBlog", { state: blog })}>
                                                <Typography level="title-xl" sx={{ fontWeight: 'xl', fontSize: '1.3rem' }}>
                                                    {blog.title}
                                                </Typography>
                                                <Typography level="body-sm">{blog.writer}</Typography>
                                            </CardContent>
                                            <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
                                                <Divider inset="context" />
                                                <CardContent orientation="horizontal">
                                                    <Typography
                                                        level="body-xs"
                                                        textColor="text.secondary"
                                                        sx={{ fontWeight: 'md', fontSize: '1rem' }}
                                                    >
                                                        {handleBlogType(blog.blogType)}
                                                    </Typography>
                                                    <Divider orientation="vertical" />
                                                    <Typography
                                                        level="body-xs"
                                                        textColor="text.secondary"
                                                        sx={{ fontWeight: 'md' }}
                                                    >
                                                        {isUserTypeTrainer(userType, blog)}
                                                    </Typography>
                                                </CardContent>
                                            </CardOverflow>
                                        </Card>
                                    </div>
                                ))
                            ) : (
                                <h1 className={styles.blogError}>Jelenleg egy blog sem elérhető</h1>
                            )}
                        </Grid>
                        {handleCreateButton(userType)}
                    </div>
                    <Modal open={createBlog} onClose={() => setCreateBlog(false)}>
                        <CreateBlog close={() => setCreateBlog(false)} />
                    </Modal>
                    <Modal open={editBlog} onClose={() => setEditBlog(false)}>
                        <EditBlog close={() => setEditBlog(false)} blog={editedBlog} />
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Blogs;