import { Search, Plus, Trash, Trash2, RefreshCw, Save } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import ImportRoute from "./modalRoute/importCsv";
import { useState } from "react";
import {
  useCreateRoute,
  useEditRoute,
  useDeleteRoute,
  useDeleteMultipleRoute,
} from "../hooks/useRouteQueries";
import { toast } from "react-toastify";
import { Route } from "../api/type";
import DeleteConfirm from "./confirmBox";
import DeleteMultipleConfirm from "./confirmMultipleBox";
import DuplicateRoute from "./modalRoute/duplicateRoute";

interface TableRouteProps {
  routes: Route[];
}

const TableRoute = ({ routes }: TableRouteProps) => {
  const [routeList, setRouteList] = useState(routes);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  const [duplicateRoutes, setDuplicateRoutes] = useState<Route[]>([]);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [editedRoutes, setEditedRoutes] = useState<Route[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const itemsPerPage = 5;
  const filteredRoutes = routeList.filter((route) =>
    route.name.toLowerCase().includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredRoutes.length / itemsPerPage);

  const currentRoutes = filteredRoutes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const createRouteMutation = useCreateRoute();
  const editRouteMutation = useEditRoute();
  const deleteRouteMutation = useDeleteRoute();
  const deleteMultipleRouteMutation = useDeleteMultipleRoute();

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedRoutes((prev) =>
      prev.includes(id)
        ? prev.filter((routeId) => routeId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRoutes(e.target.checked ? filteredRoutes.map((t) => t.id) : []);
  };

  const handleSubmitChanges = () => {
    if (editedRoutes.length === 0) {
      toast.info("No changes to update.");
      return;
    }

    editRouteMutation.mutate(editedRoutes, {
      onSuccess: () => {
        toast.success("Routes updated successfully");
        setEditedRoutes([]);
      },
      onError: () => {
        toast.error("Failed to update routes");
      },
    });
  };

  const handleReplaceRoutes = (duplicates: Route[]) => {
    console.log(duplicates);
    editRouteMutation.mutate(duplicates, {
      onSuccess: () => {
        toast.success("Duplicate routes replaced successfully");
        setDuplicateRoutes([]);
        setIsDuplicateModalOpen(false);
      },
    });
  };

  const onImport = async (newRoute: Route[]) => {
    const existingNames = new Set(routeList.map((route) => route.name));
    const duplicates = newRoute.filter((route) =>
      existingNames.has(route.name)
    );
    const uniqueRoutes = newRoute.filter(
      (route) => !existingNames.has(route.name)
    );

    if (duplicates.length > 0) {
      setDuplicateRoutes(duplicates);
      setIsDuplicateModalOpen(true);
    } else {
      setDuplicateRoutes([]);
      setIsDuplicateModalOpen(false);
    }

    if (uniqueRoutes.length > 0) {
      createRouteMutation.mutate(uniqueRoutes, {
        onSuccess: () => {
          toast.success("Routes imported successfully");
        },
      });
    }
  };

  const handleCreateRoute = () => {
    setIsOpen(true);
  };

  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [idDelete, setIdDelete] = useState<string>("");

  const handleClickDeleteRoute = (id: string) => {
    setIdDelete(id);
    setIsOpenConfirm(true);
  };

  const handleToggleProtected = (id?: string, currentStatus?: boolean) => {
    let updatedRoutes;
    if (id) {
      updatedRoutes = routeList.map((route) =>
        route.id === id ? { ...route, protected: !currentStatus } : route
      );
    } else {
      const allSelected = filteredRoutes.every((route) => route.protected);
      updatedRoutes = routeList.map((route) =>
        filteredRoutes.some((r) => r.id === route.id)
          ? { ...route, protected: !allSelected }
          : route
      );
    }
    setRouteList(updatedRoutes);

    setEditedRoutes((prev) => {
      const updated = new Map(prev.map((r) => [r.id, r]));

      updatedRoutes.forEach((route) => {
        if (filteredRoutes.some((r) => r.id === route.id)) {
          updated.set(route.id, route);
        }
      });

      return Array.from(updated.values());
    });
  };

  const handleSelectAllProtected = () => {
    handleToggleProtected();
  };

  const handleDeleteRoute = async (id: string) => {
    try {
      deleteRouteMutation.mutate(id, {
        onSuccess: () => {
          const updatedRoutes = routeList.filter((route) => route.id !== id);

          setRouteList(updatedRoutes);

          const newTotalPages = Math.ceil(updatedRoutes.length / itemsPerPage);

          if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages || 1);
          }
          toast.success("Route deleted successfully");
        },
      });
    } catch (error) {
      toast.error("Failed to delete route");
    }
  };

  const [isOpenConfirmMultiple, setIsOpenConfirmMultiple] = useState(false);

  const handleDeleteSelected = () => {
    if (selectedRoutes.length === 0) {
      toast.warn("No routes selected");
      return;
    }
    setIsOpenConfirmMultiple(true);
  };

  const handleDeleteSelectedRoutes = () => {
    if (selectedRoutes.length === 0) {
      toast.warn("No routes selected");
      return;
    }
    try {
      deleteMultipleRouteMutation.mutate(selectedRoutes, {
        onSuccess: () => {
          const updatedRoute = routeList.filter(
            (route) => !selectedRoutes.includes(route.id)
          );

          setRouteList(updatedRoute);
          setSelectedRoutes([]);

          const newTotalPages = Math.ceil(updatedRoute.length / itemsPerPage);
          if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages || 1);
          }
          toast.success("Routes deleted successfully");
        },
      });
    } catch (error) {
      toast.error("Failed to delete selected routes");
    }
  };
  return (
    <div className="w-full bg-white dark:bg-background border p-5 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-1/3">
          <Input
            placeholder="Search..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        <div className="space-x-2">
          <Button
            onClick={handleCreateRoute}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" /> Import
          </Button>

          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
          <Button
            onClick={handleDeleteSelected}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </Button>

          <Button
            onClick={handleSubmitChanges}
            className="bg-green-500 text-white hover:bg-green-600"
          >
            <Save className="w-4 h-4 mr-2" /> Submit Changes
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedRoutes.length === routes.length}
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-32">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={handleSelectAllProtected}
                  checked={
                    filteredRoutes.length > 0 &&
                    filteredRoutes.every((route) => route.protected)
                  }
                  disabled={filteredRoutes.length === routeList.length}
                />
                <span>Protected</span>
              </div>
            </TableHead>

            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentRoutes.map((route) => (
            <TableRow key={route.id}>
              <TableCell>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(route.id)}
                  checked={selectedRoutes.includes(route.id)}
                />
              </TableCell>
              <TableCell>{route.id}</TableCell>
              <TableCell>{route.name}</TableCell>
              <TableCell>{route.created}</TableCell>
              <TableCell>
                <input
                  type="checkbox"
                  checked={route.protected}
                  onChange={() =>
                    handleToggleProtected(route.id, route.protected)
                  }
                />
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleClickDeleteRoute(route.id)}
                  variant="destructive"
                  size="icon"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-4 text-gray-500">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      <ImportRoute
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onImport={onImport}
      />

      <DeleteConfirm
        isOpen={isOpenConfirm}
        onClose={() => setIsOpenConfirm(false)}
        onConfirm={handleDeleteRoute}
        providerId={idDelete}
        type="Route"
      />
      <DeleteMultipleConfirm
        isOpen={isOpenConfirmMultiple}
        onClose={() => setIsOpenConfirmMultiple(false)}
        onConfirm={handleDeleteSelectedRoutes}
        selectedArray={selectedRoutes}
        type={"route"}
      />
      <DuplicateRoute
        isOpen={isDuplicateModalOpen}
        onClose={() => setIsDuplicateModalOpen(false)}
        duplicates={duplicateRoutes}
        onReplace={handleReplaceRoutes}
      />
    </div>
  );
};

export default TableRoute;
