import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Profile from "../../components/Profile/Profile";
import MainAdminBottomNav from "../../components/MainAdminBottomNav/MainAdminBottomNav";

import { logout } from "../../api/authApi";
import { getCurrentAdmin } from "../../api/adminApi";

import "./MainAdminProfile.css";

function MainAdminProfile() {

    const navigate = useNavigate();

    const [admin, setAdmin] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const { data } = await getCurrentAdmin();

            setAdmin(data);

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Unable to load profile."

            );

        }

        finally {

            setLoading(false);

        }

    };

    const handleLogout = async () => {

        try {

            await logout();

        }

        catch (err) {

            console.error(err);

        }

        finally {

            navigate("/login", {

                replace: true

            });

        }

    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    if (error) {

        return <h2>{error}</h2>;

    }

    return (

        <div className="main-admin-profile-page">

            <Profile

                role="admin"

                layout="profile"

                handleLogout={handleLogout}

                user={{

                    firstName: admin.firstName,

                    lastName: admin.lastName,

                    email: admin.email,

                    department: admin.category

                }}

            />

            <MainAdminBottomNav />

        </div>

    );

}

export default MainAdminProfile;