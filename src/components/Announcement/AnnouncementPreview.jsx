import { useEffect, useState } from "react";

import AnnouncementCard from "./AnnouncementCard";
import { getAnnouncements,downloadAnnouncement } from "../../api/announcementApi";

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

 const handleDownload = async (announcement) => {
    try {
        const response = await downloadAnnouncement(announcement.id);
        const url = response.data;

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", ""); // hints the browser to download, not navigate
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error(error);
    }
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