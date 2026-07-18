import "./Hero.css";
import { Link } from "react-router-dom";
function Hero() {
    return (
        <section className="hero">

            <div className="hero-content">

                <span className="hero-badge">
                    Digital Campus Management System
                </span>

                <h1>
                    Making SBPCOE Campus 
                    <span> Simple, Transparent & Digital.</span>
                </h1>

                <p>
                    CampusCare is a centralized platform that empowers students
                    to report complaints, track their progress, receive important
                    announcements, and stay connected with their institution—
                    all in one place.
                </p>

                <div className="hero-buttons">
                  <Link to="/register">
        <button className="primary-btn">
            Get Started
        </button>
    </Link>

    <Link to="/login">
        <button className="secondary-btn">
            I Already Have an Account
        </button>
    </Link>
                </div>

            </div>

            <div className="hero-image">

                <div className="image-card">

                    <h3>Complaint Status</h3>

                    <div className="status submitted">
                        Complaint Submitted
                    </div>

                    <div className="status review">
                        Under Review
                    </div>

                    <div className="status progress">
                        In Progress
                    </div>

                    <div className="status resolved">
                        Resolved
                    </div>

                </div>

            </div>

        </section>
    );
}

export default Hero;