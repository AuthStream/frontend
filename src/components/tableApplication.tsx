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
import CreateApplication from "./modalApplication/createApplication";
import { useState } from "react";
import EditApplication from "./modalApplication/editApplication";
import {
  useCreateApplications,
  useDeleteApplications,
  useEditApplications,
  useRefreshApplications,
} from "../hooks/useApplicationQueries";
import applicationService from "../api/service/applicationService";
import { toast } from "react-toastify";
import DeleteMultipleConfirm from "./confirmMultipleBox";
import DeleteConfirm from "./confirmBox";
import { Application } from "../api/type";

interface TableApplicationProps {
  applications: Application[];
}

const TableApplication = ({ applications }: TableApplicationProps) => {
  // console.log(applications);
  const [applicationList, setApplicationList] = useState(applications);
  const [selectedApplications, setSelectedApplications] = useState<string[]>(
    []
  );

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const currentApplications = applications.slice(
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
  const [applicationToEdit, setApplicationToEdit] =
    useState<Application | null>(null);

  const createApplicationMutation = useCreateApplications();
  const editApplicationMutation = useEditApplications();
  const deleteApplicationMutation = useDeleteApplications();
  const refreshApplicationMutation = useRefreshApplications();

  const onClose = () => {
    setIsOpen(false);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedApplications((prev) =>
      prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]
    );
  };

  const onCreate = async (newApplication: Application) => {
    try {
      createApplicationMutation.mutate(newApplication);
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to create application");
    }
  };

  const handleCreateApplication = () => {
    setIsOpen(true);
  };

  const handleClickRefresh = () => {
    refreshApplicationMutation.refresh();
  };

  const handleClickEdit = (application: Application) => {
    setApplicationToEdit(application);
    setIsEditOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditOpen(false);
    setApplicationToEdit({
      id: "",
      name: "",
      providerId: "",
      tokenId: "",
      adminId: "",
      createdAt: "",
      updateAt: "",
    });
  };

  const handleEditApplication = async (updatedApplication: Application) => {
    try {
      editApplicationMutation.mutate(updatedApplication, {
        onSuccess: () => {
          toast.success("Tokens Eit successfully");
        },
      });
      setIsEditOpen(false);
    } catch (error) {
      toast.error("Failed to edit application");
    }
  };
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [idDelete, setIdDelete] = useState<string>("");

  const handleClickDleteApplication = (id: string) => {
    setIdDelete(id);
    setIsOpenConfirm(true);
  };
  const handleDeleteApplication = async (id: string) => {
    try {
      deleteApplicationMutation.mutate(id, {
        onSuccess: () => {
          const updatedApplications = applicationList.filter(
            (application) => application.id !== id
          );

          setApplicationList(updatedApplications);

          const newTotalPages = Math.ceil(
            updatedApplications.length / itemsPerPage
          );

          if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages || 1);
          }
          toast.success("Application deleted successfully");
        },
      });
    } catch (error) {
      toast.error("Failed to delete application");
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedApplications(
      e.target.checked ? applications.map((app) => app.id) : []
    );
  };
  const [isOpenConfirmMultiple, setIsOpenConfirmMultiple] = useState(false);

  const handleDeleteSelected = () => {
    if (selectedApplications.length === 0) {
      toast.warn("No providers selected");
      return;
    }
    setIsOpenConfirmMultiple(true);
  };

  const handleDeleteSelectedApplications = async () => {
    if (selectedApplications.length === 0) {
      toast.warn("No applications selected for deletion.");
      return;
    }

    try {
      const response = await applicationService.deleteMultipleApplications(
        selectedApplications
      );
      if (response.success) {
        const updatedApplications = applicationList.filter(
          (application) => !selectedApplications.includes(application.id)
        );

        setApplicationList(updatedApplications);
        setSelectedApplications([]);

        const newTotalPages = Math.ceil(
          updatedApplications.length / itemsPerPage
        );

        if (currentPage > newTotalPages) {
          setCurrentPage(newTotalPages || 1);
        }

        toast.success("Selected applications deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete selected applications");
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
            onClick={handleCreateApplication}
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

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedApplications.length === applicationList.length}
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Token</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentApplications.map((application, index) => (
            <TableRow key={index}>
              <TableCell>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(application.id)}
                  checked={selectedApplications.includes(application.id)}
                />
              </TableCell>
              <TableCell>{application.id}</TableCell>
              <TableCell>{application.name}</TableCell>
              <TableCell>{application.providerId}</TableCell>
              <TableCell>{application.tokenId}</TableCell>
              <TableCell className="flex space-x-2">
                <Button
                  onClick={() => handleClickEdit(application)}
                  variant="outline"
                  size="icon"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleClickDleteApplication(application.id)}
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

      {/* Pagination */}
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

      <CreateApplication
        isOpen={isOpen}
        onClose={onClose}
        onCreate={onCreate}
      />
      {applicationToEdit && (
        <EditApplication
          isOpen={isEditOpen}
          onClose={handleCloseEditModal}
          applicationToEdit={applicationToEdit}
          onEdit={handleEditApplication}
        />
      )}
      <DeleteConfirm
        isOpen={isOpenConfirm}
        onClose={() => setIsOpenConfirm(false)}
        onConfirm={handleDeleteApplication}
        providerId={idDelete}
        type="Application"
      />

      <DeleteMultipleConfirm
        isOpen={isOpenConfirmMultiple}
        onClose={() => setIsOpenConfirmMultiple(false)}
        onConfirm={handleDeleteSelectedApplications}
        selectedArray={selectedApplications}
        type={"Application"}
      />
    </div>
  );
};

export default TableApplication;
