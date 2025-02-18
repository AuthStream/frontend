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
import CreateProvider from "./modalProvider/createProvider";
import { useState } from "react";
import EditProvider from "./modalProvider/editProvider";
import { ProviderType } from "../api/type";
import { useCreateProviders, useDeleteMultipleProvider, useDeleteProviders, useEditProviders } from "../hooks/useProviderQueries";
import { toast } from "react-toastify";


interface TableProviderProps {
  providers: ProviderType[];
}

const TableProvider = ({ providers }: TableProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [providerToEdit, setProviderToEdit] = useState<ProviderType | null>(null);


  const createProviderMutation = useCreateProviders();
  const editProviderMutation = useEditProviders();
  const deleteProviderMutation = useDeleteProviders();
  const deleteMultipleProviderMutation = useDeleteMultipleProvider();

  const onCreate = async (newProvider: ProviderType) => {
    try {
      createProviderMutation.mutate(newProvider, {
        onSuccess: () => {
          toast.success("Provider created successfully");
        }
      });
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to create Provider");
    }
  };
  const handleCreateProvider = () => {
    setIsOpen(true);
  };

  const handleClickEdit = (provider: ProviderType) => {
    setProviderToEdit(provider);
    setIsEditOpen(true);
  };
  const handleEditProvider = async (updatedProvider: ProviderType) => {
    try {
      editProviderMutation.mutate(updatedProvider, {
        onSuccess: () => {
          toast.success("Provider updated successfully");
        }
      });
      setIsEditOpen(false);
    } catch (error) {
      toast.error("Failed to edit Provider");
    }
  };

  const handleCloseEditModal = () => {
    setIsEditOpen(false);
    setProviderToEdit(null);
  };

  const handleDeleteProvider = (id: string) => {

    if (!window.confirm("Are you sure you want to delete this token?")) {
      return;
    }
    try {
      deleteProviderMutation.mutate(id, {
        onSuccess: () => {
          toast.success("provider delete successfully")
        }
      })
    } catch (error) {
      toast.error("something wrong with delete provider")
    }
  }

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
            onClick={handleCreateProvider}
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
            <TableHead>Type</TableHead>
            <TableHead>Domain</TableHead>
            <TableHead>Token</TableHead>
            <TableHead>CallBack Url</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providers.map((provider, index) => (
            <TableRow key={index}>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
              <TableCell>{provider.id}</TableCell>
              <TableCell>{provider.name}</TableCell>
              <TableCell>{provider.type}</TableCell>
              <TableCell>{provider.domain}</TableCell>
              <TableCell>{provider.token}</TableCell>

              <TableCell>{provider.callBackUrl}</TableCell>

              <TableCell className="flex space-x-2">
                <Button
                  onClick={() => {
                    handleClickEdit(provider);
                  }}
                  variant="outline"
                  size="icon"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleDeleteProvider(provider.id)}
                  variant="destructive" size="icon">
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

      <CreateProvider isOpen={isOpen} onClose={() => setIsOpen(false)} onCreate={onCreate} />

      {providerToEdit && (
        <EditProvider
          isOpen={isEditOpen}
          onClose={handleCloseEditModal}
          providerToEdit={providerToEdit}
          onEdit={handleEditProvider}

        />
      )}


    </div>
  );
};

export default TableProvider;

