import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import { dbSchema, tableSchema } from "../../api/type";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

const viewSchemaModal: React.FC<{
  schema: dbSchema;
  onClose: () => void;
  onSubmit: (replicateTable: tableSchema[]) => void;
  loading: boolean;
}> = ({ schema, onClose, onSubmit, loading }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [open] = useState(true);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [selectedFields, setSelectedFields] = useState<
    Record<string, string[]>
  >({});

  const initializeDiagram = useCallback(() => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    let yOffset = 0;

    schema.databaseSchema.forEach((table, index) => {
      const tableNode: Node = {
        id: table.tableName,
        position: { x: index * 300, y: yOffset },
        data: {
          label: (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span style={{ marginRight: "4px" }}>📋</span>
                <strong>{table.tableName}</strong>
              </div>
              {table.columns.map((col) => (
                <div
                  key={col.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <span>
                    {col.constraints.includes("PRIMARY KEY") && (
                      <span style={{ marginRight: "4px" }}>🔑</span>
                    )}
                    {col.name}
                  </span>
                  <span style={{ color: "#888" }}>{col.type}</span>
                </div>
              ))}
            </div>
          ),
        },
        style: {
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: "10px 15px",
          width: 200,
          fontSize: "12px",
        },
      };
      newNodes.push(tableNode);

      table.columns.forEach((col) => {
        if (col.referenceTo) {
          const edge: Edge = {
            id: `${col.name}-${col.referenceTo.tableName}`,
            source: table.tableName,
            target: col.referenceTo.tableName,
            animated: true,
            style: { stroke: "#ff0072" },
          };
          newEdges.push(edge);
        }
      });

      yOffset += 200;
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [schema, setNodes, setEdges]);

  useEffect(() => {
    if (open) {
      initializeDiagram();
    }
  }, [open, initializeDiagram]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleFieldToggle = (
    tableName: string,
    fieldName: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    setSelectedFields((prev) => {
      const tableFields = prev[tableName] || [];
      if (tableFields.includes(fieldName)) {
        return {
          ...prev,
          [tableName]: tableFields.filter((f) => f !== fieldName),
        };
      }
      return {
        ...prev,
        [tableName]: [...tableFields, fieldName],
      };
    });
  };

  const handleTableToggle = (tableName: string) => {
    setSelectedTable(selectedTable === tableName ? null : tableName);
  };

  const handleSubmit = () => {
    const replicateTables: tableSchema[] = Object.keys(selectedFields)
      .map((tableName) => {
        const table = schema.databaseSchema.find(
          (t) => t.tableName === tableName
        );
        if (!table) return null;

        const selectedColumns = table.columns.filter((col) =>
          selectedFields[tableName].includes(col.name)
        );

        if (selectedColumns.length === 0) return null;

        return {
          tableName: table.tableName,
          columns: selectedColumns,
        };
      })
      .filter((table): table is tableSchema => table !== null);

    onSubmit(replicateTables);
    // onClose();
  };

  const handleCancel = () => {
    setSelectedFields({});
    setSelectedTable(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>{schema.databaseName}</DialogTitle>
        </DialogHeader>
        <div className="flex" style={{ height: "600px" }}>
          <div style={{ width: "80%", height: "100%" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
            >
              <MiniMap />
              <Controls />
              <Background />
            </ReactFlow>
          </div>

          <div
            style={{
              width: "20%",
              padding: "16px",
              borderLeft: "1px solid #ccc",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="flex-1 overflow-y-auto mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Choose the replicate tables and fields
              </h3>
              <div className="space-y-2">
                {schema.databaseSchema.map((table) => (
                  <div
                    key={table.tableName}
                    className={`p-3 border rounded cursor-pointer hover:bg-gray-100 ${
                      selectedTable === table.tableName
                        ? "bg-gray-200 border-gray-400"
                        : "border-gray-300"
                    }`}
                  >
                    <div
                      className="flex items-center mb-2"
                      onClick={() => handleTableToggle(table.tableName)}
                    >
                      <span className="mr-2">📋</span>
                      <strong>{table.tableName}</strong>
                    </div>
                    {selectedTable === table.tableName && (
                      <div className="space-y-1">
                        {table.columns.map((col) => (
                          <div
                            key={col.name}
                            className="flex items-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="checkbox"
                              checked={(
                                selectedFields[table.tableName] || []
                              ).includes(col.name)}
                              onClick={(e) =>
                                handleFieldToggle(table.tableName, col.name, e)
                              }
                              className="mr-2"
                              disabled={loading}
                            />
                            <span className="flex-1">
                              {col.constraints.includes("PRIMARY KEY") && (
                                <span className="mr-1">🔑</span>
                              )}
                              {col.name}
                            </span>
                            <span className="text-gray-500 text-sm">
                              ({col.type})
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
        {loading && <div className="circle-loader"></div>}
      </DialogContent>
    </Dialog>
  );
};

export default viewSchemaModal;
