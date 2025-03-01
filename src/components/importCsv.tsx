import { useState, ChangeEvent, FormEvent, DragEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface Route {
  id: string;
  name: string;
  created: string;
  protected: boolean;
}

interface ImportCSVProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (routes: Route[]) => void;
}

const ImportCSV = ({ isOpen, onClose, onImport }: ImportCSVProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<Route[]>([]);
  const fileReader = new FileReader();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      setFile(e.dataTransfer.files[0]);
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (file: File) => {
    fileReader.onload = (event) => {
      const text = event.target?.result as string;
      parseCSV(text);
    };
    fileReader.readAsText(file);
  };

  const parseCSV = (text: string) => {
    const rows = text.trim().split("\n");
    if (rows.length < 2) return;

    const headers = rows[0].split(",").map((h) => h.trim().toLowerCase());
    if (
      !headers.includes("id") ||
      !headers.includes("name") ||
      !headers.includes("created")
    ) {
      alert("Invalid CSV format: Missing 'id', 'name', or 'created' column.");
      return;
    }

    const parsedRoutes: Route[] = rows.slice(1).map((row) => {
      const values = row.split(",").map((v) => v.trim());
      return {
        id:
          values[headers.indexOf("id")] ||
          `ABC${Math.random().toString(36).substr(2, 5)}`,
        name: values[headers.indexOf("name")] || "",
        created: values[headers.indexOf("created")] || new Date().toISOString(),
        protected: headers.includes("protected")
          ? values[headers.indexOf("protected")].toLowerCase() === "true"
          : false,
      };
    });

    setPreviewData(parsedRoutes);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import CSV</DialogTitle>
          <DialogDescription>
            Drag & Drop or Click to Upload a CSV file
          </DialogDescription>
        </DialogHeader>

        <div
          className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <p className="text-gray-600">
            Drag and drop your CSV file here, or click to select one
          </p>
        </div>

        <input
          id="fileInput"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />

        {previewData.length > 0 && (
          <>
            <table className="w-full border-collapse border mt-4">
              <thead>
                <tr>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Created</th>
                  <th className="border p-2">Protected</th>
                </tr>
              </thead>
              <tbody>
                {previewData.map((item, index) => (
                  <tr key={index}>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.created || "N/A"}</td>
                    <td className="border p-2">
                      {item.protected ? "True" : "False"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              onClick={() => {
                onImport(previewData);
                onClose();
              }}
            >
              Import
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImportCSV;
