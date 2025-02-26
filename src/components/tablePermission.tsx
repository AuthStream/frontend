import { useState } from "react";
import { Search, Plus, RefreshCw, Trash2, Edit, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import CreatePermission from "./modalPermission/createPermission";
import EditPermission from "./modalPermission/editPermission";
import DeleteConfirm from "./confirmBox";
import DeleteMultipleConfirm from "./confirmMultipleBox";
import { toast } from "react-toastify";
import {
  useCreatePermissions,
  useDeletePermissions,
  useEditPermissions,
  useRefreshPermissions,
} from "../hooks/usePermissionQueries";
import permissionService from "../api/service/permissionService";

interface Permission {
  id: string;
  name: string;
  application: string;
  created: string;
}

interface TablePermissionProps {
  permissions: Permission[];
}

const TablePermission = ({ permissions }: TablePermissionProps) => {
  const [permissionList, setPermissionList] = useState(permissions);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(permissions.length / itemsPerPage);
  const currentPermissions = permissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [permissionToEdit, setPermissionToEdit] = useState<Permission | null>(
    null
  );
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [isOpenConfirmMultiple, setIsOpenConfirmMultiple] = useState(false);
  const [idDelete, setIdDelete] = useState<string>("");

  const createPermissionMutation = useCreatePermissions();
  const editPermissionMutation = useEditPermissions();
  const deletePermissionMutation = useDeletePermissions();
  const refreshPermissionMutation = useRefreshPermissions();

  const handleCheckboxChange = (id: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(id)
        ? prev.filter((permissionId) => permissionId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPermissions(
      e.target.checked ? permissions.map((permission) => permission.id) : []
    );
  };

  const handleCreatePermission = () => {
    setIsOpen(true);
  };

  const onCreate = async (newPermission: Permission) => {
    try {
      createPermissionMutation.mutate(newPermission);
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to create permission");
    }
  };

  const handleClickRefresh = () => {
    refreshPermissionMutation.refresh();
  };

  const handleClickEdit = (permission: Permission) => {
    setPermissionToEdit(permission);
    setIsEditOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditOpen(false);
    setPermissionToEdit(null);
  };

  const handleEditPermission = async (updatedPermission: Permission) => {
    try {
      editPermissionMutation.mutate(updatedPermission, {
        onSuccess: () => {
          toast.success("Permission updated successfully");
        },
      });
      setIsEditOpen(false);
    } catch (error) {
      toast.error("Failed to edit permission");
    }
  };

  const handleClickDeletePermission = (id: string) => {
    setIdDelete(id);
    setIsOpenConfirm(true);
  };

  const handleDeletePermission = async (id: string) => {
    try {
      deletePermissionMutation.mutate(id, {
        onSuccess: () => {
          const updatedPermissions = permissionList.filter(
            (permission) => permission.id !== id
          );
          setPermissionList(updatedPermissions);

          const newTotalPages = Math.ceil(
            updatedPermissions.length / itemsPerPage
          );
          if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages || 1);
          }
          toast.success("Permission deleted successfully");
        },
      });
    } catch (error) {
      toast.error("Failed to delete permission");
    }
  };

  const handleDeleteSelected = () => {
    if (selectedPermissions.length === 0) {
      toast.warn("No permissions selected");
      return;
    }
    setIsOpenConfirmMultiple(true);
  };

  const handleDeleteSelectedPermissions = async () => {
    if (selectedPermissions.length === 0) {
      toast.warn("No permissions selected for deletion.");
      return;
    }

    try {
      const response = await permissionService.deleteMultiplePermissions(
        selectedPermissions
      );
      if (response.success) {
        const updatedPermissions = permissionList.filter(
          (permission) => !selectedPermissions.includes(permission.id)
        );

        setPermissionList(updatedPermissions);
        setSelectedPermissions([]);

        const newTotalPages = Math.ceil(
          updatedPermissions.length / itemsPerPage
        );
        if (currentPage > newTotalPages) {
          setCurrentPage(newTotalPages || 1);
        }

        toast.success("Selected permissions deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete selected permissions");
    }
  };

  return (
    <div className="w-full bg-white dark:bg-background border p-5 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-1/3">
          <Input placeholder="Search..." className="pl-10" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        <div className="space-x-2">
          <Button
            onClick={handleCreatePermission}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" /> Create
          </Button>
          <Button onClick={handleClickRefresh} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
          <Button
            onClick={handleDeleteSelected}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Delete Selected
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedPermissions.length === permissionList.length}
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Permission Name</TableHead>
            <TableHead>Application</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPermissions.map((permission, index) => (
            <TableRow key={index}>
              <TableCell>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(permission.id)}
                  checked={selectedPermissions.includes(permission.id)}
                />
              </TableCell>
              <TableCell>{permission.id}</TableCell>
              <TableCell>{permission.name}</TableCell>
              <TableCell>{permission.application}</TableCell>
              <TableCell>
                {" "}
                {new Date(permission.created).toISOString().split("T")[0]}
              </TableCell>
              <TableCell className="flex space-x-2">
                <Button
                  onClick={() => handleClickEdit(permission)}
                  variant="outline"
                  size="icon"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleClickDeletePermission(permission.id)}
                  variant="destructive"
                  size="icon"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-4 text-gray-500">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      <CreatePermission
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreate={onCreate}
      />
      {permissionToEdit && (
        <EditPermission
          isOpen={isEditOpen}
          onClose={handleCloseEditModal}
          permissionToEdit={permissionToEdit}
          onEdit={handleEditPermission}
        />
      )}
      <DeleteConfirm
        isOpen={isOpenConfirm}
        onClose={() => setIsOpenConfirm(false)}
        onConfirm={handleDeletePermission}
        providerId={idDelete}
        type="Permission"
      />
      <DeleteMultipleConfirm
        isOpen={isOpenConfirmMultiple}
        onClose={() => setIsOpenConfirmMultiple(false)}
        onConfirm={handleDeleteSelectedPermissions}
        selectedArray={selectedPermissions}
        type="Permission"
      />
    </div>
  );
};

export default TablePermission;
