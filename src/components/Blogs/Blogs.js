import Navbar from "../Navbar/Navbar";
import styles from "./Blogs.module.css";
import React, { useContext, useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardOverflow,
    Typography,
    AspectRatio,
    Divider,
    Grid
} from '@mui/joy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router";
import { Fab, Modal, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UserContext from "../Context/User/UserContext";
import BlogContext from "../Context/Blog/BlogContext";
import CreateBlog from "./CreateBlog/CreateBlog";
import EditBlog from "./EditBlog/EditBlog";
import axios from "axios";
import Confirmation from "../Confirmation";

function Blogs() {
    const navigate = useNavigate();
    const { userType } = useContext(UserContext);
    const { blogs, fetchBlogs } = useContext(BlogContext);
    const [createBlog, setCreateBlog] = useState(false);
    const [editBlog, setEditBlog] = useState(false);
    const [editedBlog, setEditedBlog] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [blogImages, setBlogImages] = useState({});
    const [isLoadingImages, setIsLoadingImages] = useState(true);
    const [snackBarError, setSnackBarError] = useState(false);

    const closeSnackBarError = () => setSnackBarError(false);
    const openSnackBarError = () => setSnackBarError(true);

    const openDeleteModal = (id) => {
        setDeleteModal(true);
        setDeletingId(id);
    };
    const closeDeleteModal = () => setDeleteModal(false);

    useEffect(() => {
        const loadBlogsAndImages = async () => {
            try {
                setIsLoadingImages(true);
                await fetchBlogs();
                await fetchBlogImages(blogs);
            } catch (e) {
                console.error("Error loading blogs or images:", e);
                openSnackBarError();
            } finally {
                setIsLoadingImages(false);
            }
        };
        loadBlogsAndImages();
    }, []);

    const fetchBlogImages = async (blogs) => {
        if (!blogs || blogs.length === 0) return;
        const imagePromises = blogs.map(async (blog) => {
            try {
                const response = await axios.get(`/blog/blog/picture/${blog.id}`, {
                    responseType: 'arraybuffer'
                });
                const byteArray = new Uint8Array(response.data);
                const blob = new Blob([byteArray], { type: 'image/jpeg' });
                const imageUrl = URL.createObjectURL(blob);
                return { id: blog.id, url: imageUrl };
            } catch (error) {
                console.error(`Failed to fetch image for blog ${blog.id}:`, error.response?.status || error.message);
                return { id: blog.id, url: null };
            }
        });

        const images = await Promise.all(imagePromises);
        const imageMap = images.reduce((acc, { id, url }) => {
            acc[id] = url;
            return acc;
        }, {});
        setBlogImages(imageMap);
    };

    const blogDelete = async (id) => {
        try {
            await axios.delete(`/blog/${id}`);
            await fetchBlogs();
            await fetchBlogImages(blogs);
        } catch (error) {
            console.error("Error deleting blog:", error);
            openSnackBarError();
        }
    };

    const isUserTypeTrainer = (userType, blog) => {
        if (userType==='TRAINER') {
            return (
                <div className={styles.trainerButtons}>
                    <EditIcon onClick={() => {
                        setEditBlog(true);
                        setEditedBlog(blog);
                    }} />
                    <DeleteIcon onClick={() => openDeleteModal(blog.id)} />
                </div>
            );
        }
        return null;
    };

    const handleCreateButton = (userType) => {
        if (userType==='TRAINER') {
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
            <meta name="viewport" content="width=720" />
            <Navbar />
            <div>
                <div className={styles.container}>
                    <div className={styles.blogContainer}>
                        <Grid container style={{ justifyContent: 'center' }} spacing={2} sx={{ flexGrow: 1 }}>
                            {blogs.length > 0 ? (
                                blogs.map((blog, index) => {
                                    const imageUrl = blogImages[blog.id] || '';
                                    return (
                                        <div key={index} className={styles.blog}>
                                            <Card variant="outlined" className={styles.card}>
                                                <CardOverflow onClick={() => navigate("/openedBlog", { state: {blog,blogImages}})}>
                                                    <AspectRatio ratio="1.6">
                                                        {isLoadingImages ? (
                                                            <Typography>Loading image...</Typography>
                                                        ) : (
                                                            <img
                                                                src={imageUrl}
                                                                alt={blog.title}
                                                            />
                                                        )}
                                                    </AspectRatio>
                                                </CardOverflow>
                                                <CardContent onClick={() => navigate("/openedBlog", { state: blog })}>
                                                    <Typography sx={{ fontWeight: 'xl', fontSize: '1.3rem' }}>
                                                        {blog.title}
                                                    </Typography>
                                                </CardContent>
                                                <CardOverflow variant="soft">
                                                    <Divider inset="context" />
                                                    <CardContent orientation="horizontal">
                                                        <Typography
                                                            textColor="text.secondary"
                                                            sx={{ fontWeight: 'md', fontSize: '1rem' }}
                                                        >
                                                            {handleBlogType(blog.blogType)}
                                                        </Typography>
                                                        <Divider orientation="vertical" />
                                                        <Typography
                                                            textColor="text.secondary"
                                                            sx={{ fontWeight: 'md' }}
                                                        >
                                                            {isUserTypeTrainer(userType, blog)}
                                                        </Typography>
                                                    </CardContent>
                                                </CardOverflow>
                                            </Card>
                                        </div>
                                    );
                                })
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
                    <Modal open={deleteModal} onClose={closeDeleteModal}>
                        <Confirmation close={closeDeleteModal} deleteFunction={blogDelete} deletingId={deletingId} />
                    </Modal>
                    <Snackbar
                        open={snackBarError}
                        autoHideDuration={6000}
                        onClose={closeSnackBarError}
                        message="Sikertelen próbálkozás!"
                        sx={{
                            '& .MuiSnackbarContent-root': {
                                backgroundColor: 'red',
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Blogs;