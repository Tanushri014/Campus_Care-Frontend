import "./AddLostFound.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLostFound } from "../../api/lostFoundApi";


function AddLostFound() {

    const navigate = useNavigate();
const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({

        title: "",

        type: "FOUND",

        description: ""

    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value

        });

    };

    const handleImage = (e) => {

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

            alert("Image size should not exceed 2 MB.");

            return;

        }

        setImage(file);

    };

   const handleSubmit = async (e) => {

    e.preventDefault();
     setLoading(true);

    try {

        const formDataToSend = new FormData();

        formDataToSend.append("title", formData.title);

        formDataToSend.append("description", formData.description);

        formDataToSend.append("type", formData.type);

        if (image) {

            formDataToSend.append("image", image);

        }

        await createLostFound(formDataToSend);

        alert("Item submitted successfully.");

        navigate("/student/lost-found");

    }

    catch (error) {

        console.error(error);

        alert("Failed to submit item.");

    }
    finally {

        setLoading(false);

    }

};

    return (

        <div className="add-lostfound-page">

            <div className="add-lostfound-card">

                <button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <h1>Report Lost / Found Item</h1>

                <p>
                    Help others by reporting an item that you've lost or found.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <label>Title</label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter item title"
                            required
                        />

                    </div>

                    <div className="input-group">

                        <label>Item Type</label>

                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >

                            <option value="FOUND">

                                Found

                            </option>

                            <option value="LOST">

                                Lost

                            </option>

                        </select>

                    </div>

                    <div className="input-group">

                        <label>Description</label>

                        <textarea
                            rows="5"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the item..."
                            required
                        />

                    </div>

                    <div className="input-group">

                        <label>Reference Image</label>

                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleImage}
                        />

                        <small>

                            Optional • JPG / PNG • Maximum 2 MB

                        </small>

                    </div>

                   <button
    type="submit"
    className="submit-btn"
    disabled={loading}
>
    {loading ? "Submitting..." : "Submit Item"}
</button>

                </form>

            </div>

        </div>

    );

}

export default AddLostFound;