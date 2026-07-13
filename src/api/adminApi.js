import axiosInstance from "./axios";

/* ========================================
   ADMIN LOGIN
======================================== */

export const adminLogin = (loginData) =>
    axiosInstance.post("/admin/login", loginData);

/* ========================================
   PROFILE
======================================== */

export const getCurrentAdmin = () =>
    axiosInstance.get("/admin/me");

/* ========================================
   COMPLAINTS
======================================== */

// Paginated complaints (used in Complaint List)
export const getAdminComplaints = (page = 0, size = 6) => {
    return axiosInstance.get(
        `/admin/complaints?page=${page}&size=${size}`
    );
};

// All complaints (used for Dashboard stats)

export const getAdminComplaintById = (id) =>
    axiosInstance.get(`/admin/complaints/${id}`);

export const updateComplaintStatus = (id, data) =>
    axiosInstance.put(`/admin/complaints/${id}/status`, data);

export const getComplaintFeedback = (id) =>
    axiosInstance.get(`/admin/complaints/${id}/feedback`);