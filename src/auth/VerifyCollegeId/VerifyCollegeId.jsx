import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { verifyCollegeId } from "../../api/authApi";

import "./VerifyCollegeId.css";

function VerifyCollegeId() {
const { setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const studentEmail =
        location.state?.studentEmail ||
        queryParams.get("email") ||
        "";

    const [collegeId, setCollegeId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCollegeVerification = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const response = await verifyCollegeId({

                studentEmail,
                collegeId

            });


           setUser({
    ...response.data,
    role: "STUDENT"
});

            navigate("/student/dashboard");

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "College verification failed."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="college-page">

            <div className="college-card">

                <div className="college-header">

                    <h1>CampusCare</h1>

                    <h2>Verify College ID</h2>

                    <p>
                        Enter your College ID to verify that you are an
                        authorized student before accessing CampusCare.
                    </p>

                </div>

                <form
                    className="college-form"
                    onSubmit={handleCollegeVerification}
                >

                    <div className="input-group">

                        <label>College ID</label>

                        <input
                            type="text"
                            placeholder="Enter your College ID"
                            value={collegeId}
                            onChange={(e) =>
                                setCollegeId(e.target.value)
                            }
                            required
                        />

                    </div>

                    {error && (

                        <p className="error-message">

                            {error}

                        </p>

                    )}

                    <button
                        type="submit"
                        className="verify-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Verifying..."
                            : "Verify College ID"}

                    </button>

                </form>

            </div>

        </div>

    );

}

export default VerifyCollegeId;