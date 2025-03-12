import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useMutationAction from "../provider/queryGlobal";
import providerService from "../api/service/providerService";
import {
  CreateProviderResponse,
  EditProviderResponse,
  ProviderResponse,
  ProviderType,
} from "../api/type";

export const useGetProviders = () => {
  return useQuery<ProviderResponse>({
    queryKey: ["providers"],
    queryFn: providerService.getAllProviders,
  });
};

export const useCreateProviders = () => {
  return useMutationAction<
    CreateProviderResponse,
    Omit<ProviderType, "id" | "createdAt" | "updateAt">
  >(["providers"], providerService.createProvider);
};

export const useRefreshProviders = () => {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["providers"] });
  };

  return { refresh };
};
export const useEditProviders = () => {
  return useMutationAction<EditProviderResponse, ProviderType>(
    ["providers"],
    providerService.editProvider,
    {}
  );
};
export const useDeleteProviders = () => {
  return useMutationAction<{ success: boolean }, string>(
    ["providers"],
    providerService.deleteProvider,
    {}
  );
};

export const useDeleteMultipleProvider = () => {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean }, Error, string[]>({
    mutationFn: providerService.deleteMultipleProviders,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    },
  });
};
