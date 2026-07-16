import "./StudentBottomNav.css";

import { NavLink } from "react-router-dom";

import {
    FiHome,
    FiFileText,
    FiBell,
    FiPackage,
    FiUser
} from "react-icons/fi";

function StudentBottomNav() {

    return (

        <nav className="student-bottom-nav">

            <NavLink
                to="/student/dashboard"
                className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                }
            >
                <FiHome />
                <span>Home</span>
            </NavLink>

            <NavLink
                to="/student/complaints"
                className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                }
            >
                <FiFileText />
                <span>Complaints</span>
            </NavLink>

            <NavLink
                to="/student/announcements"
                className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                }
            >
                <FiBell />
                <span>News</span>
            </NavLink>

            <NavLink
                to="/student/lost-found"
                className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                }
            >
                <FiPackage />
                <span>Lost & Found</span>
            </NavLink>

            <NavLink
                to="/student/profile"
                className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                }
            >
                <FiUser />
                <span>Profile</span>
            </NavLink>

        </nav>

    );

}

export default StudentBottomNav;