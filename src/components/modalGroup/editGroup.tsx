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

interface Group {
  id: string;
  email: string;
  password: string;
  created: string;
}

interface EditGroupProps {
  isOpen: boolean;
  onClose: () => void;
  groupToEdit: Group | null;
  onEdit: (updatedGroup: Group) => void;
}

const EditGroup = ({ isOpen, onClose, groupToEdit, onEdit }: EditGroupProps) => {
  const [editedGroup, setEditedGroup] = useState<Group | null>(null);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    if (groupToEdit) {
      setEditedGroup(groupToEdit);
    }
  }, [groupToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedGroup) {
      setEditedGroup((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };

  const handleEdit = () => {
    if (editedGroup) {
      onEdit(editedGroup);
      onClose();
    }
  };

  if (!editedGroup) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Group</DialogTitle>
          <DialogDescription>Update the details of the group.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="email"
            name="email"
            value={editedGroup.email}
            onChange={handleChange}
            placeholder="Groupname"
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

export default EditGroup;
