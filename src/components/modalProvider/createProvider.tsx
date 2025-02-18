// components/CreateProvider.tsx
import { useState } from "react";
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
import { ProviderType } from "../../api/type";
import { useGetTokens } from "../../hooks/useTokenQueries";
import { Token } from "../../api/type";

const providerTypes = [
  { id: "cloud", name: "Cloud" },
  { id: "hosting", name: "Hosting" },
  { id: "api", name: "API" },
  { id: "database", name: "Database" },
];

interface CreateProviderProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (provider: ProviderType) => void;
}

const CreateProvider = ({ isOpen, onClose, onCreate }: CreateProviderProps) => {
  const { data: tokens = [], isLoading, error } = useGetTokens();

  const [newProvider, setNewProvider] = useState<ProviderType>({
    id: "",
    name: "",
    type: "",
    domain: "",
    token: "",
    callBackUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProvider((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    // validate here

    onCreate(newProvider);
    console.log(newProvider);
    setNewProvider({
      id: "",
      name: "",
      type: "",
      domain: "",
      token: "",
      callBackUrl: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Provider</DialogTitle>
          <DialogDescription>
            Enter the details of the new provider.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="id"
            value={newProvider.id}
            onChange={handleChange}
            placeholder="Provider ID"
          />
          <Input
            name="name"
            value={newProvider.name}
            onChange={handleChange}
            placeholder="Provider Name"
          />
          <select
            name="type"
            value={newProvider.type}
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
            value={newProvider.domain}
            onChange={handleChange}
            placeholder="Provider Domain"
          />
          {isLoading ? (
            <p>Loading providers...</p>
          ) : error ? (
            <p className="text-red-500">Failed to load providers</p>
          ) : (
            <select
              name="provider"
              value={newProvider.token}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-600 text-sm"
            >
              <option value="">Select Token</option>
              {(Array.isArray(tokens) ? tokens : tokens?.contents ?? []).map(
                (token: Token) => (
                  <option key={token.id} value={token.id}>
                    {token.name}
                  </option>
                )
              )}
            </select>
          )}
          <Input
            name="callBackUrl"
            value={newProvider.callBackUrl}
            onChange={handleChange}
            placeholder="Provider Call Back Url"
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

export default CreateProvider;
