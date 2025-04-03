import { Shield } from "lucide-react";
import TableToken from "../components/tableToken";
import { ToggleButton } from "../context/SidebarContext";
import LoadingBar from "../components/LoadingBar";
import { useState } from "react";

const Token = () => {
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
                <Shield className="w-6 h-6 mr-2 text-gray-600 dark:text-gray-400" />
                Token
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Tokens are used throughout AuthStream for Email validation,
                Recovery keys, and API access.
              </p>
            </div>
          </div>
        </div>
        <TableToken onLoadingChange={handleLoadingChange} />
      </div>
    </div>
  );
};

export default Token;
