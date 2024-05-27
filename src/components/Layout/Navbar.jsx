import {Link} from "react-router-dom"
import {Container, Button} from "@chakra-ui/react";
import SearchBar from "./NavbarComponents/SearchBar.jsx"
import {auth} from "../../config/firebase.js"
import {signOut} from "firebase/auth"

function Navbar() {

    const logout = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.error(err)
        }
    }

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
                    {!auth.currentUser && (
                        <>
                            <li>
                                <Link to="/login" className="p-4 bg-white font-mono text-black rounded-2xl font-bold text-nowrap">Log In</Link>
                            </li>
                            <li>
                                <Link to="/register" className="p-4 bg-emerald-600 font-mono text-white rounded-2xl font-bold text-nowrap">Register</Link>
                            </li>
                        </>
                    ) }
                    {auth.currentUser && (
                        <li>
                            <Button onClick={logout}>Log Out</Button>
                        </li>
                    )}
                </ul>
            </div>
            </Container>
        </nav>
    )
}

export default Navbar