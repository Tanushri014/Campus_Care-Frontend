import "./About.css";

function About() {
    return (
        <section className="about" id="about">

            <div className="about-content">

                <span className="about-tag">
                    About CampusCare
                </span>

                <h2>
                    Transforming Campus Communication Through
                    <span> Digital Innovation</span>
                </h2>

                <p>
                    CampusCare is a centralized complaint management system
                    designed to simplify communication between students and
                    administrators. Instead of relying on traditional paper-based
                    complaints or unorganized communication channels, students
                    can report issues digitally and monitor their progress in
                    real time.
                </p>

                <p>
                    The platform also keeps the campus informed through instant
                    announcements, a Lost & Found system, and timely complaint
                    updates—creating a transparent, efficient, and connected
                    campus experience for everyone.
                </p>

            </div>

            <div className="about-cards">

                <div className="info-card">
                    <h3>🎯 Our Goal</h3>
                    <p>
                        Provide a centralized platform where every student issue
                        is addressed quickly, fairly, and transparently.
                    </p>
                </div>

                <div className="info-card">
                    <h3>🚀 Our Vision</h3>
                    <p>
                        Build a smarter campus where communication is digital,
                        efficient, and accessible to every student and
                        administrator.
                    </p>
                </div>

            </div>

        </section>
    );
}

export default About;