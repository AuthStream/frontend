import { useState, useEffect } from "react";
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

  const [errors, setErrors] = useState<Partial<Record<keyof DbConfig, string>>>(
    {}
  );
  const [isFormValid, setIsFormValid] = useState(false);

  const validateUri = (uri: string): string | null => {
    if (!uri) return "Database URI is required.";
    const uriRegex = /^(?:[a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+(\/[a-zA-Z0-9-]+)*$/;
    if (!uriRegex.test(uri))
      return "Invalid URI format (e.g., localhost or example.com/db).";
    return null;
  };

  const validateUsername = (username: string): string | null => {
    if (!username) return "Username is required.";
    const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    if (!usernameRegex.test(username))
      return "Username can only contain letters, numbers, underscores, dots, or hyphens.";
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (!password) return "Password is required.";
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password))
      return "Password must have at least 8 characters, including uppercase, lowercase, number, and special character.";
    return null;
  };

  const validatePort = (port: number): string | null => {
    if (!port) return "Port is required.";
    if (isNaN(port) || port < 1 || port > 65535)
      return "Port must be a number between 1 and 65535.";
    return null;
  };

  const validateDatabaseType = (type: string): string | null => {
    const validTypes = ["POSTGRESQL", "MYSQL", "MONGODB"];
    if (!validTypes.includes(type)) return "Invalid database type.";
    return null;
  };

  const validateSslMode = (mode: string): string | null => {
    const validModes = ["DISABLE", "REQUIRED"];
    if (!validModes.includes(mode)) return "Invalid SSL mode.";
    return null;
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof DbConfig, string>> = {};

    const uriError = validateUri(dbConfig.uri);
    if (uriError) newErrors.uri = uriError;

    const usernameError = validateUsername(dbConfig.databaseUsername);
    if (usernameError) newErrors.databaseUsername = usernameError;

    const passwordError = validatePassword(dbConfig.databasePassword);
    if (passwordError) newErrors.databasePassword = passwordError;

    const portError = validatePort(dbConfig.port);
    if (portError) newErrors.port = portError;

    const dbTypeError = validateDatabaseType(dbConfig.databaseType);
    if (dbTypeError) newErrors.databaseType = dbTypeError;

    const sslModeError = validateSslMode(dbConfig.sslMode);
    if (sslModeError) newErrors.sslMode = sslModeError;

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [dbConfig]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newValue = name === "port" ? parseInt(value) || 0 : value;
    setDbConfig({ ...dbConfig, [name]: newValue });
  };

  const handleCheck = () => {
    if (!isFormValid) {
      toast.warning("Please fix the errors in the form.");
      return;
    }
    onCheck(dbConfig);
  };

  const handleSubmitConfig = () => {
    if (!isFormValid) {
      toast.warning("Please fix the errors in the form.");
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
          <div>
            <Input
              name="uri"
              value={dbConfig.uri}
              onChange={handleChange}
              placeholder="Database URI"
              className={errors.uri ? "border-red-500" : ""}
            />
            {errors.uri && (
              <p className="text-red-500 text-sm mt-1">{errors.uri}</p>
            )}
          </div>

          <div>
            <Input
              name="databaseUsername"
              value={dbConfig.databaseUsername}
              onChange={handleChange}
              placeholder="Username"
              className={errors.databaseUsername ? "border-red-500" : ""}
            />
            {errors.databaseUsername && (
              <p className="text-red-500 text-sm mt-1">
                {errors.databaseUsername}
              </p>
            )}
          </div>

          <div>
            <Input
              name="databasePassword"
              type="password"
              value={dbConfig.databasePassword}
              onChange={handleChange}
              placeholder="Password"
              className={errors.databasePassword ? "border-red-500" : ""}
            />
            {errors.databasePassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.databasePassword}
              </p>
            )}
          </div>

          <div>
            <Input
              name="port"
              type="number"
              value={dbConfig.port === 0 ? "" : dbConfig.port}
              onChange={handleChange}
              placeholder="Port"
              className={errors.port ? "border-red-500" : ""}
            />
            {errors.port && (
              <p className="text-red-500 text-sm mt-1">{errors.port}</p>
            )}
          </div>

          <div>
            <Input
              name="connectionString"
              value={dbConfig.connectionString}
              onChange={handleChange}
              placeholder="Connection String (optional)"
              className={errors.connectionString ? "border-red-500" : ""}
            />
            {errors.connectionString && (
              <p className="text-red-500 text-sm mt-1">
                {errors.connectionString}
              </p>
            )}
          </div>

          <div>
            <select
              name="databaseType"
              value={dbConfig.databaseType}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-600 text-sm ${
                errors.databaseType ? "border-red-500" : ""
              }`}
            >
              <option value="POSTGRESQL">PostgreSQL</option>
              <option value="MYSQL">MySQL</option>
              <option value="MONGODB">MongoDB</option>
            </select>
            {errors.databaseType && (
              <p className="text-red-500 text-sm mt-1">{errors.databaseType}</p>
            )}
          </div>

          <div>
            <select
              name="sslMode"
              value={dbConfig.sslMode}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-600 text-sm ${
                errors.sslMode ? "border-red-500" : ""
              }`}
            >
              <option value="DISABLE">Disable</option>
              <option value="REQUIRED">Require</option>
            </select>
            {errors.sslMode && (
              <p className="text-red-500 text-sm mt-1">{errors.sslMode}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={handleCheck}
            disabled={!isFormValid}
          >
            Check Connection
          </Button>
          <Button
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={handleSubmitConfig}
            disabled={!isFormValid || !isConnectionChecked}
          >
            Save Config
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigDBModal;
