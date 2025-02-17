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
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  const onCreate = async (newApplication: Application) => {
    try {
      const response = await applicationService.createApplication(
        newApplication
      );
      if (response.success) {
        setApplicationList((prevApplications) => [
          ...prevApplications,
          newApplication,
        ]);
      }
    } catch (error) {
      console.error("Failed to create application", error);
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
      }
    } catch (error) {
      console.error("Failed to edit application", error);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    try {
      const response = await applicationService.deleteApplication(id);
      if (response.success) {
        setApplicationList((prevApplications) =>
          prevApplications.filter((application) => application.id !== id)
        );
      }
    } catch (error) {
      console.error("Failed to delete application", error);
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
          <Button className="bg-red-500 text-white hover:bg-red-600">
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <input type="checkbox" />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Application</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicationList.map((application, index) => (
            <TableRow key={index}>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
              <TableCell>{application.id}</TableCell>
              <TableCell>{application.name}</TableCell>
              <TableCell>{application.provider}</TableCell>
              <TableCell>{application.token}</TableCell>
              <TableCell className="flex space-x-2">
                <Button
                  onClick={() => {
                    handleClickEdit(application);
                  }}
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
        1 - 1 &lt; &gt;
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
