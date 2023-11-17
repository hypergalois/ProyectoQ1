import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, isAuthenticated, errors: loginErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/explore")
        }
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (data) => {
        // await signin(data)
        console.log(data)
        signin(data)
    })

    return (
        <div className="flex items-center justify-center my-32">
            <div className="bg-zinc-700 max-w-md w-full p-10 rounded-md ">
                {
                    loginErrors.map((error, i) => {
                        return (
                            <div key={i} className="bg-red-500 text-white text-sm p-3 rounded-md my-2">
                                <p>{error}</p>
                            </div>
                        )
                    })
                }
                <h1 className="text-white text-3xl font-extrabold my-2 text-center mb-6">Iniciar sesión</h1>
                <form onSubmit={onSubmit} className='mt-4 space-y-4'>
                    <input type="email" {
                        ...register("email", {
                            required: true,
                            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        })
                    } 
                        className="bg-zinc-500 appearance-none rounded-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-200 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-2"
                        placeholder='Email' />
                    {
                        errors.email && (
                            <p className="text-red-500 text-sm">Hace falta un correo electrónico</p>
                        )
                    }

                    <input type="password" {
                        ...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20
                        })
                    } 
                        // className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        className="bg-zinc-500 appearance-none rounded-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-200 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-2"
                        placeholder='Contraseña'/>
                    {
                        errors.password && (
                            <p className="text-red-500 text-sm">Hace falta una contraseña</p>
                        )
                    }

                    <button type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Login
                    </button>

                </form>

                <p className="text-white flex gap-x-2 justify-between mt-6">
                    ¿No tienes una cuenta? <Link to="/register" className="text-indigo-400 hover:text-indigo-300">Regístrate</Link>
                </p>

            </div>

        </div>
    )

}

export default LoginPage