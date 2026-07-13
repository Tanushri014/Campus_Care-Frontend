import "./ComplaintCard.css";

function ComplaintCard({ complaint, onView }) {

    const formattedDate = complaint.createdAt
        ? new Date(complaint.createdAt).toLocaleDateString()
        : "N/A";

    return (

        <div className="complaint-card">

            <div className="complaint-card-header">

                <span className="complaint-category">
                    {complaint.complaintCategory || "General"}
                </span>

                <span
                    className={`complaint-status ${(complaint.status || "PENDING").toLowerCase()}`}
                >
                    {complaint.status || "PENDING"}
                </span>

            </div>

            <h3 className="complaint-title">
              Issue :  {complaint.title || "Untitled Complaint"}
            </h3>

            <p className="complaint-description">
                Desription : {complaint.description || "No description provided."}
            </p>

            <div className="complaint-footer">

                <span>{formattedDate}</span>

                <button
                    className="view-btn"
                    onClick={() => onView(complaint.id)}
                >
                    View Details
                </button>

            </div>

        </div>

    );
}

export default ComplaintCard;