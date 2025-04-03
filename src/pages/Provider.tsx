import { Search } from "lucide-react";
import TableProvider from "../components/tableProvider";
import { ToggleButton } from "../context/SidebarContext";
import LoadingBar from "../components/LoadingBar";
import { useState } from "react";

const Provider = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <div className="h-full w-full flex items-center justify-center dark:bg-gray-950 p-6">
      <LoadingBar isLoading={isLoading} />

      <div className="w-full h-full bg-gray-200 dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          <div className="flex items-center justify-between gap-x-4">
            <ToggleButton />
            <div className="flex flex-col max-w-lg">
              <h2 className="text-2xl font-bold flex items-center text-gray-800 dark:text-white">
                <Search className="w-6 h-6 mr-2 text-gray-600 dark:text-gray-400" />
                Provider
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Provide support for protocols like SAML and OAuth to assigned
                applications.
              </p>
            </div>
          </div>
        </div>
        <TableProvider onLoadingChange={handleLoadingChange} />
      </div>
    </div>
  );
};

export default Provider;
