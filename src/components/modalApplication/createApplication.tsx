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
import { toast } from "react-toastify";
import { useGetProviders } from "../../hooks/useProviderQueries";
import { Application } from "../../api/type";

interface CreateApplicationProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (application: Application) => void;
}

const CreateApplication = ({
  isOpen,
  onClose,
  onCreate,
}: CreateApplicationProps) => {
  const { data: providers, isLoading, error } = useGetProviders();
  const [step, setStep] = useState(1);
  const [newApplication, setNewApplication] = useState<Application>({
    id: "",
    name: "",
    providerId: "",
    tokenId: "",
    adminId: "",
    createdAt: "",
    updateAt: "",
  });
  const [extraFields, setExtraFields] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewApplication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetApplication = () => {
    setNewApplication({
      id: "",
      name: "",
      providerId: "",
      tokenId: "",
      adminId: "",
      createdAt: "",
      updateAt: "",
    });
    setStep(1);
    setExtraFields([]);
  };

  const handleCreate = () => {
    const { name, tokenId } = newApplication;

    const trimmedName = name.trim();
    const trimmedToken = tokenId.trim();

    if (!trimmedName || !trimmedToken) {
      toast.warning("All fields are required and cannot be empty.");
      return;
    }
    // Kiểm tra token có hợp lệ không (ví dụ: tối thiểu 8 ký tự)
    if (trimmedToken.length < 8) {
      toast.warning("Application Token must be at least 8 characters long.");
      return;
    }

    // Gọi hàm onCreate với application đã được validate
    onCreate({
      ...newApplication,
      adminId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: trimmedName,
      tokenId: trimmedToken,
    });
    resetApplication();
    onClose();
  };

  // const handleCreate = () => {
  //   //validate data ở đây

  //   onCreate(newApplication);
  //   resetApplication();
  //   onClose();
  // };

  const handleClose = () => {
    resetApplication();
    onClose();
  };

  const handleAddField = () => {
    if (inputValue.trim() !== "") {
      setExtraFields([...extraFields, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveField = (index: number) => {
    setExtraFields(extraFields.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Application</DialogTitle>
          <DialogDescription>
            {step === 1 ? "Select a provider." : "Enter application details."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            name="name"
            value={newApplication.name}
            onChange={handleChange}
            placeholder="Application Name"
          />

          {isLoading ? (
            <p>Loading providers...</p>
          ) : providers && Array.isArray(providers) ? (
            <select
              name="providerId"
              value={newApplication.providerId}
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
            value={newApplication.tokenId}
            onChange={handleChange}
            placeholder="Application Token"
          />
        </div>
        <DialogFooter>
          {/* {step === 2 && (
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
          )}
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          {step === 2 && ( */}
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleCreate}
          >
            Create
          </Button>
          {/* )} */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateApplication;
