import React, { useCallback, useState } from "react";
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
import { dbSchema } from "../../api/type";
import { Dialog, DialogContent } from "../ui/dialog";

const viewSchemaModal: React.FC<{
  schema: dbSchema;
  onClose: () => void;
}> = ({ schema, onClose }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [open, setOpen] = useState(true);

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
              </div>{" "}
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

  React.useEffect(() => {
    if (open) {
      initializeDiagram();
    }
  }, [open, initializeDiagram]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <h2>Relational Diagram - {schema.databaseName}</h2>
        <div style={{ height: "600px", width: "100%" }}>
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
      </DialogContent>
    </Dialog>
  );
};

export default viewSchemaModal;
