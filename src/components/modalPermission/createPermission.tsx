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
  email: string;
  password: string;
  created: string;
}

interface CreatePermissionProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (permission: Permission) => void;
}

const CreatePermission = ({ isOpen, onClose, onCreate }: CreatePermissionProps) => {
  const [newPermission, setNewPermission] = useState({
    id: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      email: "",
      password: "",
      confirmPassword: "",
      created: new Date().toISOString(),
    });
  };

  const handleCreate = () => {
    const { email, password, confirmPassword } = newPermission;

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
            type="email"
            name="email"
            value={newPermission.email}
            onChange={handleChange}
            placeholder="Permissionname"
          />
          <Input
            type="password"
            name="password"
            value={newPermission.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <Input
            type="password"
            name="confirmPassword"
            value={newPermission.confirmPassword}
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

export default CreatePermission;
