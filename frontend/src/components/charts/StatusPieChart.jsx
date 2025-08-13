import { Cell, Legend, Pie, PieChart, Tooltip, ResponsiveContainer } from 'recharts';

const STATUS_COLORS = {
  completed: '#22C55E',     
  'in-progress': '#9C27B0', 
  pending: '#F44336',       
  total: '#3B82F6'          
};


const StatusPieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-sm">No chart data available</p>;
  }

  const formattedData = data.map(item => ({
    name: item._id,
    value: item.count
  }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {formattedData.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={STATUS_COLORS[entry.name] || '#D1D5DB'} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusPieChart;
