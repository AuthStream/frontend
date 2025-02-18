import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";

interface Application {
  id: string;
  name: string;
  provider: string;
  token: string;
}

interface Provider {
  id: string;
  name: string;
}

interface CreateApplicationProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (application: Application) => void;
}

const mockProviders: Provider[] = [
  { id: "aws", name: "AWS" },
  { id: "azure", name: "Azure" },
  { id: "gcp", name: "Google Cloud" },
  { id: "digitalocean", name: "DigitalOcean" },
];

const CreateApplication = ({
  isOpen,
  onClose,
  onCreate,
}: CreateApplicationProps) => {
  const [newApplication, setNewApplication] = useState<Application>({
    id: "",
    name: "",
    provider: "",
    token: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewApplication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    onCreate(newApplication);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Application</DialogTitle>
          <DialogDescription>
            Enter the details of the new application.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="id"
            value={newApplication.id}
            onChange={handleChange}
            placeholder="Application ID"
          />
          <Input
            name="name"
            value={newApplication.name}
            onChange={handleChange}
            placeholder="Application Name"
          />
          <select
            name="provider"
            value={newApplication.provider}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-600 text-sm"
          >
            <option value="">Select Provider</option>
            {mockProviders.map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </select>
          <Input
            name="token"
            value={newApplication.token}
            onChange={handleChange}
            placeholder="Application Token"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleCreate}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateApplication;
