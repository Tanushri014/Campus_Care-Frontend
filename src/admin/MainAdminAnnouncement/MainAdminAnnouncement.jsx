import { useNavigate } from "react-router-dom";
import AnnouncementList from "../../components/Announcement/AnnouncementList";

import "./MainAdminAnnouncement.css";

function MainAdminAnnouncement() {

    const navigate = useNavigate();

    return (

        <section className="main-admin-announcement">

            <div className="announcement-toolbar">

                <div className="toolbar-text">

                    <h1>Announcements</h1>

                    <p>
                        Publish and manage campus announcements.
                    </p>

                </div>

                <div className="toolbar-buttons">

                    <button
                        className="dashboard-btn"
                        onClick={() =>
                            navigate("/main-admin/dashboard")
                        }
                    >
                        ← Dashboard
                    </button>

                    <button
                        className="create-btn"
                        onClick={() =>
                            navigate("/main-admin/announcement/new")
                        }
                    >
                        + Create Announcement
                    </button>

                </div>

            </div>

            <AnnouncementList />

        </section>

    );

}

export default MainAdminAnnouncement;