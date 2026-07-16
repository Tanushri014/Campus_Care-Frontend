import { useEffect, useState } from "react";

import AnnouncementCard from "./AnnouncementCard";
import { getAnnouncements } from "../../api/announcementApi";

import "./AnnouncementPreview.css";

function AnnouncementPreview({ onViewAll, hideViewAll = false }) {

    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        loadAnnouncements();
    }, []);

    const loadAnnouncements = async () => {

        try {

            const response = await getAnnouncements(0, 3);

            setAnnouncements(response.data.content);

        } catch (error) {

            console.error(error);

        }

    };

 const handleDownload = (announcement) => {
    if (!announcement.fileUrl) return;

    const downloadUrl = announcement.fileUrl.replace(
        "/upload/",
        "/upload/fl_attachment/"
    );

    window.open(downloadUrl, "_blank");
};
    
   return (
    <section className="announcement-preview">

        <div className="announcement-preview-header">

            <div>
                <h2>Latest Announcements</h2>

                <p>
                    Stay updated with important campus notices.
                </p>
            </div>

            {!hideViewAll && (
                <button
                    className="announcement-view-btn"
                    onClick={onViewAll}
                >
                    View All
                </button>
            )}

        </div>

        <div className="announcement-grid">

            {announcements.map((announcement) => (

                <AnnouncementCard
                    key={announcement.id}
                    announcement={announcement}
                    onDownload={() => handleDownload(announcement)}
                />

            ))}

        </div>

    </section>
);

}

export default AnnouncementPreview;