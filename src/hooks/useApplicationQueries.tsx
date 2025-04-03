import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import applicationService from "../api/service/applicationService";
import {
  Application,
  ApplicationResponse,
  CreateApplicationResponse,
  EditApplicationResponse,
} from "../api/type";
import useMutationAction from "../provider/queryGlobal";
import { toast } from "react-toastify";

export const useGetApplications = () => {
  return useQuery<Application[]>({
    queryKey: ["applications"],
    queryFn: applicationService.getAllApplications,
  });
};

export const useCreateApplications = () => {
  const queryClient = useQueryClient();
  return useMutationAction<Application, Application>(
    ["applications"],
    applicationService.createApplication,
    {
      onSuccess: (newApplication) => {
        queryClient.setQueryData<Application[]>(["applications"], (oldData) => {
          return oldData ? [...oldData, newApplication] : [newApplication];
        });
        queryClient.invalidateQueries({ queryKey: ["applications"] });
      },
      onError: () => {
        toast.error("Failed to create application");
      },
    }
  );
};

export const useRefreshApplications = () => {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["applications"] });
    queryClient.refetchQueries({ queryKey: ["applications"] });
  };
  return { refresh };
};

export const useEditApplications = () => {
  const queryClient = useQueryClient();
  return useMutationAction<Application, Application>(
    ["applications"],
    applicationService.editApplication,
    {
      onSuccess: (updatedApplication) => {
        queryClient.setQueryData<Application[]>(["applications"], (oldData) => {
          return oldData
            ? oldData.map((app) =>
                app.id === updatedApplication.id ? updatedApplication : app
              )
            : [updatedApplication];
        });
        queryClient.invalidateQueries({ queryKey: ["applications"] });
        toast.success("Application updated successfully");
      },
      onError: () => {
        toast.error("Failed to edit application");
      },
    }
  );
};

export const useDeleteApplications = () => {
  const queryClient = useQueryClient();
  return useMutationAction<{ success: boolean }, string>(
    ["applications"],
    applicationService.deleteApplication,
    {
      onSuccess: (_, id) => {
        queryClient.setQueryData<Application[]>(["applications"], (oldData) => {
          return oldData ? oldData.filter((app) => app.id !== id) : [];
        });
        queryClient.invalidateQueries({ queryKey: ["applications"] });
        toast.success("Application deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete application");
      },
    }
  );
};

export const useDeleteMultipleApplications = () => {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean }, Error, string[]>({
    mutationFn: applicationService.deleteMultipleApplications,
    onSuccess: (_, ids) => {
      queryClient.setQueryData<Application[]>(["applications"], (oldData) => {
        return oldData ? oldData.filter((app) => !ids.includes(app.id)) : [];
      });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Selected applications deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete selected applications");
    },
  });
};
