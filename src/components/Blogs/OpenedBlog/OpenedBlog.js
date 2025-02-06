import styles from './OpenedBlog.module.css';
import {useLocation, useNavigate} from "react-router";
import Navbar from "../../Navbar/Navbar";
import Divider from "@mui/joy/Divider";
import BlogContext from "../../Context/Blog/BlogContext";
import {useContext} from "react";
import Grid from "@mui/joy/Grid";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

function OpenedBlog(){

    const location = useLocation();
    const blog = location.state;
    const {blogs} = useContext(BlogContext);
    const navigate = useNavigate();

    return (
        <div>
            <Navbar/>
            <div className={styles.container}>
                <h1 className={styles.blogTitle}>{blog.title}</h1>
                <div className={styles.blogText}>
                    <div className={styles.textContent}>{blog.blogText}</div>
                    <div className={styles.kep}>
                        <img
                            src="https://www.helpinhearing.co.uk/wp-content/uploads/2019/01/image-placeholder-500x500.jpg"
                            alt=""/>
                    </div>
                </div>
                <div>Lorem ipsum odor amet, consectetuer adipiscing elit. Maecenas suscipit cursus rutrum malesuada sollicitudin nostra odio. Tortor montes dignissim sagittis feugiat morbi. Praesent vivamus mauris platea dignissim porta consectetur. Justo tellus suscipit cubilia dignissim eu vestibulum. Efficitur nulla est per per ullamcorper vel donec aptent. Maximus elit porttitor id nec; natoque imperdiet rutrum. Per primis quis interdum magna neque. Porta sed inceptos euismod ornare elementum vivamus. Tellus rutrum maximus viverra nec odio dolor euismod.

                    Maximus scelerisque dictum litora efficitur turpis potenti. Nec auctor luctus magna; in mauris aliquet mauris ante sit. Cursus rutrum pharetra neque parturient fermentum nisi nulla. Conubia luctus feugiat non montes auctor; ullamcorper consequat. At fusce fringilla fusce inceptos volutpat congue sodales. Enim elementum amet dis, pretium torquent mus dignissim. Magnis senectus risus neque nostra velit nam iaculis tristique tellus. Sed cubilia viverra amet; nibh non magnis quis lacus. Malesuada massa magna consectetur imperdiet fusce magnis.

                    Sociosqu sapien convallis velit; ultrices felis lorem pretium tempus. Potenti convallis pulvinar iaculis odio habitasse cras integer. Ultricies massa rhoncus metus molestie mi fringilla felis. Conubia purus cras volutpat in, dictum primis. Habitasse eleifend cursus efficitur ut finibus. Quis sem molestie velit accumsan varius rutrum in. Justo himenaeos nisi non habitasse scelerisque. Molestie ex laoreet commodo arcu leo. Euismod aenean interdum at interdum curae, volutpat mus ex.

                    Viverra taciti euismod dictum velit nibh aptent sapien ligula. Quisque conubia habitant porta cursus cras class fames. Massa fermentum nascetur sed aenean nec, consectetur taciti lectus. Vel feugiat dis laoreet habitant molestie ultricies duis. Bibendum parturient penatibus consequat purus proin vitae vehicula. Integer diam eget sit imperdiet, ad vehicula dapibus. Pharetra habitasse turpis tristique amet elementum.

                    Aptent pretium gravida tellus aliquet facilisis. Dis facilisis elit ipsum consectetur scelerisque. Nibh mus facilisi augue purus pharetra semper ultrices. Dignissim duis tempus ligula leo fusce praesent justo. Id tempor justo mauris in class vivamus metus tempus. Fusce mollis mattis senectus suscipit leo semper; nibh penatibus sociosqu. Cubilia taciti lobortis et mi interdum. Ultrices at magnis tortor scelerisque massa laoreet mus elit cursus. Vitae posuere litora fermentum diam proin potenti.
                </div>
            </div>
            <Divider/>
            <div>
                <h1>Hasonló blogok</h1>
                <Grid container style={{justifyContent: 'center'}} spacing={2} sx={{flexGrow: 1}}>
                    {blogs.length > 0 ? (
                        blogs.map((moreBlog, index) => {
                            if (moreBlog.title !== blog.title) {
                                return (
                                    <div key={index} className={styles.blog}>
                                        <Card variant="outlined" className={styles.card}>
                                            <CardOverflow onClick={() => {
                                                navigate("/openedBlog", {state: blog});
                                            }}>
                                                <AspectRatio ratio="2">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                                                        srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
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
                                            </CardContent>

                                        </Card>
                                    </div>
                                )
                            }
                        })
                    ) : (
                        <>
                        </>
                    )}
                </Grid>
            </div>
        </div>
    )
}

export default OpenedBlog;
