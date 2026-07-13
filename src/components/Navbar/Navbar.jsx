import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="navbar">

            <div className="navbar-container">

                <div className="logo">
                    <h2>CampusCare</h2>
                </div>

                <nav className={`nav-links ${menuOpen ? "active" : ""}`}>

                    <a href="#about" onClick={() => setMenuOpen(false)}>About</a>

                    <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>

                    <a href="#footer" onClick={() => setMenuOpen(false)}>Contact</a>

                    <div className="mobile-buttons">

                        <Link to="/login">
                            <button className="login-btn">
                                Log In
                            </button>
                        </Link>

                        <Link to="/register">
                            <button className="register-btn">
                                Register
                            </button>
                        </Link>

                    </div>

                </nav>

                <div className="nav-buttons">

                    <Link to="/login">
                        <button className="login-btn">
                            Log In
                        </button>
                    </Link>

                    <Link to="/register">
                        <button className="register-btn">
                            Register
                        </button>
                    </Link>

                </div>

                <button
                    className="menu-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>

            </div>

        </header>
    );
}

export default Navbar;