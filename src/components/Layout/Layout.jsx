import Navbar from "./Navbar.jsx"
import Footer from "./Footer.jsx";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <>
            <Navbar/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}

export default Layout