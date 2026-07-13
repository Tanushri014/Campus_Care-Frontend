import "./ComplaintSubmitted.css";
import { useNavigate } from "react-router-dom";

function ComplaintSubmitted() {

    const navigate = useNavigate();

    return (

        <div className="complaint-success-page">

            <div className="complaint-success-card">

                <div className="success-icon">
                    ✓
                </div>

                <h1>Complaint Submitted Successfully</h1>

                <p>
                    Your complaint has been submitted successfully.
                    Our administration team will review it shortly.
                    You can track its progress from your dashboard.
                </p>

                <button
                    className="dashboard-button"
                    onClick={() => navigate("/student/dashboard")}
                >
                    Back to Dashboard
                </button>

            </div>

        </div>

    );

}

export default ComplaintSubmitted;