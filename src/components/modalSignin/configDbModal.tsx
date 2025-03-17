import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import { DbConfig } from "../../api/type";

interface ConfigDBModalProps {
  onCreate: (dbConfig: DbConfig) => void;
  onCheck: (dbConfig: DbConfig) => void;
  onClose: () => void;
  isConnectionChecked: boolean;
}

const ConfigDBModal = ({
  onCreate,
  onCheck,
  onClose,
  isConnectionChecked,
}: ConfigDBModalProps) => {
  const [dbConfig, setDbConfig] = useState<DbConfig>({
    id: "",
    username: "",
    password: "",
    uri: "",
    databaseUsername: "",
    databasePassword: "",
    port: 0,
    connectionString: "",
    databaseType: "POSTGRESQL",
    sslMode: "DISABLE",
    tableIncludeList: [],
    schemaIncludeList: [],
    collectionIncludeList: [],
    createdAt: "",
    updatedAt: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setDbConfig({ ...dbConfig, [e.target.name]: e.target.value });
  };

  const handleCheck = () => {
    if (
      !dbConfig.uri ||
      !dbConfig.databaseUsername ||
      !dbConfig.databasePassword ||
      !dbConfig.port
    ) {
      toast.warning("All fields are required.");
      return;
    }
    onCheck(dbConfig);
  };

  const handleSubmitConfig = () => {
    if (
      !dbConfig.uri ||
      !dbConfig.databaseUsername ||
      !dbConfig.databasePassword ||
      !dbConfig.port
    ) {
      toast.warning("All fields are required.");
      return;
    }
    onCreate(dbConfig);
    onClose();
  };
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configure Database</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="uri"
            value={dbConfig.uri}
            onChange={handleChange}
            placeholder="Database URI"
          />
          <Input
            name="databaseUsername"
            value={dbConfig.databaseUsername}
            onChange={handleChange}
            placeholder="Username"
          />
          <Input
            name="databasePassword"
            type="password"
            value={dbConfig.databasePassword}
            onChange={handleChange}
            placeholder="Password"
          />
          <Input
            name="port"
            type="number"
            value={dbConfig.port}
            onChange={handleChange}
            placeholder="Port"
          />
          <Input
            name="connectionString"
            value={dbConfig.connectionString}
            onChange={handleChange}
            placeholder="Connection String"
          />
          <select
            name="databaseType"
            value={dbConfig.databaseType}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-600 text-sm"
          >
            <option value="POSTGRESQL">PostgreSQL</option>
            <option value="MYSQL">MySQL</option>
            <option value="MONGODB">MongoDB</option>
          </select>
          <select
            name="sslMode"
            value={dbConfig.sslMode}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-600 text-sm"
          >
            <option value="DISABLE">Disable</option>
            <option value="REQUIRED">Require</option>
          </select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={handleCheck}
          >
            Check Connection
          </Button>
          <Button
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={handleSubmitConfig}
            disabled={!isConnectionChecked}
          >
            Save Config
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigDBModal;
