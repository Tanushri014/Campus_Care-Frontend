import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    getStudentProfile,
    getAdminProfile
} from "../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadUser = async () => {

            try {

                const response =
                    await getStudentProfile();

                setUser({

                    ...response.data,

                    role: "STUDENT"

                });

            }

            catch {

                try {

                    const response =
                        await getAdminProfile();

                    setUser({

                        ...response.data,

                        role: "ADMIN"

                    });

                }

                catch {

                    setUser(null);

                }

            }

            finally {

                setLoading(false);

            }

        };

        loadUser();

    }, []);

    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}