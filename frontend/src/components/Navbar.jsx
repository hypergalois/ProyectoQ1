import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {

    const { isAuthenticated, user, logout } = useAuth();

    return (
        <nav>
            <Link to={
                isAuthenticated ? "/recipes" : "/"
            }>
                <h1>Recipe App</h1>
            </Link>

            <ul>
                {isAuthenticated ? (
                    <>
                        <li>
                            Welcome {user.username}
                        </li>
                        <li>
                            <Link to="/add-recipes">Add Recipe</Link>
                        </li>
                        <li>
                            <Link to="/recipes">Recipes</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/" onClick={() => {
                                logout();
                            }}>Logout</Link>
                        </li>
                    </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    )}
            </ul>
        </nav>
    )
}

export default Navbar;