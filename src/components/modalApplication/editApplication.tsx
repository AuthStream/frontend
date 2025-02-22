import { useState, useEffect } from "react";
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

const mockProviders: Provider[] = [
  { id: "aws", name: "AWS" },
  { id: "azure", name: "Azure" },
  { id: "gcp", name: "Google Cloud" },
  { id: "digitalocean", name: "DigitalOcean" },
];

interface EditApplicationProps {
  isOpen: boolean;
  onClose: () => void;
  applicationToEdit: Application | null;
  onEdit: (updatedApplication: Application) => void;
}

const EditApplication = ({
  isOpen,
  onClose,
  applicationToEdit,
  onEdit,
}: EditApplicationProps) => {
  const [editedApplication, setEditedApplication] =
    useState<Application | null>(null);

  useEffect(() => {
    if (applicationToEdit) {
      setEditedApplication(applicationToEdit);
    }
  }, [applicationToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (editedApplication) {
      setEditedApplication((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };

  const handleEdit = () => {
    if (editedApplication) {
      onEdit(editedApplication);
      onClose();
    }
  };

  if (!editedApplication) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Application</DialogTitle>
          <DialogDescription>
            Update the details of the application.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="name"
            value={editedApplication.name}
            onChange={handleChange}
            placeholder="Application Name"
          />
          <select
            name="provider"
            value={editedApplication.provider}
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
            value={editedApplication.token}
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
            onClick={handleEdit}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditApplication;
