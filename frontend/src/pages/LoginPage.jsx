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
            navigate("/recipes")
        }
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (data) => {
        // await signin(data)
        console.log(data)
        signin(data)
    })

    return (
        <div className="flex items-center justify-center h-[calc(100vh-100px)]">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                {
                    loginErrors.map((error, i) => {
                        return (
                            <div key={i} className="bg-red-500 text-white text-sm p-2 rounded-md my-2">
                                <p>{error}</p>
                            </div>
                        )
                    })
                }
                <h1 className="text-2xl font-bold my-2">Login</h1>
                <form onSubmit={onSubmit}>
                    <input type="email" {
                        ...register("email", {
                            required: true,
                            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        })
                    }
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
                        placeholder='email' />
                    {
                        errors.email && (
                            <p className="text-red-500 text-sm">Email is required</p>
                        )
                    }

                    <input type="password" {
                        ...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20
                        })
                    } 
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Password'/>
                    {
                        errors.password && (
                            <p className="text-red-500 text-sm">Password is required</p>
                        )
                    }

                    <button type="submit"
                        className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'>
                        Login
                    </button>

                </form>

                <p className="flex gap-x-2 justify-between">
                    Don't have an account? <Link to="/register" className="text-sky-500">Register</Link>
                </p>

            </div>

        </div>
    )

}

export default LoginPage