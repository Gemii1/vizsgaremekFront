import Navbar from "../Navbar/Navbar";
import styles from "./Blogs.module.css";
import {useState} from "react";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Divider from '@mui/joy/Divider';

function Blogs(){


    //False == Cliens, True == Edző
    const [userType, setUserType]=useState(true);


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


    return (
        <>
            <Navbar/>
            <div className={styles.blogs}>
                <div className={styles.container}>

                    {blogs.map((blog)=>{
                        return (
                            <Card variant="outlined" sx={{width: 320}}>
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
                                    <Typography level="title-md">{blog.title}</Typography>
                                    <Typography level="body-sm">{blog.writer}</Typography>
                                </CardContent>
                                <CardOverflow variant="soft" sx={{bgcolor: 'background.level1'}}>
                                    <Divider inset="context"/>
                                    <CardContent orientation="horizontal">
                                        <Typography
                                            level="body-xs"
                                            textColor="text.secondary"
                                            sx={{fontWeight: 'md'}}
                                        >
                                            {blog.blogType}
                                        </Typography>
                                        <Divider orientation="vertical"/>
                                        <Typography
                                            level="body-xs"
                                            textColor="text.secondary"
                                            sx={{fontWeight: 'md'}}
                                        >

                                        </Typography>
                                    </CardContent>
                                </CardOverflow>
                            </Card>
                        )
                    })}

                </div>
            </div>
        </>
    )
}

export default Blogs;