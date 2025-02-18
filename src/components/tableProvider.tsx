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

interface Provider {
  id: string;
  name: string;
  type: string;
  domain: string;
  token: string;
}

interface TableProviderProps {
  providers: Provider[];
}

const TableProvider = ({ providers }: TableProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const onCreate = () => {
    console.log(onCreate);
  };
  const handleCreateProvider = () => {
    setIsOpen(true);
  };

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [providerToEdit, setProviderToEdit] = useState<Provider | null>(null);

  const handleClickEdit = (provider: Provider) => {
    setProviderToEdit(provider);
    setIsEditOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditOpen(false);
    setProviderToEdit(null);
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
                <Button variant="destructive" size="icon">
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

      <CreateProvider isOpen={isOpen} onClose={onClose} onCreate={onCreate} />

      {providerToEdit && (
        <EditProvider
          isOpen={isEditOpen}
          onClose={handleCloseEditModal}
          providerToEdit={providerToEdit}
        />
      )}
    </div>
  );
};

export default TableProvider;
