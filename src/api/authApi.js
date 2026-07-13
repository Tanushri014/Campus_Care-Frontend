import api from "./axios";

/* ===========================
   STUDENT AUTH
=========================== */

export const registerStudent = (data) =>
    api.post("/auth/register", data);

export const verifyOtp = (data) =>
    api.post("/auth/verify-otp", data);

export const verifyCollegeId = (data) =>
    api.post("/auth/verify-college-id", data);

export const studentLogin = (data) =>
    api.post("/auth/login", data);

/* ===========================
   ADMIN AUTH
=========================== */

export const adminLogin = (data) =>
    api.post("/admin/login", data);


export const resendOtp = (data) =>
    api.post("/auth/resend-otp", data);

export const forgotPassword = async (studentEmail) => {
    return api.post("/auth/forgot-password", {
        studentEmail,
    });
};

export const verifyForgotPasswordOtp = async (studentEmail, otp) => {
    return api.post("/auth/verify-forgot-password-otp", {
        studentEmail,
        otp,
    });
};

export const resetPassword = async (
    studentEmail,
    newPassword,
    confirmPassword
) => {
    return api.post("/auth/reset-password", {
        studentEmail,
        newPassword,
        confirmPassword,
    });
};

export const getStudentProfile = () => {

    return api.get("/student/me");

};

export const getAdminProfile = () => {

    return api.get("/admin/me");

};

export const logout = () => {

    return api.post("/auth/logout");

};