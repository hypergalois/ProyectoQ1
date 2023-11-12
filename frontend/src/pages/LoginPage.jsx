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
        await signin(data)
    })

    return (
        <div>
            <div>
                {
                    loginErrors.map((error, i) => {
                        return (
                            <div key={i}>
                                <p>{error}</p>
                            </div>
                        )
                    })
                }
                <h1>Login</h1>
                <form onSubmit={onSubmit}>
                    <input type="email" {
                        ...register("email", {
                            required: true,
                            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        })
                    } 
                        placeholder='email' />
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
                        placeholder='Password'/>
                    {
                        errors.password && (
                            <p>Password is required</p>
                        )
                    }

                    <button type="submit">Login</button>

                </form>

                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>

            </div>

        </div>
    )

}

export default LoginPage