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
import CreateToken from "./modalToken/createToken";
import { useState } from "react";
import EditToken from "./modalToken/editToken";
import tokenService from "../api/service/tokenService";

interface Token {
  id: string;
  name: string;
  body: string;
  encrypt: string;
  expired: number;
}

interface TableTokenProps {
  tokens: Token[];
}

const TableToken = ({ tokens }: TableTokenProps) => {
  const [tokenList, setTokenList] = useState(tokens);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  const onCreate = async (newToken: Token) => {
    try {
      const response = await tokenService.createToken(newToken);
      if (response.success) {
        setTokenList((prevTokens) => [...prevTokens, newToken]);
      }
    } catch (error) {
      console.error("Failed to create token", error);
    }
  };

  const handleCreateToken = () => {
    setIsOpen(true);
  };

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [tokenToEdit, setTokenToEdit] = useState<Token | null>(null);

  const handleClickEdit = (token: Token) => {
    setTokenToEdit(token);
    setIsEditOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditOpen(false);
    setTokenToEdit(null);
  };

  const handleEditToken = async (updatedToken: Token) => {
    try {
      const response = await tokenService.editToken(updatedToken);
      if (response.success) {
        setTokenList((prevTokens) =>
          prevTokens.map((token) =>
            token.id === updatedToken.id ? updatedToken : token
          )
        );
      }
    } catch (error) {
      console.error("Failed to edit token", error);
    }
  };

  const handleDeleteToken = async (id: string) => {
    try {
      const response = await tokenService.deleteToken(id);
      if (response.success) {
        setTokenList((prevTokens) =>
          prevTokens.filter((token) => token.id !== id)
        );
      }
    } catch (error) {
      console.error("Failed to delete token", error);
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
            onClick={handleCreateToken}
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
            <TableHead>Expired</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokenList.map((token, index) => (
            <TableRow key={index}>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
              <TableCell>{token.id}</TableCell>
              <TableCell>{token.name}</TableCell>
              <TableCell>{token.expired}</TableCell>
              <TableCell className="flex space-x-2">
                <Button
                  onClick={() => {
                    handleClickEdit(token);
                  }}
                  variant="outline"
                  size="icon"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleDeleteToken(token.id)}
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

      <CreateToken isOpen={isOpen} onClose={onClose} onCreate={onCreate} />

      {tokenToEdit && (
        <EditToken
          isOpen={isEditOpen}
          onClose={handleCloseEditModal}
          tokenToEdit={tokenToEdit}
          onEdit={handleEditToken}
        />
      )}
    </div>
  );
};

export default TableToken;
