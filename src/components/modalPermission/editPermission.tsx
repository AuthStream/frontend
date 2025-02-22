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

interface Permission {
  id: string;
  email: string;
  password: string;
  created: string;
}

interface EditPermissionProps {
  isOpen: boolean;
  onClose: () => void;
  permissionToEdit: Permission | null;
  onEdit: (updatedPermission: Permission) => void;
}

const EditPermission = ({ isOpen, onClose, permissionToEdit, onEdit }: EditPermissionProps) => {
  const [editedPermission, setEditedPermission] = useState<Permission | null>(null);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    if (permissionToEdit) {
      setEditedPermission(permissionToEdit);
    }
  }, [permissionToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedPermission) {
      setEditedPermission((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };

  const handleEdit = () => {
    if (editedPermission) {
      onEdit(editedPermission);
      onClose();
    }
  };

  if (!editedPermission) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Permission</DialogTitle>
          <DialogDescription>Update the details of the permission.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="email"
            name="email"
            value={editedPermission.email}
            onChange={handleChange}
            placeholder="Permissionname"
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={changePassword}
              onChange={(e) => setChangePassword(e.target.checked)}
            />
            <label>Change Password</label>
          </div>
          {changePassword && (
            <>
              <Input
                type="password"
                name="oldPassword"
                onChange={handleChange}
                placeholder="Old Password"
              />
              <Input
                type="password"
                name="newPassword"
                onChange={handleChange}
                placeholder="New Password"
              />
            </>
          )}
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

export default EditPermission;
