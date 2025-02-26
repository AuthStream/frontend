import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const EventTypeChart = () => {
  const data = [
    { name: "Error", value: 30, color: "#FF6384" },
    { name: "Warning", value: 45, color: "#FFCE56" },
    { name: "Info", value: 50, color: "#36A2EB" },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export { EventTypeChart };
