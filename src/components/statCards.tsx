interface StatsCardProps {
  title: string;
  count: number;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, count, color }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
    <h3 className="text-xl font-bold mb-2 text-gray-700 dark:text-white">
      {title}
    </h3>
    <div
      className={`w-24 h-24 flex items-center justify-center rounded-full border-4 ${color}`}
    >
      <span className="text-2xl font-bold text-black dark:text-white">
        {count}
      </span>
    </div>
  </div>
);

export default StatsCard;
