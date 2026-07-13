import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StudentProfile from "../StudentProfile/StudentProfile";
import ComplaintPreview from "../../components/Complaint/ComplaintPreview/ComplaintPreview";
import AnnouncementPreview from "../../components/Announcement/AnnouncementPreview";
import LostFoundPreview from "../LostFound/LostFoundPreview";

import { getMyComplaints } from "../../api/studentApi";

function StudentDashboard() {

    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {

    try {

        // Fetch all complaints for dashboard stats
        const response = await getMyComplaints(0, 1000);

        setComplaints(response.data.content || []);

    } catch (err) {

        console.error("Failed to load complaints:", err);

        setComplaints([]);

    }

};

    const complaintList = Array.isArray(complaints)
        ? complaints
        : [];

    const stats = {

        total: complaintList.length,

        resolved: complaintList.filter(
            complaint => complaint.status === "COMPLETED"
        ).length,

        pending: complaintList.filter(
            complaint => complaint.status !== "COMPLETED"
        ).length,

    };

   return (
    <div className="student-dashboard">

        <StudentProfile stats={stats} />

        <ComplaintPreview />

        <AnnouncementPreview
            onViewAll={() => navigate("/student/announcements")}
        />

        <LostFoundPreview />

    </div>
);

}

export default StudentDashboard;