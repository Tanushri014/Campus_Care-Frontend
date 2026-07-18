import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyOtp, resendOtp } from "../../api/authApi";
import "./VerifyOtp.css";

function VerifyOtp() {

    const navigate = useNavigate();
    const location = useLocation();

    const studentEmail = location.state?.studentEmail || "";

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(120);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        if (timeLeft === 0) return;

        const timer = setTimeout(() => {

            setTimeLeft((prev) => prev - 1);

        }, 1000);

        return () => clearTimeout(timer);

    }, [timeLeft]);

    const handleOtpChange = (e, index) => {

        const value = e.target.value;

        if (!/^[0-9]?$/.test(value)) return;

        setError("");

        const updatedOtp = [...otp];
        updatedOtp[index] = value;

        setOtp(updatedOtp);

        if (value && index < 5) {

            document.getElementById(`otp-${index + 1}`).focus();

        }

    };

    const handleVerifyOtp = async () => {

        const enteredOtp = otp.join("");

        if (enteredOtp.length !== 6) {

            setError("Please enter the complete OTP.");
            return;

        }

        setLoading(true);
        setError("");

        try {

            await verifyOtp({

                studentEmail,
                otp: enteredOtp

            });

            navigate("/verify-college", {

                state: {
                    studentEmail
                }

            });

        } catch (err) {

            setError(

                err.response?.data?.message ||
                "Invalid OTP."

            );

        } finally {

            setLoading(false);

        }

    };

    const handleResendOtp = async () => {

        if (timeLeft > 0) return;

        setLoading(true);
        setError("");

        try {

            await resendOtp({

                studentEmail

            });

            alert("A new OTP has been sent to your email.");

            setOtp(["", "", "", "", "", ""]);
            setTimeLeft(120);

        } catch (err) {

            setError(

                err.response?.data?.message ||
                "Unable to resend OTP."

            );

        } finally {

            setLoading(false);

        }

    };

    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");

    return (

        <div className="otp-page">

            <div className="otp-card">

                <div className="otp-header">

                    <h1>
                        CampusCare
                    </h1>

                    <h2>
                        Verify Your Email
                    </h2>

                    <p>
                        Enter the 6-digit verification code sent to
                        <br />
                        <strong>{studentEmail}</strong>
                    </p>

                </div>

                <div className="otp-inputs">

                    {otp.map((digit, index) => (

                        <input

                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleOtpChange(e, index)}

                        />

                    ))}

                </div>

                {error && (

                    <p className="error-message">

                        {error}

                    </p>

                )}

                <button

                    className="verify-btn"
                    onClick={handleVerifyOtp}
                    disabled={loading}

                >

                    {loading ? "Verifying..." : "Verify OTP"}

                </button>

                <p className="resend-text">

                    Didn't receive the code?

                </p>

                <button

                    className="resend-btn"
                    onClick={handleResendOtp}
                    disabled={loading || timeLeft > 0}

                >

                    {loading
                        ? "Sending..."
                        : timeLeft > 0
                            ? `Resend in ${minutes}:${seconds}`
                            : "Resend OTP"}

                </button>

                <p className="back-login">

                    <Link to="/login">

                        Back to Login

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default VerifyOtp;