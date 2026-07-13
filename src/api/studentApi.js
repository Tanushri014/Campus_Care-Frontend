import api from "./axios";

/* ===========================
   STUDENT PROFILE
=========================== */

export const getStudentProfile = () =>
    api.get("/student/me");

/* ===========================
   COMPLAINTS
=========================== */

export const getMyComplaints = (page = 0, size = 6) => {
    return api.get(
        `/student/complaints?page=${page}&size=${size}`
    );
};

export const getComplaintById = (id) =>
    api.get(`/student/complaints/${id}`);

/* ===========================
   CREATE COMPLAINT
=========================== */

export const createComplaint = (formData) =>
    api.post(
        "/student/complaints",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

/* ===========================
   UPDATE COMPLAINT
=========================== */

export const updateComplaint = (id, data) =>
    api.put(`/student/complaints/${id}`, data);

/* ===========================
   DELETE COMPLAINT
=========================== */

export const deleteComplaint = (id) =>
    api.delete(`/student/complaints/${id}`);

/* ===========================
   FEEDBACK
=========================== */

export const submitFeedback = (id, data) =>
    api.post(`/student/complaints/${id}/feedback`, data);

/* ===========================
   HISTORY
=========================== */

export const getComplaintHistory = (id) =>
    api.get(`/student/complaints/${id}/history`);