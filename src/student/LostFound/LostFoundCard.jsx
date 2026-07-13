import "./LostFoundCard.css";

function LostFoundCard({ item, onView }) {

    const formattedDate = item.createdAt
        ? new Date(item.createdAt).toLocaleDateString()
        : "N/A";

    return (

        <div className="lostfound-card">

            {item.imageUrl ? (

                <img
                    src={item.imageUrl}
                    alt={item.title || "Lost & Found Item"}
                    className="lostfound-image"
                />

            ) : (

                <div className="lostfound-image-placeholder">
                    No Image
                </div>

            )}

            <div className="lostfound-content">

                <div className="lostfound-header">

                    <span
                        className={`item-type ${(item.type || "LOST").toLowerCase()}`}
                    >
                        {item.type || "LOST"}
                    </span>

                    <span className="upload-date">
                        {formattedDate}
                    </span>

                </div>

                <h3>
                   Item : {item.title || "Untitled Item"}
                </h3>

                <p>
                    {item.description || "No description provided."}
                </p>

                <div className="lostfound-footer">

                    <span>
                        Uploaded by{" "}
                        {`${item.firstName || ""} ${item.lastName || ""}`.trim() || "Unknown"}
                    </span>

                    <button
                        onClick={() => onView(item.id)}
                    >
                        View Details
                    </button>

                </div>

            </div>

        </div>

    );

}

export default LostFoundCard;