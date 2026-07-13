import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthSuccess() {

    const navigate = useNavigate();

    useEffect(() => {

        navigate("/student/dashboard");

    }, [navigate]);

    return <p>Signing you in...</p>;
}

export default OAuthSuccess;