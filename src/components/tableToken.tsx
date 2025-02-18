
import { Search, Plus, Edit, Trash, Trash2, RefreshCw } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import CreateToken from "./modalToken/createToken";
import { useState } from "react";
import EditToken from "./modalToken/editToken";
import { useCreateToken, useEditToken, useDeleteToken, useDeleteMultipleToken } from "../hooks/useTokenQueries";
import { toast } from "react-toastify";
import { Token } from "../api/type";

interface TableTokenProps {
  tokens: Token[];
}

const TableToken = ({ tokens }: TableTokenProps) => {
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(tokens.length / itemsPerPage);
  const currentTokens = tokens.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [tokenToEdit, setTokenToEdit] = useState<Token | null>(null);

  const createTokenMutation = useCreateToken();
  const editTokenMutation = useEditToken();
  const deleteTokenMutation = useDeleteToken();
  const deleteMultipleTokenMutation = useDeleteMultipleToken();

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedTokens((prev) =>
      prev.includes(id)
        ? prev.filter((tokenId) => tokenId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTokens(e.target.checked ? tokens.map((t) => t.id) : []);
  };

  const handleDeleteSelectedTokens = async () => {
    if (selectedTokens.length === 0) {
      toast.warn("No tokens selected");
      return;
    }

    if (
      !window.confirm("Are you sure you want to delete the selected tokens?")
    ) {
      return;
    }

    try {
      console.log(selectedTokens);
      toast.success("alo")
      deleteMultipleTokenMutation.mutate(selectedTokens, {
        onSuccess: () => {
          toast.success("Tokens deleted successfully");
        }
      })

    } catch (error) {
      toast.error("Failed to delete selected tokens");
    }
  };

  //logic validate token

  // const validateToken = (token: Token) => {
  //   if (!token.name.trim()) {
  //     toast.error("Token name is required");
  //     return false;
  //   }
  //   if (!token.body.trim()) {
  //     toast.error("Body is required");
  //     return false;
  //   }
  //   if (!token.encrypt.trim()) {
  //     toast.error("Encrypt is required");
  //     return false;
  //   }
  //   if (!token.expired) {
  //     toast.error("Expired time is required");
  //     return false;
  //   }
  //   return true;
  // };

  const onCreate = async (newToken: Token) => {
    try {
      createTokenMutation.mutate(newToken, {
        onSuccess: () => {
          toast.success("Token created successfully");
        }
      });
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to create token");
    }
  };

  const handleCreateToken = () => {
    setIsOpen(true);
  };

  const handleEditToken = async (updatedToken: Token) => {


    try {

      editTokenMutation.mutate(updatedToken, {
        onSuccess: () => {
          toast.success("Token updated successfully");
        }
      });
      setIsEditOpen(false);
    } catch (error) {
      toast.error("Failed to edit token");
    }
  };

  const handleDeleteToken = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this token?")) {
      return;
    }
    try {

      deleteTokenMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Token deleted successfully");
        }
      });

    } catch (error) {
      toast.error("Failed to delete token");
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
          <Button onClick={handleCreateToken} className="bg-blue-500 text-white hover:bg-blue-600">
            <Plus className="w-4 h-4 mr-2" /> Create
          </Button>

          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
          <Button
            onClick={handleDeleteSelectedTokens}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </Button>
        </div >
      </div >

      <Table>
        <TableHeader>
          <TableRow>

            <TableHead className="w-12">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedTokens.length === tokens.length}
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Expired</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow >
        </TableHeader >
        <TableBody>
          {
            currentTokens.map((token) => (
              <TableRow key={token.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(token.id)}
                    checked={selectedTokens.includes(token.id)}
                  />
                </TableCell>
                <TableCell>{token.id}</TableCell>
                <TableCell>{token.name}</TableCell>
                <TableCell>{token.expired}</TableCell>
                <TableCell>
                  <Button onClick={() => { setTokenToEdit(token); setIsEditOpen(true); }} variant="outline" size="icon">

                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button onClick={() => handleDeleteToken(token.id)} variant="destructive" size="icon">
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody >
      </Table >

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

      <CreateToken isOpen={isOpen} onClose={() => setIsOpen(false)} onCreate={onCreate} />
      {tokenToEdit && <EditToken isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} tokenToEdit={tokenToEdit} onEdit={handleEditToken} />}
    </div >
  );
};

export default TableToken;
