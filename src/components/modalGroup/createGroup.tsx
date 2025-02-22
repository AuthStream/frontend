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

interface Group {
  id: string;
  email: string;
  password: string;
  created: string;
}

interface CreateGroupProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (group: Group) => void;
}

const CreateGroup = ({ isOpen, onClose, onCreate }: CreateGroupProps) => {
  const [newGroup, setNewGroup] = useState({
    id: "",
    email: "",
    password: "",
    confirmPassword: "",
    created: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGroup((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetGroup = () => {
    setNewGroup({
      id: "",
      email: "",
      password: "",
      confirmPassword: "",
      created: new Date().toISOString(),
    });
  };

  const handleCreate = () => {
    const { email, password, confirmPassword } = newGroup;

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
      created: newGroup.created,
    });
    resetGroup();
    onClose();
  };

  const handleClose = () => {
    resetGroup();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>
            Enter the details of the new group.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="email"
            name="email"
            value={newGroup.email}
            onChange={handleChange}
            placeholder="Groupname"
          />
          <Input
            type="password"
            name="password"
            value={newGroup.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <Input
            type="password"
            name="confirmPassword"
            value={newGroup.confirmPassword}
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

export default CreateGroup;
