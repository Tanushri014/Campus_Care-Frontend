import "./LostFoundDetails.css";

import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getLostFoundById } from "../../api/lostFoundApi";
import { useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import { deleteLostFound } from "../../api/lostFoundApi";
function LostFoundDetails() {
const { user } = useAuth();


    const navigate = useNavigate();

    const { id } = useParams();

    const [item, setItem] = useState(null);
const isOwner =
    Number(user?.id) === Number(item?.studentId);
    useEffect(() => {

        loadItem();

    }, []);

    const loadItem = async () => {

        try {

            const response = await getLostFoundById(id);

            setItem(response.data);
            console.log(response.data);
            console.log("Logged in user:", user);
console.log("Item:", item);
console.log("User ID:", user?.id);
console.log("Owner ID:", item?.studentId);
console.log(
    "Is Owner:",
    Number(user?.id) === Number(item?.studentId)
);

        }

        catch (error) {

            console.error(error);

            alert("Unable to load item.");

        }

    };

    if (!item) {

        return <h2>Loading...</h2>;

    }
const handleDelete = async () => {

    const confirmed = window.confirm(
        "Are you sure you want to delete this item?"
    );

    if (!confirmed) return;

    try {

        await deleteLostFound(item.id);

        alert("Item deleted successfully.");

        navigate("/student/lost-found");

    } catch (error) {

        alert(
            error.response?.data?.message ||
            "Unable to delete item."
        );

    }
};
    return (

        <div className="lostfound-details-page">

            <div className="lostfound-details-card">

                <button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                {item.imageUrl && (

                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="details-image"
                    />

                )}

                <div className="details-header">

                    <span
                        className={`item-type ${item.type.toLowerCase()}`}
                    >
                        {item.type}
                    </span>

                    <span>

                        {new Date(item.createdAt).toLocaleDateString()}

                    </span>

                </div>

                <h1>{item.title}</h1>

                <p className="description">

                    {item.description}

                </p>

                <div className="student-info">

                    <strong>Uploaded By:</strong>{" "}

                    {item.firstName} {item.lastName}

                </div>

{isOwner && (
    <button
        className="delete-btn"
        onClick={handleDelete}
    >
        Delete Item
    </button>
)}


            </div>

        </div>

    );

}

export default LostFoundDetails;