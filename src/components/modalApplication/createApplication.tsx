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

interface CreateApplicationProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (application: Application) => void;
}

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewApplication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetApplication = () => {
    setNewApplication({
      id: "",
      name: "",
      provider: "",
      token: "",
    })
  }

  const handleCreate = () => {
    onCreate(newApplication);
    resetApplication();
    onClose();
  };

  const handleClose = () => {
    resetApplication();
    onClose();
  }

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
          <Input
            name="provider"
            value={newApplication.provider}
            onChange={handleChange}
            placeholder="Application Provider"
          />
          <Input
            name="token"
            value={newApplication.token}
            onChange={handleChange}
            placeholder="Application Token"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
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
