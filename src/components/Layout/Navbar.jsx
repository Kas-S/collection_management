import {Link} from "react-router-dom"

function Navbar() {
    return (
        <nav className="bg-amber-100">
            <div className="flex justify-between py-3.5 items-center mx-auto px-5">
                <Link to="/" className="text-4xl font-bold text-slate-600">
                    Collection
                </Link>
                <ul className="flex list-none gap-5">
                    <li>
                        <Link to="/login" className="p-4 bg-blue-400 text-white rounded-2xl font-bold">Login</Link>
                    </li>
                    <li>
                        <Link to="/register" className="p-4 bg-emerald-400 text-white rounded-2xl font-bold">Register</Link>
                    </li>
                </ul>
            </div>

        </nav>
    )
}

export default Navbar