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
import { toast } from "react-toastify";

interface Permission {
  id: string;
  name: string;
  application: string;
  created: string;
}

interface CreatePermissionProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (permission: Permission) => void;
}

const CreatePermission = ({
  isOpen,
  onClose,
  onCreate,
}: CreatePermissionProps) => {
  const [newPermission, setNewPermission] = useState({
    id: "",
    name: "",
    application: "",
    created: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPermission((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetPermission = () => {
    setNewPermission({
      id: "",
      name: "",
      application: "",
      created: new Date().toISOString(),
    });
  };

  const handleCreate = () => {
    const { name, application } = newPermission;

    if (!name.trim() || !application.trim()) {
      toast.warning("All fields are required.");
      return;
    }

    onCreate({
      id: crypto.randomUUID(),
      name: name.trim(),
      application: application.trim(),
      created: newPermission.created,
    });
    resetPermission();
    onClose();
  };

  const handleClose = () => {
    resetPermission();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Permission</DialogTitle>
          <DialogDescription>
            Enter the details of the new permission.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="name"
            value={newPermission.name}
            onChange={handleChange}
            placeholder="Permissionname"
          />
          <Input
            name="application"
            value={newPermission.application}
            onChange={handleChange}
            placeholder="Application"
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

export default CreatePermission;
