import { useEffect, useState } from "react";

import Profile from "../../components/Profile/Profile";
import { getStudentProfile } from "../../api/studentApi";

function StudentProfile({
    stats,
    showStats = true,
    layout = "dashboard",handleLogout,
}) {

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const { data } = await getStudentProfile();

            setStudent(data);

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

    if (loading) return <p>Loading profile...</p>;

    if (error) return <p>{error}</p>;

    if (!student) return null;

    return (

        <Profile

            user={{

                firstName: student.firstName,
                lastName: student.lastName,
                email: student.studentEmail,
                collegeId: student.collegeId,
                emailVerified: student.emailVerified,
                collegeVerified: student.collegeVerified,
                stats

            }}

            role="student"
            showStats={showStats}
            layout={layout}
            handleLogout={handleLogout}

        />

    );

}

export default StudentProfile;