import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { TableData } from "../../api/type";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

interface PreviewDataModalProps {
  previewData: TableData[];
  onSubmit: () => void;
  onClose: () => void;
}

const PreviewDataModal: React.FC<PreviewDataModalProps> = ({
  previewData,
  onSubmit,
  onClose,
}) => {
  const [open] = useState(true);
  const [selectedTable, setSelectedTable] = useState<string | null>(
    previewData.length > 0 ? previewData[0].tableName : null
  );
  const [columnWidths, setColumnWidths] = useState<
    Record<string, Record<string, number>>
  >({});

  useEffect(() => {
    const initialWidths: Record<string, Record<string, number>> = {};
    previewData.forEach((table) => {
      if (table.rows.length > 0) {
        const columns = Object.keys(table.rows[0]);
        initialWidths[table.tableName] = columns.reduce((acc, column) => {
          acc[column] = 150;
          return acc;
        }, {} as Record<string, number>);
      }
    });
    setColumnWidths(initialWidths);
  }, [previewData]);

  const handleClose = () => {
    setSelectedTable(null);
    onClose();
  };

  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  const handleResize =
    (tableName: string, column: string) =>
    (_e: any, { size }: { size: { width: number } }) => {
      setColumnWidths((prev) => ({
        ...prev,
        [tableName]: {
          ...prev[tableName],
          [column]: Math.max(size.width, 0),
        },
      }));
    };

  const selectedTableData = previewData.find(
    (table) => table.tableName === selectedTable
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Preview Data View</DialogTitle>
        </DialogHeader>
        <div className="flex" style={{ height: "600px" }}>
          <div
            className="w-1/4 border-r p-4 overflow-y-auto"
            style={{ backgroundColor: "#f9fafb" }}
          >
            <h3 className="text-lg font-semibold mb-2">Tables</h3>
            <div className="space-y-1">
              {previewData.map((table) => (
                <div
                  key={table.tableName}
                  className={`p-2 rounded cursor-pointer hover:bg-gray-200 ${
                    selectedTable === table.tableName
                      ? "bg-gray-300 font-semibold"
                      : "bg-transparent"
                  }`}
                  onClick={() => setSelectedTable(table.tableName)}
                >
                  <span className="mr-2">📋</span>
                  {table.tableName}
                </div>
              ))}
            </div>
          </div>

          <div className="w-3/4 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              {selectedTableData ? (
                selectedTableData.rows.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr>
                          {Object.keys(selectedTableData.rows[0])
                            .filter(
                              (column) =>
                                (columnWidths[selectedTableData.tableName]?.[
                                  column
                                ] ?? 150) > 0
                            )
                            .map((column) => (
                              <Resizable
                                key={column}
                                width={
                                  columnWidths[selectedTableData.tableName]?.[
                                    column
                                  ] ?? 150
                                }
                                height={0}
                                onResize={handleResize(
                                  selectedTableData.tableName,
                                  column
                                )}
                                resizeHandles={["e"]}
                                minConstraints={[0, 0]}
                                maxConstraints={[500, 0]}
                              >
                                <th
                                  className="border p-2 bg-gray-100 text-left"
                                  style={{
                                    width:
                                      columnWidths[
                                        selectedTableData.tableName
                                      ]?.[column] ?? 150,
                                  }}
                                >
                                  {column}
                                </th>
                              </Resizable>
                            ))}
                        </tr>
                      </thead>
                      <tbody>
                        {selectedTableData.rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className="border">
                            {Object.keys(row)
                              .filter(
                                (column) =>
                                  (columnWidths[selectedTableData.tableName]?.[
                                    column
                                  ] ?? 150) > 0
                              )
                              .map((column, colIndex) => (
                                <td
                                  key={colIndex}
                                  className="border p-2"
                                  style={{
                                    width:
                                      columnWidths[
                                        selectedTableData.tableName
                                      ]?.[column] ?? 150,
                                  }}
                                >
                                  {row[column]}
                                </td>
                              ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No data available for this table.
                  </p>
                )
              ) : (
                <p className="text-gray-500">
                  Select a table to preview its data.
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 p-4">
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button variant="outline" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDataModal;
