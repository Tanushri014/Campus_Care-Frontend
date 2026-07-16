import "./Profile.css";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { logout } from "../../api/authApi";

function Profile({ user, role }) {

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

        <section className="student-profile">

            {/* ================= STUDENT ================= */}

            {role === "student" ? (

                <div className="student-profile-card">

                    <div className="profile-avatar">

                        {user.firstName?.charAt(0) || "S"}

                    </div>

                    <h2>

                        {user.firstName} {user.lastName}

                    </h2>

                    <p className="profile-email">

                        {user.email}

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

                    <div className="profile-details">

                        <div className="detail-card">

                            <span>Name</span>

                            <strong>

                                {user.firstName} {user.lastName}

                            </strong>

                        </div>

                        <div className="detail-card">

                            <span>College ID</span>

                            <strong>

                                {user.collegeId}

                            </strong>

                        </div>

                        <div className="detail-card">

                            <span>Email</span>

                            <strong>

                                {user.email}

                            </strong>

                        </div>

                    </div>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            ) : (

                /* ================= ADMIN ================= */

                <>

                    <div className="profile-left">

                        <div className="profile-avatar">

                            {user.firstName?.charAt(0) || "A"}

                        </div>

                        <div className="profile-info">

                            <h2>

                                Welcome back, {user.firstName} 👋

                            </h2>

                            <h3>

                                {user.firstName} {user.lastName}

                            </h3>

                            <p>{user.email}</p>

                            <p>

                                Department : {user.department}

                            </p>

                        </div>

                    </div>

                    <div className="profile-right">

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

                        <div className="logout-wrapper">

                            <button
                                className="logout-btn"
                                onClick={handleLogout}
                            >

                                Logout

                            </button>

                        </div>

                    </div>

                </>

            )}

        </section>

    );

}

export default Profile;