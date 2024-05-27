import {Link} from "react-router-dom"
import {Container} from "@chakra-ui/react";
import SearchBar from "./NavbarComponents/SearchBar.jsx"

function Navbar() {
    return (
        <nav className="bg-emerald-900">
            <Container maxW="full">
            <div className="flex justify-between py-3.5 items-center mx-auto px-5">
                <Link to="/" className="md:text-4xl font-bold text-white font-mono">
                    Collection
                </Link>

                <ul className="flex list-none gap-5 items-center">
                    <li>
                        <SearchBar/>
                    </li>
                    <li>
                        <Link to="/login" className="p-4 bg-white font-mono text-black rounded-2xl font-bold">Login</Link>
                    </li>
                    <li>
                        <Link to="/register" className="p-4 bg-emerald-600 font-mono text-white rounded-2xl font-bold">Register</Link>
                    </li>
                </ul>
            </div>
            </Container>
        </nav>
    )
}

export default Navbar