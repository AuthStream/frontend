import QuickAccess from "../components/quickAccess";
import StatsCard from "../components/statCards";
import TableProviderDashboard from "../components/tableProviderDashboard";
import { ToggleButton } from "../context/SidebarContext";
import { useGetProviders } from "../hooks/useProviderQueries";

const Dashboard = () => {
  const { data: providers, isLoading, error } = useGetProviders();

  return (
    <div className="h-full w-full flex items-center justify-center dark:bg-gray-950 p-6">
      <div className="w-full h-auto bg-gray-200 dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          <div className="flex items-center justify-between gap-x-4">
            <ToggleButton />
            <div className="flex flex-col max-w-lg">
              <h2 className="text-2xl font-bold flex items-center text-gray-800 dark:text-white">
                Welcome, AuthStream
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <QuickAccess />
          </div>

          <div className="w-full md:w-2/3">
            <div className="h-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatsCard title="Provider" count={3} color="border-blue-500" />
              <StatsCard title="Message" count={7} color="border-green-500" />
              <StatsCard title="User" count={5} color="border-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
            Providers
          </h3>
          {isLoading ? (
            <p className="text-center text-gray-600 dark:text-gray-400">
              Loading providers...
            </p>
          ) : error ? (
            <p className="text-center text-red-500">
              {error instanceof Error
                ? error.message
                : "An unknown error occurred"}
            </p>
          ) : providers ? (
            <TableProviderDashboard providers={providers.contents} />
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">
              No providers available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
