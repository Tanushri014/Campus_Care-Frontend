import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAdminComplaints } from "../../api/adminApi";

import "./AdminComplaint.css";

function AdminComplaint() {

    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        loadComplaints();

    }, []);

    const loadComplaints = async () => {

        try {

            const { data } = await getAdminComplaints();

            if (Array.isArray(data)) {

                setComplaints(data);

            } else if (Array.isArray(data.content)) {

                setComplaints(data.content);

            } else {

                setComplaints([]);

            }

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to load complaints."
            );

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="admin-complaints-page">
                <h2>Loading complaints...</h2>
            </div>
        );

    }

    if (error) {

        return (
            <div className="admin-complaints-page">
                <h2>{error}</h2>
            </div>
        );

    }

    return (

        <div className="admin-complaints-page">

            <div className="admin-complaints-container">

                {/* <button
                    className="back-btn"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    ← Back to Dashboard
                </button> */}

                <div className="page-header">

                    <h1>Department Complaints</h1>

                    <p>
                        View and manage complaints assigned to your department.
                    </p>

                </div>

                {

                    complaints.length === 0 ?

                        (

                            <div className="empty-state">

                                <h3>No Complaints Found</h3>

                                <p>
                                    There are currently no complaints available.
                                </p>

                            </div>

                        )

                        :

                        (

                            <div className="complaint-grid">

                                {

                                    complaints.map((complaint) => (

                                        <div
                                            key={complaint.id}
                                            className="complaint-card"
                                        >

                                            <div className="card-top">

                                                <span className="category">
                                                    {complaint.complaintCategory}
                                                </span>

                                                <span
                                                    className={`status ${complaint.status.toLowerCase()}`}
                                                >
                                                    {complaint.status}
                                                </span>

                                            </div>

                                            <h3>
                                                {complaint.title}
                                            </h3>

                                            <p>

                                                {

                                                    complaint.description.length > 120

                                                        ?

                                                        complaint.description.substring(0, 120) + "..."

                                                        :

                                                        complaint.description

                                                }

                                            </p>

                                            <button
                                                className="details-btn"
                                                onClick={() =>
                                                    navigate(`/admin/complaints/${complaint.id}`)
                                                }
                                            >
                                                View Details
                                            </button>

                                        </div>

                                    ))

                                }

                            </div>

                        )

                }

            </div>

        </div>

    );

}

export default AdminComplaint;