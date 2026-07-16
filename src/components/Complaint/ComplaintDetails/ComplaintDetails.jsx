import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getComplaintById } from "../../../api/studentApi";

import "./ComplaintDetails.css";

function ComplaintDetails() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchComplaint();
    }, [id]);

    const fetchComplaint = async () => {

        setLoading(true);
        setError("");

        try {

            const { data } = await getComplaintById(id);

            setComplaint(data);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to load complaint."
            );

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="complaint-details-page">
                <h2>Loading complaint...</h2>
            </div>
        );

    }

    if (error) {

        return (
            <div className="complaint-details-page">
                <h2>{error}</h2>

                <button
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>
            </div>
        );

    }

    if (!complaint) {

        return (
            <div className="complaint-details-page">
                <h2>Complaint not found.</h2>

                <button
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>
            </div>
        );

    }

    return (

        <div className="complaint-details-page">

            <div className="details-card">

                <button
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <h1>Complaint Details</h1>

                <div className="status-section">

                    <span>Status</span>

                    <div
                        className={`status ${(complaint.status || "PENDING").toLowerCase()}`}
                    >
                        {complaint.status || "PENDING"}
                    </div>

                </div>

                <div className="info-group">

                    <label>Category</label>

                    <p>
                        {complaint.complaintCategory || "N/A"}
                    </p>

                </div>

                <div className="info-group">

                    <label>Complaint Title</label>

                    <p>
                        {complaint.title || "N/A"}
                    </p>

                </div>

                <div className="info-group">

                    <label>Description</label>

                    <p>
                        {complaint.description || "No description provided."}
                    </p>

                </div>

                {complaint.imageUrl && (

                    <div className="info-group">

                        <label>Reference Image</label>

                        <img
                            src={complaint.imageUrl}
                            alt="Complaint"
                        />

                    </div>

                )}

                <div className="info-group">

                    <label>Submitted On</label>

                    <p>
                        {complaint.createdAt
                            ? new Date(
                                  complaint.createdAt
                              ).toLocaleString()
                            : "N/A"}
                    </p>

                </div>

                <div className="admin-message">

                    <h3>Admin Response</h3>

                    <p>
                        {complaint.adminMessage ||
                            "No response yet."}
                    </p>

                </div>

                {complaint.status === "COMPLETED" && (

                    <button
                        className="feedback-btn"
                        onClick={() =>
                            navigate(
                                `/student/complaints/${id}/feedback`
                            )
                        }
                    >
                        Give Feedback
                    </button>

                )}

            </div>

        </div>

    );

}

export default ComplaintDetails;