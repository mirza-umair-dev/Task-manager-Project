import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const DailyBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-sm">No bar chart data available</p>;
  }

  const formattedData = data.map(item => ({
    date: item._id,
    tasks: item.count,
  }));

  return (
    <div className="w-full h-[300px] lg:h-[400px] mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="tasks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyBarChart;
