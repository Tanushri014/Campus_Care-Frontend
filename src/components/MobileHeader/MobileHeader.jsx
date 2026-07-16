import "./MobileHeader.css";

import { FiBell } from "react-icons/fi";

function MobileHeader() {

    return (

        <header className="mobile-header-bar">

            <div>

                <h2>CampusCare</h2>

                <span>Stay Connected</span>

            </div>

            <button className="notification-btn">

                <FiBell />

            </button>

        </header>

    );

}

export default MobileHeader;