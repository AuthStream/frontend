import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useMutationAction from "../provider/queryGlobal";
import providerService from "../api/service/providerService";
import { ProviderType } from "../api/type";

export const useGetProviders = () => {
  return useQuery<ProviderType[]>({
    queryKey: ["providers"],
    queryFn: providerService.getAllProviders,
  });
};

export const useCreateProviders = () => {
  const queryClient = useQueryClient();
  return useMutationAction<ProviderType, ProviderType>(
    ["providers"],
    providerService.createProvider,
    {
      onSuccess: (newProvider) => {
        queryClient.setQueryData<ProviderType[]>(["providers"], (oldData) => {
          return oldData ? [...oldData, newProvider] : [newProvider];
        });
        queryClient.invalidateQueries({ queryKey: ["providers"] });
      },
    }
  );
};

export const useRefreshProviders = () => {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["providers"] });
    queryClient.refetchQueries({ queryKey: ["providers"] }); // Explicit refetch
  };
  return { refresh };
};

export const useEditProviders = () => {
  const queryClient = useQueryClient();
  return useMutationAction<ProviderType, ProviderType>(
    ["providers"],
    providerService.editProvider,
    {
      onSuccess: (updatedProvider) => {
        queryClient.setQueryData<ProviderType[]>(["providers"], (oldData) => {
          return oldData
            ? oldData.map((provider) =>
                provider.id === updatedProvider.id ? updatedProvider : provider
              )
            : [updatedProvider];
        });
        queryClient.invalidateQueries({ queryKey: ["providers"] });
      },
    }
  );
};

export const useDeleteProviders = () => {
  const queryClient = useQueryClient();
  return useMutationAction<{ success: boolean }, string>(
    ["providers"],
    providerService.deleteProvider,
    {
      onSuccess: (_, id) => {
        queryClient.setQueryData<ProviderType[]>(["providers"], (oldData) => {
          return oldData
            ? oldData.filter((provider) => provider.id !== id)
            : [];
        });
        queryClient.invalidateQueries({ queryKey: ["providers"] });
      },
    }
  );
};

export const useDeleteMultipleProvider = () => {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean }, Error, string[]>({
    mutationFn: providerService.deleteMultipleProviders,
    onSuccess: (_, ids) => {
      queryClient.setQueryData<ProviderType[]>(["providers"], (oldData) => {
        return oldData
          ? oldData.filter((provider) => !ids.includes(provider.id))
          : [];
      });
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    },
  });
};
