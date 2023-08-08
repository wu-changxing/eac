import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LabelList, Cell, ResponsiveContainer, Legend } from 'recharts';
import { BsRocketTakeoff } from "react-icons/bs";

const Star = (props) => <BsRocketTakeoff {...props} size={20} color="#FF59E2FF" />;

// Custom Y Axis tick
const CustomYAxisTick = ({ x, y, payload, highestUser }) => {
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666">{payload.value}</text>
            {payload.value === highestUser && <Star x={-30} y={-20} />}
        </g>
    );
};

const ScoresChart = ({ scores, stats }) => {
    // Preprocess data for chart
    const chartData = stats.map(({ item, correct, incorrect }) => ({
        item,
        correct,
        incorrect,
    }));

    // Preprocess scores for bar chart
    const scoresData = Object.entries(scores).map(([user, score]) => ({ user, score }));
    // Sort scoresData by score in descending order
    scoresData.sort((a, b) => b.score - a.score);

    const highestUser = scoresData[0].user;

    return (
        <>
            <div className="mb-8">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        layout="vertical"
                        data={scoresData}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="user" type="category" tick={<CustomYAxisTick highestUser={highestUser} />} />
                        <Tooltip />
                        <Bar dataKey="score" fill="#82ca9d">
                            <LabelList dataKey="score" position="right" />
                            {scoresData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 0 ? "#ff59e2" : "#21ace5"} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mb-8">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="item" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="correct" stackId="a" fill="#21ace5" />
                        <Bar dataKey="incorrect" stackId="a" fill="red" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default ScoresChart;
