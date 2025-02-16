// components/CreateProvider.tsx
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Input } from "../ui/input";

interface Provider {
    id: string;
    name: string;
    type: string;
    domain: string;
}

interface CreateProviderProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (provider: Provider) => void;
}

const CreateProvider = ({ isOpen, onClose, onCreate }: CreateProviderProps) => {
    const [newProvider, setNewProvider] = useState<Provider>({
        id: "",
        name: "",
        type: "",
        domain: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProvider((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreate = () => {
        onCreate(newProvider); // Gọi hàm onCreate từ TableProvider để xử lý thêm provider mới
        onClose(); // Đóng modal sau khi tạo
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Provider</DialogTitle>
                    <DialogDescription>Enter the details of the new provider.</DialogDescription>
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
                    <Input
                        name="type"
                        value={newProvider.type}
                        onChange={handleChange}
                        placeholder="Provider Type"
                    />
                    <Input
                        name="domain"
                        value={newProvider.domain}
                        onChange={handleChange}
                        placeholder="Provider Domain"
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={handleCreate}>
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateProvider;
