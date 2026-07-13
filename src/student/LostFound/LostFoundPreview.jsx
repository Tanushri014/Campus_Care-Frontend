import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LostFoundCard from "./LostFoundCard";
import { getAllLostFoundItems } from "../../api/lostFoundApi";

import "./LostFoundPreview.css";

function LostFoundPreview() {

    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {

        try {

            const { data } = await getAllLostFoundItems();

            let list = [];

            if (Array.isArray(data)) {

                list = data;

            } else if (Array.isArray(data.content)) {

                // If backend returns Page<>
                list = data.content;

            }

            setItems(list.slice(0, 3));

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to load Lost & Found items."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <section className="lostfound-preview">

            <div className="preview-header">

                <div>

                    <h2>Lost & Found</h2>

                    <p>
                        Recently reported lost and found items.
                    </p>

                </div>

                <button
                    className="add-item-btn"
                    onClick={() =>
                        navigate("/student/lost-found/new")
                    }
                >
                    + Add Item
                </button>

            </div>

            {loading ? (

                <p>Loading items...</p>

            ) : error ? (

                <p>{error}</p>

            ) : items.length === 0 ? (

                <p>No Lost & Found items available.</p>

            ) : (

                <div className="lostfound-grid">

                    {items.map((item) => (

                        <LostFoundCard
                            key={item.id}
                            item={item}
                            onView={(id) =>
                                navigate(`/student/lost-found/${id}`)
                            }
                        />

                    ))}

                </div>

            )}

            <div className="view-all">

                <button
                    onClick={() =>
                        navigate("/student/lost-found")
                    }
                >
                    View All Items →
                </button>

            </div>

        </section>

    );

}

export default LostFoundPreview;