import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (err) {
            // setErrors(err.response.data)
            if (Array.isArray(err.response.data)) {
                setErrors(err.response.data)
            } else {
                setErrors([err.response.data])
            }
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (err) {
            console.log(err)
            if (Array.isArray(err.response.data)) {
                setErrors(err.response.data)
            } else {
                setErrors([err.response.data])
            }
        }
    }

    const logout = async () => {
        try {
            await logoutRequest();
            setUser(null)
            setIsAuthenticated(false)
            Cookies.remove("token")
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()
            if (!cookies.token) {
                setIsAuthenticated(false)
                setLoading(false)
                return setUser(null)
            }

            try {
                const res = await verifyTokenRequest(cookies.token);

                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return setUser(null)
                }

                setUser(res.data)
                setIsAuthenticated(true)
                setLoading(false)
            } catch (error) {
                console.log(error)
                Cookies.remove("token")
                setIsAuthenticated(false)
                setLoading(false)
                return setUser(null)
            }
        }
        checkLogin()
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            signup,
            signin,
            logout,
            loading,
            errors,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}