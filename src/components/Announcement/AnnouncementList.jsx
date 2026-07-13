import { useEffect, useState } from "react";

import AnnouncementCard from "./AnnouncementCard";
import { getAnnouncements } from "../../api/announcementApi";

import "./AnnouncementList.css";

function AnnouncementList() {

    const [announcements, setAnnouncements] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {

        fetchAnnouncements(currentPage);

    }, [currentPage]);

    const fetchAnnouncements = async (page) => {

        try {

            const response = await getAnnouncements(page);

            setAnnouncements(response.data.content || []);

            setTotalPages(response.data.totalPages);

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleDownload = (announcement) => {

        if (announcement.fileUrl) {

            window.open(

                `http://localhost:8080${announcement.fileUrl}`,

                "_blank"

            );

        }

    };

    return (

        <>

            <div className="announcement-list-grid">

                {

                    announcements.length > 0 ?

                        announcements.map((announcement) => (

                            <AnnouncementCard

                                key={announcement.id}

                                announcement={announcement}

                                onDownload={() =>
                                    handleDownload(announcement)
                                }

                            />

                        ))

                        :

                        (

                            <div className="empty-announcement">

                                <h3>No Announcements</h3>

                                <p>

                                    There are no announcements available.

                                </p>

                            </div>

                        )

                }

            </div>

            {

                totalPages > 1 && (

                    <div className="pagination">

                        <button

                            disabled={currentPage === 0}

                            onClick={() =>
                                setCurrentPage(currentPage - 1)
                            }

                        >

                            Previous

                        </button>

                        {

                            [...Array(totalPages)].map((_, index) => (

                                <button

                                    key={index}

                                    className={
                                        currentPage === index
                                            ? "active-page"
                                            : ""
                                    }

                                    onClick={() =>
                                        setCurrentPage(index)
                                    }

                                >

                                    {index + 1}

                                </button>

                            ))

                        }

                        <button

                            disabled={
                                currentPage === totalPages - 1
                            }

                            onClick={() =>
                                setCurrentPage(currentPage + 1)
                            }

                        >

                            Next

                        </button>

                    </div>

                )

            }

        </>

    );

}

export default AnnouncementList;