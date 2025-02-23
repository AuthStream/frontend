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

interface Role {
  id: string;
  name: string;
  application: string;
  created: string;
}

interface CreateRoleProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (role: Role) => void;
}

const CreateRole = ({ isOpen, onClose, onCreate }: CreateRoleProps) => {
  const [newRole, setNewRole] = useState({
    id: "",
    name: "",
    application: "",
    created: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRole((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetRole = () => {
    setNewRole({
      id: "",
      name: "",
      application: "",
      created: new Date().toISOString(),
    });
  };

  const handleCreate = () => {
    const { name, application } = newRole;

    if (!name.trim() || !application.trim()) {
      toast.warning("All fields are required.");
      return;
    }

    onCreate({
      id: crypto.randomUUID(),
      name: name.trim(),
      application: application.trim(),
      created: newRole.created,
    });
    resetRole();
    onClose();
  };

  const handleClose = () => {
    resetRole();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Role</DialogTitle>
          <DialogDescription>
            Enter the details of the new role.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="name"
            value={newRole.name}
            onChange={handleChange}
            placeholder="Rolename"
          />
          <Input
            name="application"
            value={newRole.application}
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

export default CreateRole;
