import styles from './OpenedBlog.module.css';
import {useLocation} from "react-router";
import Navbar from "../../Navbar/Navbar";

function OpenedBlog(){

    const location = useLocation();
    const blog = location.state;

    return (
        <div>
            <Navbar/>
            <div className={styles.container}>
                <h1 className={styles.blogTitle}>{blog.title}</h1>
                <div className={styles.blogText}>
                    <div>{blog.blogText}</div>
                    <div className={styles.clearfix}>
                        <img
                            src="https://www.helpinhearing.co.uk/wp-content/uploads/2019/01/image-placeholder-500x500.jpg"
                            alt=""/>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default OpenedBlog;