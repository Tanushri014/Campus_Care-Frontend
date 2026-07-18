import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { forgotPassword } from "../../api/authApi";

import "./ForgotPassword.css";

function ForgotPassword() {

    const navigate = useNavigate();

    const [studentEmail, setStudentEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setLoading(true);

        try {

            await forgotPassword(studentEmail);

            navigate(
                "/verify-forgot-password-otp",
                {
                    state: {
                        studentEmail,
                    },
                }
            );

        }

        catch (err) {

            setError(
                err.response?.data?.message ||
                "This email is not registerd ,please register first ."
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="forgot-password-container">

            <div className="forgot-password-card">

                <h2>Forgot Password</h2>

                <p>
                    Enter your registered email address.
                    We'll send an OTP to reset your password.
                </p>

                <form onSubmit={handleSubmit}>

                    <label>Email Address</label>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={studentEmail}
                        onChange={(e) =>
                            setStudentEmail(e.target.value)
                        }
                        required
                    />

                    {error &&

                        <p className="error-message">
                            {error}
                        </p>

                    }

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Sending OTP..."
                                : "Send OTP"
                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default ForgotPassword;