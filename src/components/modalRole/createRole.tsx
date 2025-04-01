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
import { Role } from "../../api/type";

// Assuming these hooks exist to fetch groups and permissions
import { useGetGroups } from "../../hooks/useGroupQueries";
import { useGetPermissions } from "../../hooks/usePermissionQueries";

interface CreateRoleProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (role: Role) => void;
}

const CreateRole = ({ isOpen, onClose, onCreate }: CreateRoleProps) => {
  const [newRole, setNewRole] = useState<Role>({
    id: "",
    name: "",
    groupId: "",
    permissionId: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  });

  // Fetch groups and permissions
  const {
    data: groups,
    isLoading: groupsLoading,
    error: groupsError,
  } = useGetGroups();
  const {
    data: permissions,
    isLoading: permissionsLoading,
    error: permissionsError,
  } = useGetPermissions();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      groupId: "",
      permissionId: "",
      description: "",
      createdAt: "",
      updatedAt: "",
    });
  };

  const handleCreate = () => {
    const { name, groupId, permissionId } = newRole;

    // Validate required fields
    if (!name.trim() || !groupId || !permissionId) {
      toast.warning("Name, Group, and Permission are required.");
      return;
    }

    // Create the role with current timestamp
    onCreate({
      ...newRole,
      name: name.trim(),
      groupId,
      permissionId,
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
            placeholder="Role Name"
          />

          {/* Group Selection */}
          {groupsLoading ? (
            <p>Loading groups...</p>
          ) : groupsError ? (
            <p className="text-red-500">Error loading groups</p>
          ) : (
            <select
              name="groupId"
              value={newRole.groupId}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-600 text-sm"
            >
              <option value="">Select Group</option>
              {groups?.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          )}

          {/* Permission Selection */}
          {permissionsLoading ? (
            <p>Loading permissions...</p>
          ) : permissionsError ? (
            <p className="text-red-500">Error loading permissions</p>
          ) : (
            <select
              name="permissionId"
              value={newRole.permissionId}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-600 text-sm"
            >
              <option value="">Select Permission</option>
              {permissions?.map((permission) => (
                <option key={permission.id} value={permission.id}>
                  {permission.name}
                </option>
              ))}
            </select>
          )}

          <Input
            name="description"
            value={newRole.description}
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

export default CreateRole;
