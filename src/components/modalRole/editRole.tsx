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
import { Checkbox } from "../ui/checkbox";

interface Role {
  id: string;
  name: string;
  application: string;
  created: string;
}

interface EditRoleProps {
  isOpen: boolean;
  onClose: () => void;
  roleToEdit: Role | null;
  onEdit: (updatedRole: Role) => void;
}

const EditRole = ({ isOpen, onClose, roleToEdit, onEdit }: EditRoleProps) => {
  const [editedRole, setEditedRole] = useState<Role | null>(null);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    if (roleToEdit) {
      setEditedRole(roleToEdit);
    }
  }, [roleToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedRole) {
      setEditedRole((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };

  const handleEdit = () => {
    if (editedRole) {
      onEdit(editedRole);
      onClose();
    }
  };

  if (!editedRole) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Role</DialogTitle>
          <DialogDescription>Update the details of the role.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="name"
            value={editedRole.name}
            onChange={handleChange}
            placeholder="Email"
          />
          <Input
            name="application"
            value={editedRole.application}
            onChange={handleChange}
            placeholder="Application"
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

export default EditRole;
