import "./Features.css";

function Features() {
    return (
        <section className="features" id="features">

            <div className="features-heading">

                <h2>Powerful Features</h2>

                <p>
                    Everything you need to make campus communication faster,
                    transparent, and completely digital.
                </p>

            </div>

            <div className="features-grid">

                <div className="feature-card">

                    <div className="feature-icon">📋</div>

                    <h3>Complaint Tracking</h3>

                    <p>
                        Submit complaints digitally and track every stage,
                        from submission to resolution, with complete transparency.
                    </p>

                </div>

                <div className="feature-card">

                    <div className="feature-icon">⚡</div>

                    <h3>Quick Response</h3>

                    <p>
                        Complaints are automatically routed to the correct
                        department, ensuring faster review and quicker action.
                    </p>

                </div>

                <div className="feature-card">

                    <div className="feature-icon">📢</div>

                    <h3>Announcements</h3>

                    <p>
                        Receive important notices, event updates, and official
                        announcements instantly from the administration.
                    </p>

                </div>

                <div className="feature-card">

                    <div className="feature-icon">🎒</div>

                    <h3>Lost & Found</h3>

                    <p>
                        Report lost belongings or found items and help reconnect
                        students with their valuables quickly and efficiently.
                    </p>

                </div>

            </div>

        </section>
    );
}

export default Features;