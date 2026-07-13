import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ComplaintCard from "../../components/Complaint/ComplaintCard/ComplaintCard";
import { getAdminComplaints } from "../../api/adminApi";

import "./MainAdminComplaint.css";

function MainAdminComplaint() {

    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        fetchComplaints(page);
    }, [page]);

    const fetchComplaints = async (currentPage) => {

        try {

            const response = await getAdminComplaints(currentPage);

            setComplaints(response.data.content);



        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to load complaints."
            );

        } finally {

            setLoading(false);

        }

    };

    const filteredComplaints = complaints.filter(c =>
        (c.title || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    if (loading) return <h2>Loading...</h2>;

    if (error) return <h2>{error}</h2>;

    return (

        <div className="complaint-list-page">

            <button
                className="back-btn"
                onClick={() => navigate("/main-admin/dashboard")}
            >
                ← Back
            </button>

            <input
                className="search-box"
                placeholder="Search complaint..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="complaint-list-grid">

                {filteredComplaints.map(c => (

                    <ComplaintCard
                        key={c.id}
                        complaint={c}
                        onView={(id) =>
                            navigate(`/main-admin/complaints/${id}`)
                        }
                    />

                ))}

            </div>

            {totalPages > 1 && (

                <div className="pagination">

                    <button
                        disabled={page === 0}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>

                    <span>
                        Page {page + 1} of {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages - 1}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>

                </div>

            )}

        </div>

    );

}

export default MainAdminComplaint;