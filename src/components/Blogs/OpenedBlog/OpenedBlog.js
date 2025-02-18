import styles from './OpenedBlog.module.css';
import { useLocation, useNavigate } from "react-router";
import Navbar from "../../Navbar/Navbar";
import { Divider, Grid, Card, CardOverflow, AspectRatio, CardContent, Typography } from "@mui/joy";
import { useContext } from "react";
import BlogContext from "../../Context/Blog/BlogContext";

function OpenedBlog() {
    const location = useLocation();
    const blog = location.state;
    const { blogs } = useContext(BlogContext);
    const navigate = useNavigate();

    return (
        <div className={styles.test}>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.blogTitle}>{blog.title}</h1>
                <div className={styles.blogText}>
                    <div className={styles.textContent}>{blog.text}</div>
                    <div className={styles.kep}>
                        <img
                            src={blog.blogImage || "https://www.helpinhearing.co.uk/wp-content/uploads/2019/01/image-placeholder-500x500.jpg"}
                            alt="Blog Image"
                        />
                    </div>
                </div>
                <div>
                    {/* Placeholder text */}
                    Lorem ipsum odor amet, consectetuer adipiscing elit. Maecenas suscipit cursus rutrum malesuada sollicitudin nostra odio. Tortor montes dignissim sagittis feugiat morbi. Praesent vivamus mauris platea dignissim porta consectetur. Justo tellus suscipit cubilia dignissim eu vestibulum. Efficitur nulla est per per ullamcorper vel donec aptent. Maximus elit porttitor id nec; natoque imperdiet rutrum. Per primis quis interdum magna neque. Porta sed inceptos euismod ornare elementum vivamus. Tellus rutrum maximus viverra nec odio dolor euismod.

                    Maximus scelerisque dictum litora efficitur turpis potenti. Nec auctor luctus magna; in mauris aliquet mauris ante sit. Cursus rutrum pharetra neque parturient fermentum nisi nulla. Conubia luctus feugiat non montes auctor; ullamcorper consequat. At fusce fringilla fusce inceptos volutpat congue sodales. Enim elementum amet dis, pretium torquent mus dignissim. Magnis senectus risus neque nostra velit nam iaculis tristique tellus. Sed cubilia viverra amet; nibh non magnis quis lacus. Malesuada massa magna consectetur imperdiet fusce magnis.

                    {/* ... Additional placeholder text can be added here */}
                </div>
            </div>
            <Divider />
            <div className={styles.moreBlogs}>
                <h1>Hasonló blogok</h1>
                <Grid container style={{ justifyContent: 'center' }} spacing={2} sx={{ flexGrow: 1 }}>
                    {blogs.length > 0 ? (
                        blogs.map((moreBlog, index) => {
                            if (moreBlog.id !== blog.id) {
                                return (
                                    <div key={index} className={styles.blog}>
                                        <Card variant="outlined" className={styles.card}>
                                            <CardOverflow onClick={() => navigate("/openedBlog", { state: moreBlog })}>
                                                <AspectRatio ratio="1.7" className={styles.moreBlogImage}>
                                                    <img
                                                        src={moreBlog.image}
                                                        loading="lazy"
                                                        alt={moreBlog.title}
                                                    />
                                                </AspectRatio>
                                            </CardOverflow>
                                            <CardContent onClick={() => navigate("/openedBlog", { state: moreBlog })}>
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