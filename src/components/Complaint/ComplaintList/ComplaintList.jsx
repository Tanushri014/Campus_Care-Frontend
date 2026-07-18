import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ComplaintCard from "../ComplaintCard/ComplaintCard";

import {
    getMyComplaints,
    deleteComplaint
} from "../../../api/studentApi";

import { getAdminComplaints } from "../../../api/adminApi";

import "./ComplaintList.css";

function ComplaintList({ role }) {

    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {

        fetchComplaints(currentPage);

    }, [role, currentPage]);

    const fetchComplaints = async (page) => {

        setLoading(true);
        setError("");

        try {

            const { data } =
                role === "admin"
                    ? await getAdminComplaints(page)
                    : await getMyComplaints(page);

            setComplaints(data.content || []);
            setTotalPages(data.totalPages || 0);

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Unable to load complaints."
            );

            setComplaints([]);

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this complaint?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteComplaint(id);

            setComplaints((prev) =>
                prev.filter((complaint) => complaint.id !== id)
            );

            alert("Complaint deleted successfully.");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Unable to delete complaint."
            );

        }

    };

    const filteredComplaints = complaints.filter((complaint) =>
        complaint.title?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {

        return (

            <div className="complaint-list-page">

                <h2>Loading complaints...</h2>

            </div>

        );

    }

    if (error) {

        return (

            <div className="complaint-list-page">

                <h2>{error}</h2>

            </div>

        );

    }

    return (

        <div className="complaint-list-page">

            {/* Back Button */}

            <div className="back-btn-wrapper">

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate(
                            role === "admin"
                                ? "/admin/dashboard"
                                : "/student/dashboard"
                        )
                    }
                >

                    ← Back to Dashboard

                </button>

            </div>

            {/* Header */}

            <div className="complaint-header-box">

                <div className="list-header">

                    <h1>

                        {
                            role === "admin"
                                ? "Department Complaints"
                                : "My Complaints"
                        }

                    </h1>

                    <p>

                        {
                            role === "admin"
                                ? "View and manage complaints assigned to your department."
                                : "Track every complaint you've submitted."
                        }

                    </p>

                </div>
{/* 
                <div className="search-wrapper">

                    <input
                        className="search-box"
                        type="text"
                        placeholder="🔍 Search complaint..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div> */}

            </div>

            {/* Complaint Cards */}

            <div className="complaint-list-grid">

                {

                    filteredComplaints.length === 0 ? (

                        <div className="empty-state">

                            <h3>No Complaints Found</h3>

                            <p>

                                {
                                    role === "admin"
                                        ? "No complaints are available."
                                        : "You haven't submitted any complaints yet."
                                }

                            </p>

                        </div>

                    ) : (

                        filteredComplaints.map((complaint) => (

                            <ComplaintCard

                                key={complaint.id}

                                complaint={complaint}

                                onView={() =>
                                    navigate(
                                        role === "admin"
                                            ? `/admin/complaints/${complaint.id}`
                                            : `/student/complaints/${complaint.id}`
                                    )
                                }

                                onDelete={
                                    role === "student"
                                        ? handleDelete
                                        : undefined
                                }

                            />

                        ))

                    )

                }

            </div>

            {/* Pagination */}

            {

                totalPages > 1 && (

                    <div className="pagination">

                        <button
                            onClick={() =>
                                setCurrentPage(currentPage - 1)
                            }
                            disabled={currentPage === 0}
                        >

                            Previous

                        </button>

                        {

                            Array.from(
                                { length: totalPages },
                                (_, index) => (

                                    <button
                                        key={index}
                                        className={
                                            currentPage === index
                                                ? "active-page"
                                                : ""
                                        }
                                        onClick={() =>
                                            setCurrentPage(index)
                                        }
                                    >

                                        {index + 1}

                                    </button>

                                )
                            )

                        }

                        <button
                            onClick={() =>
                                setCurrentPage(currentPage + 1)
                            }
                            disabled={
                                currentPage === totalPages - 1
                            }
                        >

                            Next

                        </button>

                    </div>

                )

            }

        </div>

    );

}

export default ComplaintList;