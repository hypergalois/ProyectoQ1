import { useAuth } from '../context/AuthContext';
import NavbarLink from './NavbarLink';
import { Link } from 'react-router-dom';

function Navbar() {

    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="bg-zinc-700 shadow-lg my-3 flex items-center justify-between py-5 px-10 rounded-lg mx-4">

            <div className='flex items-center'>
                {/* Poner en absoluta o remota */}
                <img src="https://i.ibb.co/9pfWcQG/logo.png" alt="Logo" className='mr-6 h-20' />
                <Link to={
                    isAuthenticated ? "/explore" : "/"
                }>
                    <h1 className="text-3xl font-bold text-white">TapaTertulia</h1>
                </Link>
            </div>



            <ul className="flex gap-x-4">
                {isAuthenticated ? (
                    <>
                        <li>
                            <NavbarLink to="/recipes/add" className="font-bold">Añadir receta</NavbarLink>
                        </li>
                        <li>
                            <NavbarLink to="/explore" className="font-bold">Recetas</NavbarLink>
                        </li>
                        <li>
                            <NavbarLink to="/profile">Perfil</NavbarLink>
                        </li>
                        <li>
                            <NavbarLink to="/" onClick={() => {
                                console.log("Clicked logout button")
                                logout();
                            }} className="text-white bg-red-500 px-4 py-1 rounded-sm hover:bg-red-700 transition duration-300">Cerrar sesión</NavbarLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavbarLink to="/login" className="text-white bg-indigo-500 px-4 py-1 rounded-sm hover:bg-indigo-700 transition duration-300">Iniciar sesión</NavbarLink>
                        </li>
                        <li>
                            <NavbarLink to="/register" className="text-white bg-indigo-500 px-4 py-1 rounded-sm hover:bg-indigo-700 transition duration-300">Registrarse</NavbarLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar;