import api from "./axios";

/* ===========================
   LOST & FOUND
=========================== */

// export const getAllLostFoundItems = () =>
//     api.get("/lostfound/lost-found");


export const getAllLostFoundItems = (page = 0) => {
    return api.get(`/lostfound/lost-found?page=${page}&size=6`);
};
export const getLostFoundById = (id) =>
    api.get(`/lostfound/lost-found/${id}`);

export const createLostFound = (formData) =>
    api.post(
        "/lostfound/lost-found",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

export const deleteLostFound = (id) =>
    api.delete(`/lostfound/lost-found/${id}`);