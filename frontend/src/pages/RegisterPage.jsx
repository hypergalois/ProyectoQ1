import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function RegisterPage() {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/recipes")
        }
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (data) => {
        await signup(data)
    })

    return (
        <div className='flex items-center justify-center h-[calc(100vh-100px)]'>
            <div className="bg-zinc-800 max-w-md p-10 rounded-md">
                {
                    registerErrors.map((error, i) => {
                        return (
                            <div key={i} className="bg-red-500 text-white text-sm p-2 rounded-md my-2">
                                <p>{error}</p>
                            </div>
                        )
                    })
                }
                <h1 className="text-2xl font-bold my-2">Register</h1>
                <form onSubmit={onSubmit}>
                    <input type="text" {
                        ...register("username", {
                            required: true,
                            minLength: 3,
                            maxLength: 20
                        })
                    }
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Username" />
                    {
                        errors.username && (
                            <p className="text-red-500 text-sm">Username is required</p>
                        )
                    }

                    <input type="email" {
                        ...register("email", {
                            required: true,
                            pattern: /^\S+@\S+$/i,
                        })
                    }
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Email' />
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
                        placeholder='Password' />
                    {
                        errors.password && (
                            <p className="text-red-500 text-sm">Password is required</p>
                        )
                    }

                    <button type="submit"
                        className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'>
                        Register
                    </button>

                </form>

                <p className='flex gap-x-2 justify-between'>
                    Already have an account? <Link to="/login" className='text-sky-500'>Login</Link>
                </p>

            </div>
        </div>
    )

}

export default RegisterPage