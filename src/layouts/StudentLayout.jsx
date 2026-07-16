import { Outlet } from "react-router-dom";

import StudentBottomNav from "../components/StudentBottomNav/StudentBottomNav";
import MobileHeader from "../components/MobileHeader/MobileHeader";

function StudentLayout() {

    return (

        <>

            <MobileHeader />

            <Outlet />

            <StudentBottomNav />

        </>

    );

}

export default StudentLayout;