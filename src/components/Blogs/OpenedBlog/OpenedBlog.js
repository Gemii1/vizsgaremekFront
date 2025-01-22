import styles from './OpenedBlog.module.css';
import {useLocation} from "react-router";
import Navbar from "../../Navbar/Navbar";

function OpenedBlog(){

    const location = useLocation();
    const blog = location.state;

    return (
        <div>
            <Navbar/>
            {blog.title}
        </div>

    )
}

export default OpenedBlog;