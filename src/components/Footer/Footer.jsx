import "./Footer.css";
import { Link } from "react-router-dom";
function Footer() {
    return (
        <footer className="footer" id="footer">

            <div className="footer-container">

                {/* Left Section */}
                <div className="footer-brand">

                    <h2>CampusCare</h2>

                    <p>
                        A centralized complaint management system designed to
                        improve communication between students and administrators
                        through a transparent, digital, and efficient platform.
                    </p>

                </div>

                {/* Quick Links */}
                <div className="footer-links">

                    <h3>Quick Links</h3>

                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#features">Features</a></li>
                        <Link to="/login">
                         <li>Login</li>
                        </Link>
                       
                    </ul>

                </div>

                {/* Features */}
                <div className="footer-features">

                    <h3>Features</h3>

                    <ul>
                        <li>Complaint Tracking</li>
                        <li>Lost & Found</li>
                        <li>Announcements</li>
                        <li>Feedback System</li>
                    </ul>

                </div>

            </div>

            <div className="footer-bottom">

                <p>
                    © 2026 CampusCare. All Rights Reserved.
                </p>

            </div>

        </footer>
    );
}

export default Footer;