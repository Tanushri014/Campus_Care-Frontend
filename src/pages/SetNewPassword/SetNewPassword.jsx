import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { resetPassword } from "../../api/authApi";

import "./SetNewPassword.css";

function SetNewPassword() {

    const navigate = useNavigate();

    const location = useLocation();

    const studentEmail = location.state?.studentEmail;

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (newPassword !== confirmPassword) {

            setError("Passwords do not match.");

            return;
        }

        setLoading(true);

        try {

            await resetPassword(
                studentEmail,
                newPassword,
                confirmPassword
            );

            alert(
                "Password updated successfully. Please login."
            );

            navigate("/login");

        }

        catch (err) {

            setError(
                err.response?.data?.message ||
                "Something went wrong."
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="reset-password-container">

            <div className="reset-password-card">

                <h2>Set New Password</h2>

                <p>

                    Create a new password for your account.

                </p>

                <form onSubmit={handleSubmit}>

                    <label>New Password</label>

                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(e.target.value)
                        }
                        required
                    />

                    <label>Confirm Password</label>

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
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
                                ? "Updating..."
                                : "Update Password"
                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default SetNewPassword;