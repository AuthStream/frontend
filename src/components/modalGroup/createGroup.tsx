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
import { Group } from "../../api/type";

// Assuming this hook exists to fetch roles
import { useGetRoles } from "../../hooks/useRoleQueries";

interface CreateGroupProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (group: Group) => void;
}

const CreateGroup = ({ isOpen, onClose, onCreate }: CreateGroupProps) => {
  const [newGroup, setNewGroup] = useState<Group>({
    id: "",
    name: "",
    roleId: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  });

  // Fetch roles
  const {
    data: roles,
    isLoading: rolesLoading,
    error: rolesError,
  } = useGetRoles();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewGroup((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetGroup = () => {
    setNewGroup({
      id: "",
      name: "",
      roleId: "",
      description: "",
      createdAt: "",
      updatedAt: "",
    });
  };

  const handleCreate = () => {
    const { name, roleId } = newGroup;

    if (!name.trim()) {
      toast.warning("Group name is required.");
      return;
    }

    if (!roleId) {
      toast.warning("A role must be selected.");
      return;
    }

    onCreate({
      ...newGroup,
      name: name.trim(),
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
            name="name"
            value={newGroup.name}
            onChange={handleChange}
            placeholder="Group Name"
          />

          {/* Role Selection */}
          {rolesLoading ? (
            <p>Loading roles...</p>
          ) : rolesError ? (
            <p className="text-red-500">Error loading roles</p>
          ) : roles && roles.length > 0 ? (
            <select
              name="roleId"
              value={newGroup.roleId}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-600 text-sm"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          ) : (
            <p>No roles available</p>
          )}

          <Input
            name="description"
            value={newGroup.description}
            onChange={handleChange}
            placeholder="Description (optional)"
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
