import "./Profile.css";

function Profile({
    user = {},
    role = "student",
    layout = "dashboard",
    showStats = false,
    handleLogout,
}) {
    return (
        <section
            className={`student-profile ${
                layout === "profile" ? "profile-page-layout" : ""
            }`}
        >
            {layout === "profile" ? (
                <div className="profile-mobile-card">
                    <div className="profile-avatar">
                        {user.firstName?.charAt(0) || "S"}
                    </div>

                    <h2 className="profile-mobile-name">
                        {user.firstName} {user.lastName}
                    </h2>

                    <div className="profile-detail-card">
                        <span className="detail-label">Email</span>
                        <span className="detail-value">{user.email}</span>
                    </div>

                    <div className="profile-detail-card">
                        <span className="detail-label">College ID</span>
                        <span className="detail-value">{user.collegeId}</span>
                    </div>

                    {user.emailVerified && (
                        <div className="profile-detail-card">
                            <span className="detail-label">Email Status</span>
                            <span className="verified">
                                ✓ Email Verified
                            </span>
                        </div>
                    )}

                    {user.collegeVerified && (
                        <div className="profile-detail-card">
                            <span className="detail-label">
                                College Status
                            </span>
                            <span className="verified">
                                ✓ College Verified
                            </span>
                        </div>
                    )}

                    <button
                        className="logout-btn profile-mobile-logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <>
                    <div className="profile-left">
                        <div className="profile-avatar">
                            {user.firstName?.charAt(0) || "S"}
                        </div>

                        <div className="profile-info">
                            <h2>
                                Welcome back,{" "}
                                {user.firstName || "Student"} 👋
                            </h2>

                            <h3>
                                {user.firstName} {user.lastName}
                            </h3>

                            <p>{user.email}</p>

                            {role === "student" && (
                                <>
                                    <p>College ID : {user.collegeId}</p>

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
                </>
            )}
        </section>
    );
}

export default Profile;