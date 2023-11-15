import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NavbarLink from './NavbarLink';

function Navbar() {

    const { isAuthenticated, user, logout } = useAuth();

    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <NavbarLink to={
                isAuthenticated ? "/recipes" : "/"
            }>
                <h1 className="text-2xl font-bold">TapaTertulia</h1>
            </NavbarLink>

            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                    <>
                        <li>
                            Welcome {user.username}
                        </li>
                        <li>
                            <NavbarLink to="/add-recipes">Add Recipe</NavbarLink>
                        </li>
                        <li>
                            <NavbarLink to="/recipes">Recipes</NavbarLink>
                        </li>
                        <li>
                            <NavbarLink to="/profile">Profile</NavbarLink>
                        </li>
                        <li>
                            <NavbarLink to="/" onClick={() => {
                                logout();
                            }}>Logout</NavbarLink>
                        </li>
                    </>
                    ) : (
                        <>
                            <li>
                                <NavbarLink to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">Login</NavbarLink>
                            </li>
                            <li>
                                <NavbarLink to="/register" className="bg-indigo-500 px-4 py-1 rounded-sm">Register</NavbarLink>
                            </li>
                        </>
                    )}
            </ul>
        </nav>
    )
}

export default Navbar;