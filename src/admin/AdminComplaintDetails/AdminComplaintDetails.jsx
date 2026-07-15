import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getAdminComplaintById,
    updateComplaintStatus,
    getComplaintFeedback
} from "../../api/adminApi";

import "./AdminComplaintDetails.css";

function AdminComplaintDetails() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [complaint, setComplaint] = useState(null);

    const [status, setStatus] = useState("");

    const [message, setMessage] = useState("");

    const [feedback, setFeedback] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        fetchComplaint();

    }, [id]);

    const fetchComplaint = async () => {

        try {

            const response = await getAdminComplaintById(id);

            setComplaint(response.data);

            setStatus(response.data.status);

            setMessage(response.data.adminMessage || "");

            if (response.data.status === "COMPLETED") {

                fetchFeedback();

            }

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Unable to load complaint."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const fetchFeedback = async () => {

        try {

            const response = await getComplaintFeedback(id);

            setFeedback(response.data);

        }

        catch {

            setFeedback(null);

        }

    };

    const handleUpdate = async () => {

        try {

            await updateComplaintStatus(id, {

                status,

                message

            });

            alert("Complaint updated successfully.");

            fetchComplaint();

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Unable to update complaint."

            );

        }

    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    if (error) {

        return <h2>{error}</h2>;

    }

    return (

        <div className="admin-details-page">

            <button

                className="back-btn"

                onClick={() => navigate(-1)}

            >

                ← Back

            </button>

            <div className="details-card">

                <h1>{complaint.title}</h1>

                <p className="category">

                    {complaint.complaintCategory}

                </p>

                <div className="status-badge">

                    {complaint.status}

                </div>

                <h3>Description</h3>

                <p>

                    {complaint.description}

                </p>

                {

                    complaint.imagePath && (

                        <img

                            className="complaint-image"

                            src={complaint.imagePath}

                            alt="Complaint"

                        />

                    )

                }

                <hr />

                <h2>Update Complaint</h2>

                <label>Status</label>

                <select

                    value={status}

                    onChange={(e) =>

                        setStatus(e.target.value)

                    }

                >

                    <option value="PENDING">

                        PENDING

                    </option>

                    <option value="IN_PROGRESS">

                        IN_PROGRESS

                    </option>

                    <option value="COMPLETED">

                        COMPLETED

                    </option>

                </select>

                <label>

                    Admin Message

                </label>

                <textarea

                    rows="5"

                    value={message}

                    onChange={(e) =>

                        setMessage(e.target.value)

                    }

                />

                <button

                    className="update-btn"

                    onClick={handleUpdate}

                >

                    Update Complaint

                </button>

                {

                    complaint.status === "COMPLETED" && (

                        <>

                            <hr />

                            <h2>

                                Student Feedback

                            </h2>

                            {

                                feedback ?

                                    (

                                        <div className="feedback-box">

                                            <p>

                                                {feedback.message}

                                            </p>

                                        </div>

                                    )

                                    :

                                    (

                                        <p>

                                            No feedback submitted.

                                        </p>

                                    )

                            }

                        </>

                    )

                }

            </div>

        </div>

    );

}

export default AdminComplaintDetails;