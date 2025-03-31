import styles from './OpenedBlog.module.css';
import { useLocation, useNavigate } from "react-router";
import Navbar from "../../Navbar/Navbar";
import { Divider, Grid, Card, CardOverflow, AspectRatio, CardContent, Typography } from "@mui/joy";
import { useContext } from "react";
import BlogContext from "../../Context/Blog/BlogContext";

function OpenedBlog() {
    const location = useLocation();
    const blogImages = location.state.blogImages;
    const { blogs } = useContext(BlogContext);
    const navigate = useNavigate();
    const blog = location.state?.blog || location.state?.moreBlog;

    const imageUrl = blogImages[blog.id] || '';


    return (
        <div className={styles.test}>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.blogTitle}>{blog.title}</h1>
                <div className={styles.blogText}>
                    <div className={styles.textContent}>{blog.headerText}</div>
                    <div className={styles.kep}>
                        <img
                            src={imageUrl || "https://www.helpinhearing.co.uk/wp-content/uploads/2019/01/image-placeholder-500x500.jpg"}
                            alt="Blog Image"
                        />
                    </div>
                </div>
                <div className={styles.blogText}>
                    {blog.mainText}
                </div>
            </div>
            <Divider />
            <div className={styles.moreBlogs}>
                <h1>Hasonló blogok</h1>
                <Grid container style={{ justifyContent: 'center' }} spacing={2} sx={{ flexGrow: 1 }}>
                    {blogs.length > 0 ? (
                        blogs.map((moreBlog, index) => {
                            if (moreBlog.id !== blog.id && index<3) {
                                return (
                                    <div key={index} className={styles.blog}>
                                        <Card variant="outlined" className={styles.card}>
                                            <CardOverflow onClick={() => navigate("/openedBlog", { state: {moreBlog}})}>
                                                <AspectRatio ratio="1.7" className={styles.moreBlogImage}>
                                                    <img
                                                        src={moreBlog.image}
                                                        loading="lazy"
                                                        alt={moreBlog.title}
                                                    />
                                                </AspectRatio>
                                            </CardOverflow>
                                            <CardContent onClick={() => navigate("/openedBlog", { state: {moreBlog} })}>
                                                <Typography level="title-xl" sx={{ fontWeight: 'xl', fontSize: '1.3rem' }}>
                                                    {moreBlog.title}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </div>
                                );
                            }
                            return null;
                        })
                    ) : (
                        <p>Nincsenek további blogok</p>
                    )}
                </Grid>
            </div>
        </div>
    );
}

export default OpenedBlog;