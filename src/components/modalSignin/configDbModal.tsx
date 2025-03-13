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

interface ConfigDBModalProps {
  onCreate: () => void;

  onClose: () => void;
}

const ConfigDBModal = ({ onCreate, onClose }: ConfigDBModalProps) => {
  const [dbConfig, setDbConfig] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDbConfig({ ...dbConfig, [e.target.name]: e.target.value });
  };

  const handleSaveConfig = () => {
    const { host, port, username, password } = dbConfig;

    if (!host || !port || !username || !password) {
      toast.warning("All fields are required.");
      return;
    }

    toast.success("Database configured successfully!");
    onCreate();
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
            name="host"
            value={dbConfig.host}
            onChange={handleChange}
            placeholder="Database Host"
          />
          <Input
            name="port"
            value={dbConfig.port}
            onChange={handleChange}
            placeholder="Port"
          />
          <Input
            name="username"
            value={dbConfig.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <Input
            name="password"
            type="password"
            value={dbConfig.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={handleSaveConfig}
          >
            Save Config
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigDBModal;
