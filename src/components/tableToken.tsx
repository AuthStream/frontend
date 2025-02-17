
import { Search, Plus, Edit, Trash } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import CreateToken from "./modalToken/createToken";
import { useState } from "react";
import EditToken from "./modalToken/editToken";
import { useCreateToken, useEditToken, useDeleteToken } from "../hooks/useTokenQueries";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [tokenToEdit, setTokenToEdit] = useState<Token | null>(null);

  const createTokenMutation = useCreateToken();
  const editTokenMutation = useEditToken();
  const deleteTokenMutation = useDeleteToken();

  const onCreate = async (newToken: Token) => {
    createTokenMutation.mutate(newToken);
    setIsOpen(false);
  };

  const handleEditToken = async (updatedToken: Token) => {
    editTokenMutation.mutate(updatedToken);
    setIsEditOpen(false);
  };

  const handleDeleteToken = async (id: string) => {
    deleteTokenMutation.mutate(id);
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
          <Button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white hover:bg-blue-600">
            <Plus className="w-4 h-4 mr-2" /> Create
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Expired</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokens.map((token) => (
            <TableRow key={token.id}>
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
          ))}
        </TableBody>
      </Table>

      <CreateToken isOpen={isOpen} onClose={() => setIsOpen(false)} onCreate={onCreate} />
      {tokenToEdit && <EditToken isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} tokenToEdit={tokenToEdit} onEdit={handleEditToken} />}
    </div>
  );
};

export default TableToken;
