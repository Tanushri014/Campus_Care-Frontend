import { NavLink } from "react-router-dom";

import {
    FiHome,
    FiFileText,
    FiBell,
    FiUser
} from "react-icons/fi";

import "./MainAdminBottomNav.css";

function MainAdminBottomNav() {

    return (

        <nav className="main-admin-bottom-nav">

            <NavLink
                to="/main-admin/dashboard"
                end
                className={({ isActive }) =>
                    isActive ? "active" : ""
                }
            >

                <FiHome />

                <span>

                    Home

                </span>

            </NavLink>

            <NavLink
                to="/main-admin/complaints"
                className={({ isActive }) =>
                    isActive ? "active" : ""
                }
            >

                <FiFileText />

                <span>

                    Complaints

                </span>

            </NavLink>

            <NavLink
                to="/main-admin/announcements"
                className={({ isActive }) =>
                    isActive ? "active" : ""
                }
            >

                <FiBell />

                <span>

                    Announcements

                </span>

            </NavLink>

            <NavLink
                to="/main-admin/profile"
                className={({ isActive }) =>
                    isActive ? "active" : ""
                }
            >

                <FiUser />

                <span>

                    Profile

                </span>

            </NavLink>

        </nav>

    );

}

export default MainAdminBottomNav;