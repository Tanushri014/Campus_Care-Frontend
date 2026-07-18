import "./ComplaintForm.css";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { createComplaint } from "../../../api/studentApi";

function ComplaintForm() {

    const navigate = useNavigate();

    const location = useLocation();

    const category = location.state?.category || "";

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg"
        ];

        if (!allowedTypes.includes(file.type)) {

            alert("Only JPG and PNG images are allowed.");

            return;
        }

        if (file.size > 2 * 1024 * 1024) {

            alert("Maximum image size is 2 MB.");

            return;
        }

        setImage(file);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("title", title);

            formData.append("description", description);

            formData.append("complaintCategory", category);

            if (image) {

                formData.append("image", image);

            }

            await createComplaint(formData);

            navigate("/student/complaints/submitted");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Failed to submit complaint."

            );

        }

        finally {

            setLoading(false);

        }

    };
return (
    <div className="complaint-form-page">

        <div className="back-btn-wrapper">
            {/* <button
                className="back-btn"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button> */}
        </div>

        <div className="complaint-form-card">

            <div className="form-header">
                <h1>Submit Complaint</h1>
                <p>
                    Fill in the details below to submit your complaint.
                </p>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="input-group">
                    <label>Department</label>

                    <input
                        type="text"
                        value={category}
                        readOnly
                    />
                </div>

                <div className="input-group">
                    <label>Complaint Title</label>

                    <input
                        type="text"
                        placeholder="Enter complaint title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Description</label>

                    <textarea
                        rows="6"
                        placeholder="Describe your issue..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Upload Image</label>

                    <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileChange}
                    />

                    <small>
                        Optional • JPG / PNG • Maximum 2 MB
                    </small>
                </div>

                <button
                    className="submit-btn"
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Submitting..."
                        : "Submit Complaint"}
                </button>

            </form>

        </div>

    </div>
);

}

export default ComplaintForm;