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

interface Provider {
  id: string;
  name: string;
  type: string;
  domain: string;
  token: string;
}

const providerTypes = [
  { id: "cloud", name: "Cloud" },
  { id: "hosting", name: "Hosting" },
  { id: "api", name: "API" },
  { id: "database", name: "Database" },
];

const tokens = [
  { id: "oauth", name: "OAuth" },
  { id: "api_key", name: "API Key" },
  { id: "jwt", name: "JWT" },
  { id: "basic_auth", name: "Basic Auth" },
];

interface EditProviderProps {
  isOpen: boolean;
  onClose: () => void;
  providerToEdit: Provider | null;
}

const EditProvider = ({
  isOpen,
  onClose,
  providerToEdit,
}: EditProviderProps) => {
  const [editedProvider, setEditedProvider] = useState<Provider | null>(null);

  useEffect(() => {
    if (providerToEdit) {
      setEditedProvider(providerToEdit);
    }
  }, [providerToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (editedProvider) {
      setEditedProvider((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };

  const handleEdit = () => {
    if (editedProvider) {
      onClose(); // Close the modal after editing
    }
  };

  if (!editedProvider) {
    return null; // Ensure the component doesn't render before provider data is loaded
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Provider</DialogTitle>
          <DialogDescription>
            Update the details of the provider.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="id"
            value={editedProvider.id}
            onChange={handleChange}
            placeholder="Provider ID"
            disabled
          />
          <Input
            name="name"
            value={editedProvider.name}
            onChange={handleChange}
            placeholder="Provider Name"
          />
          <select
            name="type"
            value={editedProvider.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-600 text-sm"
          >
            <option value="">Select Provider Type</option>
            {providerTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <Input
            name="domain"
            value={editedProvider.domain}
            onChange={handleChange}
            placeholder="Provider Domain"
          />
          <select
            name="token"
            value={editedProvider.token}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-600 text-sm"
          >
            <option value="">Select Token Type</option>
            {tokens.map((token) => (
              <option key={token.id} value={token.id}>
                {token.name}
              </option>
            ))}
          </select>
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

export default EditProvider;
