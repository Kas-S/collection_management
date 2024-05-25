import Navbar from "./Navbar.jsx"
import Footer from "./Footer.jsx";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout