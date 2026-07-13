import { useEffect, useState } from "react";
import { getAdminComplaints } from "../api/adminApi";

import PieChartCard from "./PieChartCard";
import BarChartCard from "./BarChartCard";

import "./AdminCharts.css";

function AdminCharts() {

    const [categoryData, setCategoryData] = useState([]);
    const [statusData, setStatusData] = useState([]);

    useEffect(() => {
        fetchChartData();
    }, []);

    const fetchChartData = async () => {

        try {

            const response = await getAdminComplaints(0, 1000);

            const complaints = response.data.content || [];

            prepareCategoryChart(complaints);
            prepareStatusChart(complaints);

        } catch (error) {

            console.error("Failed to fetch chart data", error);

        }

    };

    const prepareCategoryChart = (complaints) => {

        const categoryCounts = {
            HOSTEL: 0,
            MESS: 0,
            BUS: 0,
            CAMPUS: 0,
            ACADEMICS: 0
        };

        complaints.forEach((complaint) => {
            categoryCounts[complaint.complaintCategory]++;
        });

        setCategoryData(
            Object.entries(categoryCounts).map(([name, value]) => ({
                name,
                value
            }))
        );

    };

    const prepareStatusChart = (complaints) => {

        const statusCounts = {
            PENDING: 0,
            IN_PROGRESS: 0,
            COMPLETED: 0
        };

        complaints.forEach((complaint) => {
            statusCounts[complaint.status]++;
        });

        setStatusData(
            Object.entries(statusCounts).map(([name, count]) => ({
                name,
                count
            }))
        );

    };

    return (

        <section className="admin-charts">

            <div className="chart-card">
                <PieChartCard data={categoryData} />
            </div>

            <div className="chart-card">
                <BarChartCard data={statusData} />
            </div>

        </section>

    );

}

export default AdminCharts;