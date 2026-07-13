import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ComplaintCard from "../../components/Complaint/ComplaintCard/ComplaintCard";
import { getAdminComplaints } from "../../api/adminApi";

import "./MainAdminComplaintPreview.css";

function MainAdminComplaintPreview() {

    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        fetchComplaints();

    }, []);

    const fetchComplaints = async () => {

        setError("");

        try {

            const response = await getAdminComplaints();

            setComplaints((response.data.content || []).slice(0, 3));

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Unable to load complaints."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <section className="complaint-preview">

            <div className="preview-header">

                <div>

                    <h2>Recent Complaints</h2>

                    <p>

                        Latest complaints from all departments.

                    </p>

                </div>

            </div>

            {

                loading ? (

                    <p>Loading complaints...</p>

                ) : error ? (

                    <p>{error}</p>

                ) : complaints.length === 0 ? (

                    <p>No complaints found.</p>

                ) : (

                    <div className="complaint-grid">

                        {

                            complaints.map((complaint) => (

                                <ComplaintCard

                                    key={complaint.id}

                                    complaint={complaint}

                                    onView={(id) =>

                                        navigate(`/main-admin/complaints/${id}`)

                                    }

                                />

                            ))

                        }

                    </div>

                )

            }

            <div className="view-all">

                <button

                    onClick={() =>

                        navigate("/main-admin/complaints")

                    }

                >

                    View All Complaints →

                </button>

            </div>

        </section>

    );

}

export default MainAdminComplaintPreview;