import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyOtp ,resendOtp} from "../../api/authApi";
import "./VerifyOtp.css";

function VerifyOtp() {

    const navigate = useNavigate();

    const location = useLocation();

    const studentEmail = location.state?.studentEmail || "";
const [timeLeft, setTimeLeft] = useState(120);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleOtpChange = (e, index) => {

        const value = e.target.value;

        if (!/^[0-9]?$/.test(value)) return;

        const updatedOtp = [...otp];

        updatedOtp[index] = value;

        setOtp(updatedOtp);

        if (value && index < 5) {

            document.getElementById(`otp-${index + 1}`).focus();

        }

    };
useEffect(() => {

    if (timeLeft <= 0) return;

    const timer = setInterval(() => {

        setTimeLeft(prev => prev - 1);

    }, 1000);

    return () => clearInterval(timer);

}, [timeLeft]);
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

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "OTP verification failed."

            );

        }

        finally {

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

        alert("OTP has been sent successfully.");

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

                    {

                        otp.map((digit, index) => (

                            <input

                                key={index}

                                id={`otp-${index}`}

                                type="text"

                                maxLength="1"

                                value={digit}

                                onChange={(e) =>

                                    handleOtpChange(e, index)

                                }

                            />

                        ))

                    }

                </div>

                {

                    error &&

                    <p className="error-message">

                        {error}

                    </p>

                }

                <button

                    className="verify-btn"

                    onClick={handleVerifyOtp}

                    disabled={loading||timeLeft>0}

                >

                    {

                        loading

                            ? "Verifying..."

                            : "Verify OTP"

                    }

                </button>

                <p className="resend-text">

                    Didn't receive the code?

                </p>

               <button
    className="resend-btn"
    onClick={handleResendOtp}
    disabled={loading}
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