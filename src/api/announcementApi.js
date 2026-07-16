import api from "./axios";

export const createAnnouncement = (formData) =>
    api.post(
        "/admin/announcements",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

export const deleteAnnouncement = (id) =>
    api.delete(`/admin/announcements/${id}`);


export const getAnnouncements = (page = 0, size = 10) =>
    api.get(`/announcements?page=${page}&size=${size}`);

export const downloadAnnouncement = (id) =>
    api.get(`/announcements/${id}/download`);