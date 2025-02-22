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
import CreateGroup from "./modalGroup/createGroup";
import EditGroup from "./modalGroup/editGroup";
import DeleteConfirm from "./confirmBox";
import DeleteMultipleConfirm from "./confirmMultipleBox";
import { toast } from "react-toastify";
import {
  useCreateGroups,
  useDeleteGroups,
  useEditGroups,
  useRefreshGroups,
} from "../hooks/useGroupQueries";
import groupService from "../api/service/groupService";

interface Group {
  id: string;
  email: string;
  password: string;
  created: string;
}

interface TableGroupProps {
  groups: Group[];
}

const TableGroup = ({ groups }: TableGroupProps) => {
  const [groupList, setGroupList] = useState(groups);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(groups.length / itemsPerPage);
  const currentGroups = groups.slice(
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
  const [groupToEdit, setGroupToEdit] = useState<Group | null>(null);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [isOpenConfirmMultiple, setIsOpenConfirmMultiple] = useState(false);
  const [idDelete, setIdDelete] = useState<string>("");

  const createGroupMutation = useCreateGroups();
  const editGroupMutation = useEditGroups();
  const deleteGroupMutation = useDeleteGroups();
  const refreshGroupMutation = useRefreshGroups();

  const handleCheckboxChange = (id: string) => {
    setSelectedGroups((prev) =>
      prev.includes(id)
        ? prev.filter((groupId) => groupId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGroups(e.target.checked ? groups.map((group) => group.id) : []);
  };

  const handleCreateGroup = () => {
    setIsOpen(true);
  };

  const onCreate = async (newGroup: Group) => {
    try {
      createGroupMutation.mutate(newGroup);
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to create group");
    }
  };

  const handleClickRefresh = () => {
    refreshGroupMutation.refresh();
  };

  const handleClickEdit = (group: Group) => {
    setGroupToEdit(group);
    setIsEditOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditOpen(false);
    setGroupToEdit(null);
  };

  const handleEditGroup = async (updatedGroup: Group) => {
    try {
      editGroupMutation.mutate(updatedGroup, {
        onSuccess: () => {
          toast.success("Group updated successfully");
        },
      });
      setIsEditOpen(false);
    } catch (error) {
      toast.error("Failed to edit group");
    }
  };

  const handleClickDeleteGroup = (id: string) => {
    setIdDelete(id);
    setIsOpenConfirm(true);
  };

  const handleDeleteGroup = async (id: string) => {
    try {
      deleteGroupMutation.mutate(id, {
        onSuccess: () => {
          const updatedGroups = groupList.filter((group) => group.id !== id);
          setGroupList(updatedGroups);

          const newTotalPages = Math.ceil(updatedGroups.length / itemsPerPage);
          if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages || 1);
          }
          toast.success("Group deleted successfully");
        },
      });
    } catch (error) {
      toast.error("Failed to delete group");
    }
  };

  const handleDeleteSelected = () => {
    if (selectedGroups.length === 0) {
      toast.warn("No groups selected");
      return;
    }
    setIsOpenConfirmMultiple(true);
  };

  const handleDeleteSelectedGroups = async () => {
    if (selectedGroups.length === 0) {
      toast.warn("No groups selected for deletion.");
      return;
    }

    try {
      const response = await groupService.deleteMultipleGroups(selectedGroups);
      if (response.success) {
        const updatedGroups = groupList.filter(
          (group) => !selectedGroups.includes(group.id)
        );

        setGroupList(updatedGroups);
        setSelectedGroups([]);

        const newTotalPages = Math.ceil(updatedGroups.length / itemsPerPage);
        if (currentPage > newTotalPages) {
          setCurrentPage(newTotalPages || 1);
        }

        toast.success("Selected groups deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete selected groups");
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
            onClick={handleCreateGroup}
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
                checked={selectedGroups.length === groupList.length}
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Groupname</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentGroups.map((group, index) => (
            <TableRow key={index}>
              <TableCell>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(group.id)}
                  checked={selectedGroups.includes(group.id)}
                />
              </TableCell>
              <TableCell>{group.id}</TableCell>
              <TableCell>{group.email}</TableCell>
              <TableCell>{group.password}</TableCell>
              <TableCell>
                {" "}
                {new Date(group.created).toISOString().split("T")[0]}
              </TableCell>
              <TableCell className="flex space-x-2">
                <Button
                  onClick={() => handleClickEdit(group)}
                  variant="outline"
                  size="icon"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleClickDeleteGroup(group.id)}
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

      <CreateGroup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreate={onCreate}
      />
      {groupToEdit && (
        <EditGroup
          isOpen={isEditOpen}
          onClose={handleCloseEditModal}
          groupToEdit={groupToEdit}
          onEdit={handleEditGroup}
        />
      )}
      <DeleteConfirm
        isOpen={isOpenConfirm}
        onClose={() => setIsOpenConfirm(false)}
        onConfirm={handleDeleteGroup}
        providerId={idDelete}
        type="Group"
      />
      <DeleteMultipleConfirm
        isOpen={isOpenConfirmMultiple}
        onClose={() => setIsOpenConfirmMultiple(false)}
        onConfirm={handleDeleteSelectedGroups}
        selectedArray={selectedGroups}
        type="Group"
      />
    </div>
  );
};

export default TableGroup;
