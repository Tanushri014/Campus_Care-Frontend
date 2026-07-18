import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerStudent } from "../../api/authApi";

import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        firstName: "",

        lastName: "",

        studentEmail: "",

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

    const handleRegister = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            await registerStudent(formData);

            navigate("/verify-otp", {

                state: {

                    studentEmail: formData.studentEmail

                }

            });

        }

        catch (err) {

            setError(

                

                "Registration failed.This Email already has a account please log in to continue"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="register-page">

            <div className="register-card">

                <div className="register-header">

                    <h1>CampusCare</h1>

                    <h2>Create Your Account</h2>

                    <p>

                        Join CampusCare to report complaints,
                        receive announcements and stay connected
                        with your campus.

                    </p>

                </div>

               <button
    type="button"
    className="google-btn"
    onClick={() => {
        window.location.href =
            `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/google`;
    }}
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
                    className="register-form"
                    onSubmit={handleRegister}
                >

                    <div className="name-row">

                        <div className="input-group">

                            <label>

                                First Name

                            </label>

                            <input

                                type="text"

                                name="firstName"

                                value={formData.firstName}

                                onChange={handleChange}

                                placeholder="Enter first name"

                                required

                            />

                        </div>

                        <div className="input-group">

                            <label>

                                Last Name

                            </label>

                            <input

                                type="text"

                                name="lastName"

                                value={formData.lastName}

                                onChange={handleChange}

                                placeholder="Enter last name"

                                required

                            />

                        </div>

                    </div>

                    <div className="input-group">

                        <label>

                            Email Address

                        </label>

                        <input

                            type="email"

                            name="studentEmail"

                            value={formData.studentEmail}

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

                            placeholder="Create a password"

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

                    <button
                        type="submit"
                        className="register-btn"
                        disabled={loading}
                    >

                        {

                            loading

                                ? "Creating Account..."

                                : "Create Account"

                        }

                    </button>

                </form>

                <p className="login-text">

                    Already have an account?

                    <Link to="/login">

                        {" "}Log In

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;