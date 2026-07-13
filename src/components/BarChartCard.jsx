import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

function BarChartCard({ data }) {

    return (

        <>

            <h3 className="chart-title">
                Complaint Status Overview
            </h3>

            <ResponsiveContainer
                width="100%"
                height={340}
            >

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="name"
                    />

                    <YAxis
                        allowDecimals={false}
                    />

                    <Tooltip />

                    <Legend />

                    <Bar
                        dataKey="count"
                        fill="#2563EB"
                        radius={[8, 8, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </>

    );

}

export default BarChartCard;