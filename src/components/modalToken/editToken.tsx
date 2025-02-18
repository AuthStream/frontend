import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import Textarea from "../ui/textarea";

interface Token {
  id: string;
  name: string;
  body: string;
  encrypt: string;
  expired: number;
}

interface EditTokenProps {
  isOpen: boolean;
  onClose: () => void;
  tokenToEdit: Token | null;
  onEdit: (updatedToken: Token) => void;
}

const EditToken = ({
  isOpen,
  onClose,
  tokenToEdit,
  onEdit,
}: EditTokenProps) => {
  const [editedToken, setEditedToken] = useState<Token | null>(null);

  useEffect(() => {
    if (tokenToEdit) {
      setEditedToken(tokenToEdit);
    }
  }, [tokenToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (editedToken) {
      setEditedToken((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };
  const handleEdit = () => {
    if (editedToken) {
      onEdit(editedToken);
      onClose();
    }
  };

  if (!editedToken) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Token</DialogTitle>
          <DialogDescription>
            Update the details of the token.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="id"
            value={editedToken.id}
            onChange={handleChange}
            placeholder="Token ID"
            disabled
          />
          <Input
            name="name"
            value={editedToken.name}
            onChange={handleChange}
            placeholder="Token Name"
          />
          <Textarea
            name="body"
            value={editedToken.body}
            onChange={handleChange}
            placeholder="Body"
          />
          <Input
            name="encrypt"
            value={editedToken.encrypt}
            onChange={handleChange}
            placeholder="Token Encrypt"
          />
          <Input
            name="expired"
            type="number"
            value={editedToken.expired}
            onChange={handleChange}
            placeholder="Token Expired"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleEdit}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditToken;
