import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StudentProfile from "../StudentProfile/StudentProfile";
import ComplaintPreview from "../../components/Complaint/ComplaintPreview/ComplaintPreview";
import AnnouncementPreview from "../../components/Announcement/AnnouncementPreview";
import { logout } from "../../api/authApi";
import LostFoundPreview from "../LostFound/LostFoundPreview";
import {
    FiFileText,
    FiClock,
    FiCheckCircle,
    FiPackage
} from "react-icons/fi";
import {
    getMyComplaints,
    getStudentProfile
} from "../../api/studentApi";

import "./StudentDashboard.css";

function StudentDashboard() {

    const navigate = useNavigate();
    const handleLogout = async () => {
    try {
        await logout();
    } catch (error) {
        console.error("Logout failed:", error);
    } finally {
        navigate("/login", { replace: true });
    }
};

    const [complaints, setComplaints] = useState([]);
    const [student, setStudent] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const complaintResponse =
                await getMyComplaints(0, 1000);

            setComplaints(
                complaintResponse.data.content || []
            );

            const profileResponse =
                await getStudentProfile();

            setStudent(profileResponse.data);

        }

        catch (err) {

            console.error(err);

        }

    };

    const complaintList = Array.isArray(complaints)
        ? complaints
        : [];

    const stats = {

        total: complaintList.length,

        pending: complaintList.filter(
            c => c.status !== "COMPLETED"
        ).length,

        resolved: complaintList.filter(
            c => c.status === "COMPLETED"
        ).length

    };

    return (

        <div className="student-dashboard">

            {/* Desktop */}

            <div className="desktop-dashboard">

                <StudentProfile stats={stats} showStats={true} layout="dashboard" handleLogout={handleLogout} />

                <ComplaintPreview />

                <AnnouncementPreview
                    onViewAll={() =>
                        navigate("/student/announcements")
                    }
                />

                <LostFoundPreview />

            </div>

            {/* Mobile */}

            <div className="mobile-dashboard">

                <section className="mobile-welcome">

                    <h1>
                        Welcome,
                        {" "}
                        {student?.firstName || "Student"} 👋
                    </h1>

                    <p>
                        Manage your campus activities from one place.
                    </p>

                </section>
<section className="stats-grid-mobile">

    <div
        className="stat-card-mobile complaints"
        onClick={() =>
            navigate("/student/complaints")
        }
    >
        <div className="stat-icon">
            <FiFileText />
        </div>

        <h2>{stats.total}</h2>

        <span>Total Complaints</span>
    </div>

    <div
        className="stat-card-mobile pending"
        onClick={() =>
            navigate("/student/complaints")
        }
    >
        <div className="stat-icon">
            <FiClock />
        </div>

        <h2>{stats.pending}</h2>

        <span>Pending</span>
    </div>

    <div
        className="stat-card-mobile completed"
        onClick={() =>
            navigate("/student/complaints")
        }
    >
        <div className="stat-icon">
            <FiCheckCircle />
        </div>

        <h2>{stats.resolved}</h2>

        <span>Completed</span>
    </div>

    <div
        className="stat-card-mobile lostfound"
        onClick={() =>
            navigate("/student/lost-found")
        }
    >
        <div className="stat-icon">
            <FiPackage />
        </div>

        <h2>View</h2>

        <span>Lost & Found</span>
    </div>

</section>

                <section className="campus-care-card">

    <div className="hero-content">

        <div>

            <span className="hero-tag">
                CAMPUS CARE
            </span>

            <h2>
                Stay Connected with Your Campus
            </h2>

            <p>
                Submit complaints, stay updated with
                announcements and never miss Lost &
                Found updates—all in one place.
            </p>

            <button
                className="hero-btn"
                onClick={() =>
                    navigate("/student/complaints/category")
                }
            >
                Submit Complaint
            </button>

        </div>

        <div className="hero-icon">

            🎓

        </div>

    </div>

</section>
            </div>

        </div>

    );

}

export default StudentDashboard; 