import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StudentProfile from "../StudentProfile/StudentProfile";
import ComplaintPreview from "../../components/Complaint/ComplaintPreview/ComplaintPreview";
import AnnouncementPreview from "../../components/Announcement/AnnouncementPreview";
import LostFoundPreview from "../LostFound/LostFoundPreview";

import {
    getMyComplaints,
    getStudentProfile
} from "../../api/studentApi";

import "./StudentDashboard.css";

function StudentDashboard() {

    const navigate = useNavigate();

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

            {/* ================= DESKTOP ================= */}

            <div className="desktop-dashboard">

                <StudentProfile stats={stats} />

                <ComplaintPreview />

                <AnnouncementPreview
                    onViewAll={() =>
                        navigate("/student/announcements")
                    }
                />

                <LostFoundPreview />

            </div>

            {/* ================= MOBILE ================= */}

            <div className="mobile-dashboard">

                <section className="mobile-profile-card">

                    <img
                        src={
                            student?.profileImage ||
                            "/default-avatar.png"
                        }
                        alt="Profile"
                        className="mobile-profile-image"
                    />

                    <h2>

                        {student?.firstName}{" "}
                        {student?.lastName}

                    </h2>

                    <p className="mobile-email">

                        {student?.email}

                    </p>

                    <div className="verification-stack">

                        <div className="verify-row">

                            ✅ Email Verified

                        </div>

                        <div className="verify-row">

                            ✅ College Verified

                        </div>

                    </div>

                    <div className="info-stack">

                        <div className="info-item">

                            <span>College ID</span>

                            <strong>

                                {student?.collegeId}

                            </strong>

                        </div>

                        <div className="info-item">

                            <span>Email</span>

                            <strong>

                                {student?.email}

                            </strong>

                        </div>

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

                                Submit complaints, stay updated
                                with announcements and never
                                miss Lost & Found updates—all
                                in one place.

                            </p>

                            <button
                                className="hero-btn"
                                onClick={() =>
                                    navigate("/student/complaints/new")
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

                <AnnouncementPreview
                    onViewAll={() =>
                        navigate("/student/announcements")
                    }
                />

                <ComplaintPreview />

                <LostFoundPreview />

            </div>

        </div>

    );

}

export default StudentDashboard;