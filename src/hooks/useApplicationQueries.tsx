import { useQuery, useQueryClient } from "@tanstack/react-query";
import applicationService from "../api/service/applicationService";
import { Application, ApplicationResponse, CreateApplicationResponse, EditApplicationResponse } from "../api/type";
import useMutationAction from "../provider/queryGlobal";

export const useGetApplications = () => {
    return useQuery<ApplicationResponse>({
        queryKey: ["applications"],
        queryFn: applicationService.getAllApplications,
    });
};

export const useCreateApplications = () => {
    return useMutationAction<CreateApplicationResponse, Application>(["applications"], applicationService.createApplication);
};

export const useRefreshApplications = () => {
    const queryClient = useQueryClient();
    const refresh = () => {
        queryClient.invalidateQueries({ queryKey: ["applications"] });
    };

    return { refresh };
};
export const useEditApplications = () => {
    return useMutationAction<EditApplicationResponse, Application>(["applications"], applicationService.editApplication, {});
};
export const useDeleteApplications = () => {
    return useMutationAction<{ success: boolean }, string>(["applications"], applicationService.deleteApplication, {});
};

// đây là code queri Mutation gốc, nếu a có cần

// export const useEditApplications = () => {
//     const queryClient = useQueryClient();
//     return useMutation<EditApplicationResponse, Error, Application>({
//         mutationFn: applicationService.editApplication,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["applications"] });
//         },
//     });
// };

// export const useDeleteApplications = () => {
//     const queryClient = useQueryClient();
//     return useMutation<{ success: boolean }, Error, string>({
//         mutationFn: applicationService.deleteApplication,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["applications"] });
//         },
//     });
// };
