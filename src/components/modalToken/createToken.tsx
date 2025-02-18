import { useState } from "react";
import { Button } from "../ui/button";
import Textarea from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";

interface Token {
  id: string;
  name: string;
  body: string;
  encrypt: string;
  expired: number;
}

interface CreateTokenProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (token: Token) => void;
}

const CreateToken = ({ isOpen, onClose, onCreate }: CreateTokenProps) => {
  const [newToken, setNewToken] = useState<Token>({
    id: "",
    name: "",
    body: "",
    encrypt: "",
    expired: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewToken((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    onCreate(newToken);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Token</DialogTitle>
          <DialogDescription>
            Enter the details of the new token.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="id"
            value={newToken.id}
            onChange={handleChange}
            placeholder="Token ID"
          />
          <Input
            name="name"
            value={newToken.name}
            onChange={handleChange}
            placeholder="Token Name"
          />
          <Textarea
            name="body"
            value={newToken.body}
            onChange={handleChange}
            placeholder="Body"
          />
          <Input
            name="encrypt"
            value={newToken.encrypt}
            onChange={handleChange}
            placeholder="Token Encrypt"
          />
          <Input
            type="number"
            name="expired"
            value={newToken.expired}
            onChange={handleChange}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleCreate}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateToken;
