import styles from './OpenedBlog.module.css';
import { useLocation, useNavigate } from "react-router";
import Navbar from "../../Navbar/Navbar";
import { Divider, Card, CardOverflow, AspectRatio, CardContent, Typography } from "@mui/joy";
import { useContext } from "react";
import BlogContext from "../../Context/Blog/BlogContext";

function OpenedBlog() {
    const location = useLocation();
    const navigate = useNavigate();
    const { blogs } = useContext(BlogContext);

    const blog = location.state?.blog || location.state?.moreBlog;
    const blogImages = location.state?.blogImages || {};

    if (!blog) {
        navigate("/blogs");
        return null;
    }

    const imageUrl = blogImages[blog.id] || ' ';

    return (
        <div className={styles.openedBlog}>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.blogTitle}>{blog.title}</h1>
                <div className={styles.blogText}>
                    <div className={styles.textContent}>{blog.headerText}</div>
                    <div className={styles.kep}>
                        <img
                            src={imageUrl}
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
                <h1 className={styles.moreBlogsTitle}>Hasonló blogok</h1>
                <div className={styles.blogGrid}>
                    {blogs.length > 0 ? (
                        blogs.map((moreBlog, index) => {
                            if (moreBlog.id !== blog.id && index < 3) {
                                const moreBlogImage = blogImages[moreBlog.id] || '';
                                return (
                                    <div key={index} className={styles.blog}>
                                        <Card variant="outlined" className={styles.card}>
                                            <CardOverflow onClick={() => navigate("/openedBlog", { state: { moreBlog, blogImages } })}>
                                                <AspectRatio ratio="16/9">
                                                    <img
                                                        src={moreBlogImage}
                                                        loading="lazy"
                                                        alt={moreBlog.title}

                                                    />
                                                </AspectRatio>
                                            </CardOverflow>
                                            <CardContent onClick={() => navigate("/openedBlog", { state: { moreBlog, blogImages } })}>
                                                <Typography className={styles.cardTitle}>
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
                        <p className={styles.noMoreBlogs}>Nincsenek további blogok</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OpenedBlog;