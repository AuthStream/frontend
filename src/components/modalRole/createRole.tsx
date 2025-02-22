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
  email: string;
  password: string;
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
    email: "",
    password: "",
    confirmPassword: "",
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
      email: "",
      password: "",
      confirmPassword: "",
      created: new Date().toISOString(),
    });
  };

  const handleCreate = () => {
    const { email, password, confirmPassword } = newRole;

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.warning("All fields are required.");
      return;
    }

    if (password.length < 8) {
      toast.warning("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Passwords do not match.");
      return;
    }

    onCreate({
      id: crypto.randomUUID(),
      email: email.trim(),
      password: password.trim(),
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
            type="email"
            name="email"
            value={newRole.email}
            onChange={handleChange}
            placeholder="Rolename"
          />
          <Input
            type="password"
            name="password"
            value={newRole.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <Input
            type="password"
            name="confirmPassword"
            value={newRole.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
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
