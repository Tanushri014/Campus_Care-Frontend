import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LostFoundCard from "./LostFoundCard";
import {
    getAllLostFoundItems,
    deleteLostFound
} from "../../api/lostFoundApi";

import "./LostFoundList.css";

function LostFoundList() {
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchItems(currentPage);
    }, [currentPage]);

    const fetchItems = async (page) => {
        setLoading(true);
        setError("");

        try {
            const { data } = await getAllLostFoundItems(page);

            setItems(data.content);
            setTotalPages(data.totalPages);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load Lost & Found items."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this item?"
        );

        if (!confirmed) return;

        try {

            await deleteLostFound(id);

            fetchItems(currentPage);

        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Unable to delete item."
            );
        }
    };

    if (loading) {
        return (
            <div className="lostfound-list-page">
                <h2>Loading Lost & Found items...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="lostfound-list-page">

                <div className="back-btn-wrapper">
                    <button
                        className="back-btn"
                        onClick={() => navigate("/student/dashboard")}
                    >
                        ← Back to Dashboard
                    </button>
                </div>

                <h2>{error}</h2>

            </div>
        );
    }

    return (
        <div className="lostfound-list-page">

            <div className="back-btn-wrapper">
                <button
                    className="back-btn"
                    onClick={() => navigate("/student/dashboard")}
                >
                    ← Back to Dashboard
                </button>
            </div>

            <div className="lostfound-list-header">

                <div className="header-content">
                    <h1>Lost & Found</h1>
                    <p>
                        Browse all reported lost and found items.
                    </p>
                </div>

                <button
                    className="add-btn"
                    onClick={() => navigate("/student/lost-found/new")}
                >
                    + Add Item
                </button>

            </div>

            <div className="lostfound-list-grid">

                {items.length === 0 ? (
                    <div className="empty-state">
                        <h3>No items found.</h3>
                        <p>
                            No Lost & Found items have been reported yet.
                        </p>
                    </div>
                ) : (
                    items.map((item) => (
                        <LostFoundCard
                            key={item.id}
                            item={item}
                            onView={() =>
                                navigate(`/student/lost-found/${item.id}`)
                            }
                            onDelete={handleDelete}
                        />
                    ))
                )}

            </div>

            {totalPages > 1 && (
                <div className="pagination">

                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 0}
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={
                                currentPage === index
                                    ? "active-page"
                                    : ""
                            }
                            onClick={() => setCurrentPage(index)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                    >
                        Next
                    </button>

                </div>
            )}

        </div>
    );
}

export default LostFoundList;