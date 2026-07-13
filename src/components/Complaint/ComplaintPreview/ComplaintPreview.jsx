import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ComplaintCard from "../ComplaintCard/ComplaintCard";
import { getMyComplaints } from "../../../api/studentApi";

import "./ComplaintPreview.css";

function ComplaintPreview() {

    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {

        try {

           

            // Show latest 3 complaints on dashboard
           const { data } = await getMyComplaints();

const complaintList = data.content || [];

setComplaints(complaintList.slice(0, 3));

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to load complaints."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <section className="complaint-preview">

            <div className="preview-header">

                <div>

                    <h2>My Complaint Activity</h2>

                    <p>
                        Track and manage your submitted complaints.
                    </p>

                </div>

                <button
                    className="new-complaint-btn"
                    onClick={() =>
                        navigate("/student/complaints/category")
                    }
                >
                    + New Complaint
                </button>

            </div>

            {loading ? (

                <p>Loading complaints...</p>

            ) : error ? (

                <p>{error}</p>

            ) : complaints.length === 0 ? (

                <p>No complaints submitted yet.</p>

            ) : (

                <div className="complaint-grid">

                    {complaints.map((complaint) => (

                        <ComplaintCard
                            key={complaint.id}
                            complaint={complaint}
                            onView={(id) =>
                                navigate(`/student/complaints/${id}`)
                            }
                        />

                    ))}

                </div>

            )}

            <div className="view-all">

                <button
                    onClick={() =>
                        navigate("/student/complaints")
                    }
                >
                    View All Complaints →
                </button>

            </div>

        </section>

    );
}

export default ComplaintPreview;