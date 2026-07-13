import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({

    children,

    allowedRoles

}) {

    const {

        user,

        loading

    } = useAuth();

    // Wait until AuthContext finishes checking the cookie

    if (loading) {

        return <p>Loading...</p>;

    }

    // Not logged in

    if (!user) {

        return <Navigate to="/login" replace />;

    }

    // Logged in but wrong role

    if (!allowedRoles.includes(user.role)) {

        return <Navigate to="/" replace />;

    }

    return children;

}

export default ProtectedRoute;