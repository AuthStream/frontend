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

interface ImportUserProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
}

const ImportUser = ({ isOpen, onClose, onImport }: ImportUserProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (file) {
      onImport(file);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Users</DialogTitle>
          <DialogDescription>
            Upload a CSV file to import users. The file should follow this
            format:
            <pre className="bg-gray-100 p-2 mt-2 text-sm">
              username,password,dateCreated user1,pass123,2025-02-22
              user2,pass456,2025-02-22
            </pre>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input type="file" accept=".csv" onChange={handleFileChange} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleImport}
            disabled={!file}
          >
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportUser;
