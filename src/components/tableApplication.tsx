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
import applicationService from "../api/service/applicationService";
import { toast } from "react-toastify";

interface Application {
  id: string;
  name: string;
  provider: string;
  token: string;
}

interface TableApplicationProps {
  applications: Application[];
}

const TableApplication = ({ applications }: TableApplicationProps) => {
  const [applicationList, setApplicationList] = useState(applications);
  const [selectedApplications, setSelectedApplications] = useState<string[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = applicationList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(applicationList.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedApplications((prev) =>
      prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedApplications(
      e.target.checked ? applicationList.map((app) => app.id) : []
    );
  };

  const handleDeleteSelectedApplications = async () => {
    if (selectedApplications.length === 0) {
      toast.warn("No applications selected for deletion.");
      return;
    }
    if (
      !window.confirm("Are you sure you want to delete selected applications?")
    ) {
      return;
    }
    try {
      const response = await applicationService.deleteMultipleApplications(
        selectedApplications
      );
      if (response.success) {
        setApplicationList((prevApplications) =>
          prevApplications.filter(
            (application) => !selectedApplications.includes(application.id)
          )
        );
        setSelectedApplications([]); // Clear selection after deletion
        toast.success("Selected applications deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete selected applications");
    }
  };

  const validateApplication = (application: Application) => {
    if (!application.name.trim()) {
      toast.error("Application name is required");
      return false;
    }
    if (!application.provider.trim()) {
      toast.error("Provider is required");
      return false;
    }
    if (!application.token.trim()) {
      toast.error("Token is required");
      return false;
    }
    return true;
  };

  const onCreate = async (newApplication: Application) => {
    if (!validateApplication(newApplication)) return;
    try {
      const response = await applicationService.createApplication(
        newApplication
      );
      if (response.success) {
        setApplicationList((prevApplications) => [
          ...prevApplications,
          newApplication,
        ]);
        toast.success("Application created successfully");
      }
    } catch (error) {
      toast.error("Failed to create application");
    }
  };

  const handleCreateApplication = () => {
    setIsOpen(true);
  };

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [applicationToEdit, setApplicationToEdit] =
    useState<Application | null>(null);

  const handleClickEdit = (application: Application) => {
    setApplicationToEdit(application);
    setIsEditOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditOpen(false);
    setApplicationToEdit(null);
  };

  const handleEditApplication = async (updatedApplication: Application) => {
    if (!validateApplication(updatedApplication)) return;
    try {
      const response = await applicationService.editApplication(
        updatedApplication
      );
      if (response.success) {
        setApplicationList((prevApplications) =>
          prevApplications.map((application) =>
            application.id === updatedApplication.id
              ? updatedApplication
              : application
          )
        );
        toast.success("Application updated successfully");
      }
    } catch (error) {
      toast.error("Failed to edit application");
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;
    try {
      const response = await applicationService.deleteApplication(id);
      if (response.success) {
        setApplicationList((prevApplications) =>
          prevApplications.filter((application) => application.id !== id)
        );
        toast.success("Application deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete application");
    }
  };

  return (
    <div className="w-full bg-white dark:bg-background border p-5 rounded-lg shadow-md">
      {/* Search & Actions */}
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
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
          <Button
            onClick={handleDeleteSelectedApplications}
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
            <TableHead>Application</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((application, index) => (
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
              <TableCell>{application.provider}</TableCell>
              <TableCell>{application.token}</TableCell>
              <TableCell className="flex space-x-2">
                <Button
                  onClick={() => handleClickEdit(application)}
                  variant="outline"
                  size="icon"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleDeleteApplication(application.id)}
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
      <div className="flex justify-center mt-4 text-gray-500">
        <Button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </Button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={nextPage} disabled={currentPage === totalPages}>
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
    </div>
  );
};

export default TableApplication;
