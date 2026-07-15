import "./LostFoundDetails.css";

import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getLostFoundById } from "../../api/lostFoundApi";

function LostFoundDetails() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [item, setItem] = useState(null);

    useEffect(() => {

        loadItem();

    }, []);

    const loadItem = async () => {

        try {

            const response = await getLostFoundById(id);

            setItem(response.data);

        }

        catch (error) {

            console.error(error);

            alert("Unable to load item.");

        }

    };

    if (!item) {

        return <h2>Loading...</h2>;

    }

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

            </div>

        </div>

    );

}

export default LostFoundDetails;