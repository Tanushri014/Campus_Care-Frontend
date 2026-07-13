import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { adminLogin, studentLogin } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

function Login() {

    const navigate = useNavigate();
const { setUser } = useAuth();
    const [formData, setFormData] = useState({

        email: "",

        password: ""

    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value

        }));

    };

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        /* ===============================
           TRY ADMIN LOGIN
        =============================== */

       /* ===============================
   TRY ADMIN LOGIN
=============================== */

try {

    const response = await adminLogin({

        email: formData.email,

        password: formData.password

    });

   setUser({
    ...response.data,
    role: "ADMIN"
});
    

    if (response.data.category === "MAIN") {

        navigate("/main-admin/dashboard");

    }

    else {

        navigate("/admin/dashboard");

    }

    return;

}

catch {

    // Ignore and try student login

}

        /* ===============================
           TRY STUDENT LOGIN
        =============================== */

        try {

            const response = await studentLogin({

                studentEmail: formData.email,

                password: formData.password

            });

          setUser({
    ...response.data,
    role: "STUDENT"
});


            navigate("/student/dashboard");

        }

        catch (err) {

            setError(

                

                "Invalid email or password."

            );

        }

        finally {

            setLoading(false);

        }

    };
    const handleGoogleLogin = () => {

    window.location.href = "http://localhost:8080/oauth2/authorization/google";

};

    return (

        <div className="login-page">

            <div className="login-card">

                <div className="login-header">

                    <h1>CampusCare</h1>

                    <h2>Welcome Back</h2>

                    <p>

                        Sign in to access your complaints,

                        announcements and campus updates.

                    </p>

                </div>

             <button
    type="button"
    className="google-btn"
    onClick={handleGoogleLogin}
>

                    <img

                        src="https://www.svgrepo.com/show/475656/google-color.svg"

                        alt="Google"

                    />

                    Continue with Google

                </button>

                <div className="divider">

                    <span>OR</span>

                </div>

                <form

                    className="login-form"

                    onSubmit={handleLogin}

                >

                    <div className="input-group">

                        <label>

                            Email Address

                        </label>

                        <input

                            type="email"

                            name="email"

                            value={formData.email}

                            onChange={handleChange}

                            placeholder="Enter your email"

                            required

                        />

                    </div>

                    <div className="input-group">

                        <label>

                            Password

                        </label>

                        <input

                            type="password"

                            name="password"

                            value={formData.password}

                            onChange={handleChange}

                            placeholder="Enter your password"

                            required

                        />

                    </div>

                    {

                        error && (

                            <p className="error-message">

                                {error}

                            </p>

                        )

                    }

                  <p
    className="forgot-password-link"
    onClick={() => navigate("/forgot-password")}
>
    Forgot Password?
</p>

                    <button

                        className="login-btn"

                        type="submit"

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Logging In..."

                                : "Log In"

                        }

                    </button>

                </form>

                <p className="register-text">

                    Don't have an account?

                    <Link to="/register">

                        {" "}Create Account

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;