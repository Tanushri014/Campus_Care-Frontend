import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Profile from "../../components/Profile/Profile";
import AdminComplaintPreview from "../AdminComplaintPreview/AdminComplaintPreview";
import AnnouncementPreview from "../../components/Announcement/AnnouncementPreview";

import {
    getCurrentAdmin,
    getAdminComplaints
} from "../../api/adminApi";

function AdminDashboard() {

    const navigate = useNavigate();

    const [admin, setAdmin] = useState(null);
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const [profileResponse, complaintResponse] =
                await Promise.all([
                    getCurrentAdmin(),
                    getAdminComplaints()
                ]);

            setAdmin(profileResponse.data);

            setComplaints(
                complaintResponse.data.content || []
            );

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
        return <h2>Loading Dashboard...</h2>;
    }

    const total = complaints.length;

    const resolved = complaints.filter(
        complaint => complaint.status === "COMPLETED"
    ).length;

    const pending = complaints.filter(
        complaint => complaint.status !== "COMPLETED"
    ).length;

    const profile = {
        firstName: admin.category,
        lastName: "Admin",
        email: admin.email,
        department: admin.category,
        stats: {
            total,
            resolved,
            pending
        }
    };

    return (

        <section className="admin-dashboard">

            <Profile
                user={profile}
                role="admin"
            />

            <AdminComplaintPreview />

            <AnnouncementPreview
                onViewAll={() =>
                    navigate("/admin/announcements")
                }
            />

        </section>

    );

}

export default AdminDashboard;