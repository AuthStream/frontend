import { Search, Plus, Edit, Trash, Trash2, RefreshCw } from "lucide-react";
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
import ImportRoute from "./importCsv";
import { useState } from "react";
import {
  useCreateRoute,
  useDeleteRoute,
  useDeleteMultipleRoute,
} from "../hooks/useRouteQueries";
import { toast } from "react-toastify";
import { Route } from "../api/type";
import DeleteConfirm from "./confirmBox";
import DeleteMultipleConfirm from "./confirmMultipleBox";

interface TableRouteProps {
  routes: Route[];
}

const TableRoute = ({ routes }: TableRouteProps) => {
  const [routeList, setRouteList] = useState(routes);

  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(routes.length / itemsPerPage);
  const currentRoutes = routes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const createRouteMutation = useCreateRoute();
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
    setSelectedRoutes(e.target.checked ? routes.map((t) => t.id) : []);
  };

  const onImport = async (newRoute: Route[]) => {
    try {
      createRouteMutation.mutate(newRoute, {
        onSuccess: () => {
          toast.success("Route created successfully");
        },
      });
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to create route");
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
          <Input placeholder="Search..." className="pl-10" />
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
            <TableHead>Protected</TableHead>
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
    </div>
  );
};

export default TableRoute;
