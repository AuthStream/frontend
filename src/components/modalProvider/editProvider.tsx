import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Input } from "../ui/input";

interface Provider {
    id: string;
    name: string;
    type: string;
    domain: string;
}

interface EditProviderProps {
    isOpen: boolean;
    onClose: () => void;
    providerToEdit: Provider | null;
}

const EditProvider = ({ isOpen, onClose, providerToEdit }: EditProviderProps) => {
    const [editedProvider, setEditedProvider] = useState<Provider | null>(null);

    useEffect(() => {
        if (providerToEdit) {
            setEditedProvider(providerToEdit);
        }
    }, [providerToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    <DialogDescription>Update the details of the provider.</DialogDescription>
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
                    <Input
                        name="type"
                        value={editedProvider.type}
                        onChange={handleChange}
                        placeholder="Provider Type"
                    />
                    <Input
                        name="domain"
                        value={editedProvider.domain}
                        onChange={handleChange}
                        placeholder="Provider Domain"
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={handleEdit}>
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditProvider;
