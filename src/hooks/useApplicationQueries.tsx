import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import applicationService from "../api/service/applicationService";
import { Application, ApplicationResponse, CreateApplicationResponse, EditApplicationResponse } from "../api/type";

export const useGetApplications = () => {
    return useQuery<ApplicationResponse>({
        queryKey: ["applications"],
        queryFn: applicationService.getAllApplications,
    });
};

export const useCreateApplications = () => {
    const queryClient = useQueryClient();
    return useMutation<CreateApplicationResponse, Error, Application>({
        mutationFn: applicationService.createApplication,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["applications"] });
        },
    });
};

export const useRefreshApplications = () => {
    const queryClient = useQueryClient();

    // Trả về một hàm để gọi khi cần refresh
    const refresh = () => {
        queryClient.invalidateQueries({ queryKey: ["applications"] });
    };

    return { refresh };
};


export const useEditApplications = () => {
    const queryClient = useQueryClient();
    return useMutation<EditApplicationResponse, Error, Application>({
        mutationFn: applicationService.editApplication,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["applications"] });
        },
    });
};

export const useDeleteApplications = () => {
    const queryClient = useQueryClient();
    return useMutation<{ success: boolean }, Error, string>({
        mutationFn: applicationService.deleteApplication,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["applications"] });
        },
    });
};
