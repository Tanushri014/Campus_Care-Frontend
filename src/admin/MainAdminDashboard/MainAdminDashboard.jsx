import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAdminComplaints
} from "../../api/adminApi";

import MainAdminComplaintPreview from "../MainAdminComplaintPreview/MainAdminComplaintPreview";
import AnnouncementPreview from "../../components/Announcement/AnnouncementPreview";
import AdminCharts from "../../components/AdminCharts";

import "./MainAdminDashboard.css";

function MainAdminDashboard() {

    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await getAdminComplaints(0, 1000);

            setComplaints(response.data.content || []);

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Unable to load dashboard."

            );

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2 className="dashboard-loading">Loading Dashboard...</h2>;

    }

    if (error) {

        return <h2 className="dashboard-loading">{error}</h2>;

    }

    const totalComplaints = complaints.length;

    const pendingComplaints = complaints.filter(

        complaint => complaint.status !== "COMPLETED"

    ).length;

    const resolvedComplaints = complaints.filter(

        complaint => complaint.status === "COMPLETED"

    ).length;

    return (

        <section className="main-dashboard">

            {/* HERO */}

            <div className="dashboard-hero">

                <div>

                    <h1>

                        Main Admin Dashboard

                    </h1>

                    <p>

                        Manage complaints, announcements and monitor every
                        department from one place.

                    </p>

                </div>

                <div className="admin-badge">

                    <div className="admin-avatar">

                        M

                    </div>

                    <div>

                        <h3>

                            Main Administrator

                        </h3>

                        <span>

                            CampusCare Control Center

                        </span>

                    </div>

                </div>

            </div>

            {/* STATS */}

            <div className="stats-grid">

                <div className="dashboard-card">

                    <h2>

                        {totalComplaints}

                    </h2>

                    <p>

                        Total Complaints

                    </p>

                </div>

                <div className="dashboard-card">

                    <h2>

                        {pendingComplaints}

                    </h2>

                    <p>

                        Pending Complaints

                    </p>

                </div>

                <div className="dashboard-card">

                    <h2>

                        {resolvedComplaints}

                    </h2>

                    <p>

                        Resolved Complaints

                    </p>

                </div>

            </div>

            {/* CHARTS */}

            <AdminCharts />

            {/* COMPLAINTS */}

            <MainAdminComplaintPreview />

            {/* ANNOUNCEMENTS */}

            <section className="announcement-section">

                <div className="section-header">

                    <div>

                        <h2>

                            Stay Updated With Every Announcement 

                        </h2>

                    </div>

                    <div className="section-buttons">

                        <button

                            className="outline-btn"

                            onClick={() =>

                                navigate("/main-admin/announcements")

                            }

                        >

                            View All

                        </button>

                        <button

                            className="primary-btn"

                            onClick={() =>

                                navigate("/main-admin/announcement/new")

                            }

                        >

                            + Create

                        </button>

                    </div>

                </div>

                <AnnouncementPreview hideViewAll />

            </section>

        </section>

    );

}

export default MainAdminDashboard;