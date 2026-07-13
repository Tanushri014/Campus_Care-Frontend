import "./Feedback.css";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { submitFeedback } from "../../../api/studentApi";

function Feedback() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [rating, setRating] = useState(5);

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await submitFeedback(id, {
                rating,
                message
            });

            alert("Feedback submitted successfully.");

            navigate(`/student/complaints/${id}`);

        }

        catch (err) {

            alert(
                err.response?.data?.message ||
                "Unable to submit feedback."
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="feedback-page">

            <div className="feedback-card">

                <button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <h1>Complaint Feedback</h1>

                <p>
                    Help us improve CampusCare by sharing your experience.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <label>Rating</label>

                        <select
                            value={rating}
                            onChange={(e) =>
                                setRating(Number(e.target.value))
                            }
                        >
                            <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                            <option value={4}>⭐⭐⭐⭐ (4)</option>
                            <option value={3}>⭐⭐⭐ (3)</option>
                            <option value={2}>⭐⭐ (2)</option>
                            <option value={1}>⭐ (1)</option>
                        </select>

                    </div>

                    <div className="input-group">

                        <label>Feedback</label>

                        <textarea
                            rows="6"
                            placeholder="Share your experience..."
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            required
                        />

                    </div>

                    <button
                        className="submit-btn"
                        type="submit"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Submitting..."
                                : "Submit Feedback"
                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Feedback;