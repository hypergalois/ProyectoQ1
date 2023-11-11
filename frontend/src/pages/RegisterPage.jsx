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
        <div>
            <div>
                {
                    registerErrors.map((error, i) => {
                        return (
                            <div key={i}>
                                <p>{error}</p>
                            </div>
                        )
                    })
                }
                <h1>Register</h1>
                <form onSubmit={onSubmit}>
                    <input type="text" {
                        ...register("username", {
                            required: true,
                            minLength: 3,
                            maxLength: 20
                        })
                    }
                        placeholder="Username" />
                    {
                        errors.username && (
                            <p>Username is required</p>
                        )
                    }

                    <input type="email" {
                        ...register("email", {
                            required: true,
                            pattern: /^\S+@\S+$/i,
                        })
                    }
                        placeholder='Email' />
                    {
                        errors.email && (
                            <p>Email is required</p>
                        )
                    }

                    <input type="password" {
                        ...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20
                        })
                    }
                        placeholder='Password' />
                    {
                        errors.password && (
                            <p>Password is required</p>
                        )
                    }

                    <button type="submit">
                        Register
                    </button>

                </form>

                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>

            </div>
        </div>
    )

}