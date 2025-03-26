import React, { useState, useEffect } from "react";
import {
  useGetConfig,
  useGetTableConfig,
  useGetSchema,
  usePreviewData,
} from "../hooks/useSigninQueries";
import {
  DbConfig,
  TableConfig,
  dbSchema,
  TableData,
  DbPreviewRequest,
  tableSchema,
} from "../api/type";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Connection,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

const ConfigViewPage: React.FC = () => {
  const {
    data: dbConfigArray,
    isLoading: dbLoading,
    error: dbError,
  } = useGetConfig();
  // const {
  //   data: tableConfigArray,
  //   isLoading: tableLoading,
  //   error: tableError,
  // } = useGetTableConfig();

  // Take the first element of the arrays
  const dbConfig = dbConfigArray?.[0];
  // const tableConfig = tableConfigArray?.[0];

  // console.log("dbConfigArray", dbConfigArray);
  // console.log("dbConfig", dbConfig);
  // console.log("tableConfigArray", tableConfigArray);

  // console.log("tableConfig", tableConfig);
  // Schema Mutation
  const {
    mutate: fetchSchema,
    data: schemaData,
    isPending: schemaLoading,
    error: schemaError,
  } = useGetSchema();
  // Preview Data Mutation
  const {
    mutate: fetchPreviewData,
    data: previewData,
    isPending: previewLoading,
    error: previewError,
  } = usePreviewData();

  // Schema Diagram States
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Preview Data States
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [columnWidths, setColumnWidths] = useState<
    Record<string, Record<string, number>>
  >({});

  // Fetch Schema and Preview Data when dbConfig is available
  useEffect(() => {
    if (dbConfig?.id) {
      fetchSchema({ ...dbConfig, tableIncludeList: [] }); // Trigger schema fetch
      // console.log("schema", { ...dbConfig, tableIncludeList: [] });
      fetchPreviewData({
        connectionString: dbConfig.connectionString,
        tables: dbConfig.tableIncludeList,
      } as DbPreviewRequest);
    }
  }, [dbConfig, fetchSchema, fetchPreviewData]);

  // Initialize Schema Diagram
  const initializeDiagram = () => {
    if (!schemaData?.databaseSchema) return;

    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    let yOffset = 0;

    schemaData.databaseSchema.forEach((table: tableSchema, index: number) => {
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
  };

  useEffect(() => {
    if (schemaData) {
      initializeDiagram();
    }
  }, [schemaData]);

  const onConnect = (params: Edge | Connection) =>
    setEdges((eds) => addEdge(params, eds));

  // Initialize Preview Data Column Widths
  useEffect(() => {
    if (!previewData) return;

    const initialWidths: Record<string, Record<string, number>> = {};
    previewData.forEach((table: TableData) => {
      if (table.rows.length > 0) {
        const columns = Object.keys(table.rows[0]);
        initialWidths[table.tableName] = columns.reduce((acc, column) => {
          acc[column] = 150;
          return acc;
        }, {} as Record<string, number>);
      }
    });
    setColumnWidths(initialWidths);
    if (previewData.length > 0 && !selectedTable) {
      setSelectedTable(previewData[0].tableName);
    }
  }, [previewData]);

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

  const selectedTableData = previewData?.find(
    (table: { tableName: string | null }) => table.tableName === selectedTable
  );

  if (dbLoading || schemaLoading || previewLoading)
    return <div>Loading...</div>;
  if (dbError)
    return <div>Error loading database config: {dbError.message}</div>;
  // if (tableError)
  //   return <div>Error loading table config: {tableError.message}</div>;
  if (schemaError)
    return <div>Error loading schema: {schemaError.message}</div>;
  if (previewError)
    return <div>Error loading preview data: {previewError.message}</div>;

  return (
    <div className="p-6">
      {/* Two Column Config Display */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Database Config Column */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Database Configuration</h2>
          {dbConfig ? (
            <div className="space-y-2">
              <p>
                <strong>URI:</strong> {dbConfig.uri}
              </p>
              <p>
                <strong>Host:</strong> {dbConfig.host}
              </p>
              <p>
                <strong>Port:</strong> {dbConfig.port}
              </p>

              <p>
                <strong>Username:</strong> {dbConfig.databaseUsername}
              </p>
              <p>
                <strong>Database Type:</strong> {dbConfig.databaseType}
              </p>
              <p>
                <strong>SSL Mode:</strong> {dbConfig.sslMode}
              </p>
              <p>
                <strong>Connection String:</strong> {dbConfig.connectionString}
              </p>
            </div>
          ) : (
            <p>No database configuration available.</p>
          )}
        </div>

        {/* Table Config Column */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Table Configuration</h2>
          {/* {tableConfig ? (
            <div className="space-y-2">
              <p>
                <strong>Table:</strong> {tableConfig.userTable}
              </p>
              <p>
                <strong>Username Attribute:</strong>{" "}
                {tableConfig.usernameAttribute}
              </p>
              <p>
                <strong>Password Attribute:</strong>{" "}
                {tableConfig.passwordAttribute}
              </p>
              <p>
                <strong>Hashing Type:</strong> {tableConfig.hashingType}
              </p>
              <p>
                <strong>Salt:</strong> {tableConfig.salt}
              </p>
              <p>
                <strong>Hash Config:</strong>
              </p>
              <pre className="text-sm">
                {JSON.stringify(tableConfig.hashConfig, null, 2)}
              </pre>
            </div>
          ) : (
            <p>No table configuration available.</p>
          )} */}
        </div>
      </div>

      {/* Schema Relational Diagram */}
      <div className="mb-6 border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Schema Relational Diagram
        </h2>
        {schemaData?.databaseSchema?.length > 0 ? (
          <div style={{ height: "400px" }}>
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
        ) : (
          <p>No schema data available.</p>
        )}
      </div>

      {/* Preview Database */}
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Preview Database</h2>
        <div className="flex" style={{ height: "400px" }}>
          <div
            className="w-1/4 border-r p-4 overflow-y-auto"
            style={{ backgroundColor: "#f9fafb" }}
          >
            <h3 className="text-lg font-semibold mb-2">Tables</h3>
            <div className="space-y-1">
              {previewData?.map((table: TableData) => (
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
                        {selectedTableData.rows.map(
                          (
                            row: {
                              [x: string]:
                                | string
                                | number
                                | boolean
                                | React.ReactElement<
                                    any,
                                    string | React.JSXElementConstructor<any>
                                  >
                                | Iterable<React.ReactNode>
                                | React.ReactPortal
                                | null
                                | undefined;
                            },
                            rowIndex: React.Key | null | undefined
                          ) => (
                            <tr key={rowIndex} className="border">
                              {Object.keys(row)
                                .filter(
                                  (column) =>
                                    (columnWidths[
                                      selectedTableData.tableName
                                    ]?.[column] ?? 150) > 0
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
                          )
                        )}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigViewPage;
