import {Link} from "react-router-dom"

function Navbar() {
    return (
        <nav className="bg-emerald-900">
            <div className="flex justify-between py-3.5 items-center mx-auto px-5">
                <Link to="/" className="text-4xl font-bold text-white font-mono">
                    Collection
                </Link>
                <ul className="flex list-none gap-5">
                    <li>
                        <Link to="/login" className="p-4 bg-white text-black rounded-2xl font-bold">Login</Link>
                    </li>
                    <li>
                        <Link to="/register" className="p-4 bg-emerald-600 text-white rounded-2xl font-bold">Register</Link>
                    </li>
                </ul>
            </div>

        </nav>
    )
}

export default Navbar