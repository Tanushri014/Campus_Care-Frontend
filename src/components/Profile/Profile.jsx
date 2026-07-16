import "./Profile.css";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { logout } from "../../api/authApi";

function Profile({
    user,
    role,
    showStats = true,
    layout = "dashboard"
}) {

    const navigate = useNavigate();

    const { setUser } = useAuth();

    const handleLogout = async () => {

        try {

            await logout();

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setUser(null);

            navigate("/login");

        }

    };

    return (

        <section
            className={`student-profile ${layout === "profile" ? "profile-page-layout" : ""}`}
        >

            <div className="profile-left">

                <div className="profile-avatar">
                    {user.firstName?.charAt(0) || "S"}
                </div>

                <div className="profile-info">

                    {layout === "dashboard" && (
                        <h2>
                            Welcome back, {user.firstName || "Student"} 👋
                        </h2>
                    )}

                    <h3>
                        {user.firstName} {user.lastName}
                    </h3>

                    <p>{user.email}</p>

                    {role === "student" && (
                        <>

                            <p>
                                College ID : {user.collegeId}
                            </p>

                            <div className="verification">

                                {user.emailVerified && (
                                    <span className="verified">
                                        ✓ Email Verified
                                    </span>
                                )}

                                {user.collegeVerified && (
                                    <span className="verified">
                                        ✓ College Verified
                                    </span>
                                )}

                            </div>

                        </>
                    )}

                    {role === "admin" && (

                        <p>
                            Department : {user.department}
                        </p>

                    )}

                </div>

            </div>

            <div className="profile-right">

                {showStats && (

                    <div className="stats-grid">

                        <div className="stat-card">

                            <h3>{user.stats?.total ?? 0}</h3>

                            <p>Complaints</p>

                        </div>

                        <div className="stat-card">

                            <h3>{user.stats?.resolved ?? 0}</h3>

                            <p>Resolved</p>

                        </div>

                        <div className="stat-card">

                            <h3>{user.stats?.pending ?? 0}</h3>

                            <p>Pending</p>

                        </div>

                    </div>

                )}

                <div className="logout-wrapper">

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </section>

    );

}

export default Profile;