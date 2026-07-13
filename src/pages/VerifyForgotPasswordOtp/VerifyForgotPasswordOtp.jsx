import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { verifyForgotPasswordOtp } from "../../api/authApi";

import "./VerifyForgotPasswordOtp.css";

function VerifyForgotPasswordOtp() {

    const navigate = useNavigate();

    const location = useLocation();

    const studentEmail = location.state?.studentEmail;

    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            await verifyForgotPasswordOtp(
                studentEmail,
                otp
            );

            navigate(
                "/reset-password",
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
                "Invalid OTP."
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="verify-otp-container">

            <div className="verify-otp-card">

                <h2>Verify OTP</h2>

                <p>

                    Enter the OTP sent to

                    <br />

                    <strong>{studentEmail}</strong>

                </p>

                <form onSubmit={handleSubmit}>

                    <label>OTP</label>

                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) =>
                            setOtp(e.target.value)
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
                                ? "Verifying..."
                                : "Verify OTP"
                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default VerifyForgotPasswordOtp;