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
import { Application } from "../../api/type";
import { ProviderType } from "../../api/type";
import { useGetProviders } from "../../hooks/useProviderQueries";

interface EditApplicationProps {
  isOpen: boolean;
  onClose: () => void;
  applicationToEdit: Application | null;
  onEdit: (updatedApplication: Application) => void;
}

const EditApplication = ({
  isOpen,
  onClose,
  applicationToEdit,
  onEdit,
}: EditApplicationProps) => {
  const { data: providers, isLoading, error } = useGetProviders();

  const [editedApplication, setEditedApplication] =
    useState<Application | null>(null);

  useEffect(() => {
    if (applicationToEdit) {
      setEditedApplication(applicationToEdit);
    }
  }, [applicationToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (editedApplication) {
      setEditedApplication((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };

  const handleEdit = () => {
    if (editedApplication) {
      onEdit(editedApplication);
      onClose();
    }
  };

  if (!editedApplication) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Application</DialogTitle>
          <DialogDescription>
            Update the details of the application.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="name"
            value={editedApplication.name}
            onChange={handleChange}
            placeholder="Application Name"
          />
          {isLoading ? (
            <p>Loading providers...</p>
          ) : providers && Array.isArray(providers) ? (
            <select
              name="providerId"
              value={editedApplication.providerId}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-600 text-sm"
            >
              <option value="">Select Provider</option>
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          ) : (
            <Button className="w-full bg-red-500 text-white hover:bg-red-600">
              No Applications Found - Create One
            </Button>
          )}
          <Input
            name="tokenId"
            value={editedApplication.tokenId}
            onChange={handleChange}
            placeholder="Application Token"
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

export default EditApplication;
