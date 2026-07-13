import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createAnnouncement } from "../../api/announcementApi";

import "./CreateAnnouncement.css";

function CreateAnnouncement() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!file) {

            setError("Please upload a PDF.");

            return;

        }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("file", file);

        try {

            setLoading(true);

            await createAnnouncement(formData);

            alert("Announcement created successfully.");

            navigate("/main-admin/announcements");

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Unable to create announcement."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <section className="announcement-page">

            <form
                className="announcement-card"
                onSubmit={handleSubmit}
            >

                <h1>Create Announcement</h1>

                {
                    error &&
                    <p className="error">{error}</p>
                }

                <div className="input-group">

                    <label>Title</label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter announcement title"
                        required
                    />

                </div>

                <div className="input-group">

                    <label>Description</label>

                    <textarea
                        rows="6"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter announcement description"
                        required
                    />

                </div>

                <div className="input-group">

                    <label>Upload PDF</label>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />

                </div>

                <button
                    type="submit"
                    disabled={loading}
                >

                    {
                        loading
                            ? "Creating..."
                            : "Create Announcement"
                    }

                </button>

            </form>

        </section>

    );

}

export default CreateAnnouncement;