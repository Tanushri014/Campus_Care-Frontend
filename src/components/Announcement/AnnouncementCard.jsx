import "./AnnouncementCard.css";

function AnnouncementCard({

    announcement,

    onDownload

}) {

    return (

        <div className="announcement-card">

            <div className="announcement-header">

                <span className="announcement-badge">

                    Announcement

                </span>

                <span className="announcement-date">

                    {new Date(
                        announcement.createdAt
                    ).toLocaleDateString()}

                </span>

            </div>

            <h3>

                Subject : {announcement.title}

            </h3>

            <p>

                {announcement.description}

            </p>

            <button
                className="download-btn"
                onClick={onDownload}
            >
                Download PDF
            </button>

        </div>

    );

}

export default AnnouncementCard;