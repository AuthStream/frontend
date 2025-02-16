import { Shield } from "lucide-react";
import TableToken from "../components/tableToken";
import { ToggleButton } from "../context/SidebarContext";
const Token = () => {
  const tokens = [
    {
      id: "ABC1",
      name: "truongkinhquinh",
      expired: "2025-12-31",
      body: "Sample body 1",
      encrypt: "tken1",
    },
    {
      id: "ABC2",
      name: "tolaokien",
      expired: "2026-06-15",
      body: "Sample body 2",
      encrypt: "tken2",
    },
    {
      id: "ABC3",
      name: "exampleuser",
      expired: "2025-09-10",
      body: "Sample body 3",
      encrypt: "tken3",
    },
    {
      id: "ABC4",
      name: "johnsmith",
      expired: "2026-01-20",
      body: "Sample body 4",
      encrypt: "tken4",
    },
    {
      id: "ABC5",
      name: "janedoe",
      expired: "2027-03-05",
      body: "Sample body 5",
      encrypt: "tken5",
    },
  ];

  return (
    <div className="h-full w-full flex items-center justify-center dark:bg-gray-950 p-6">
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
                Tokens are used throughout AuthStream for Email validation
                stages, Recovery keys and API access.
              </p>
            </div>
          </div>
        </div>

        <TableToken tokens={tokens} />
      </div>
    </div>
  );
};

export default Token;
