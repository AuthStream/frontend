import { AppWindow } from "lucide-react";
import TableApplication from "../components/tableApplication.tsx";
import { ToggleButton } from "../context/SidebarContext";
import applicationService from "../api/service/applicationService.ts";
import { useEffect, useState } from "react";

interface Application {
  id: string;
  name: string;
  provider: string;
  token: string;
}

const Application = () => {
  const [applications, setApplicationss] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true);
        const response = await applicationService.getAllApplications();
        setApplicationss(response.contents);
      } catch (err) {
        setError("Failed to load tokens");
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center dark:bg-gray-950 p-6">
      <div className="w-full h-full bg-gray-200 dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          <div className="flex items-center justify-between gap-x-4">
            <ToggleButton />

            <div className="flex flex-col max-w-lg">
              <h2 className="text-2xl font-bold flex items-center text-gray-800 dark:text-white">
                <AppWindow className="w-6 h-6 mr-2 text-gray-600 dark:text-gray-400" />
                Application
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Provide support for protocols like SAML and OAuth to assigned
                applications.
              </p>
            </div>
          </div>
        </div>
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Loading tokens...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <TableApplication applications={applications} />
        )}{" "}
      </div>
    </div>
  );
};

export default Application;
