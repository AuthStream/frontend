import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import tokenService from "../api/service/tokenService";
import { Token } from "../api/type";
import useMutationAction from "../provider/queryGlobal";
import { toast } from "react-toastify";

export const useGetTokens = () => {
  return useQuery<Token[]>({
    queryKey: ["tokens"],
    queryFn: tokenService.getAllTokens,
  });
};

export const useCreateToken = () => {
  const queryClient = useQueryClient();
  return useMutationAction<Token, Token>(["tokens"], tokenService.createToken, {
    onSuccess: (newToken) => {
      queryClient.setQueryData<Token[]>(["tokens"], (oldData) => {
        return oldData ? [...oldData, newToken] : [newToken];
      });
      queryClient.invalidateQueries({ queryKey: ["tokens"] });
    },
    onError: () => toast.error("Failed to create token"),
  });
};

export const useEditToken = () => {
  const queryClient = useQueryClient();
  return useMutationAction<Token, Token>(["tokens"], tokenService.editToken, {
    onSuccess: (updatedToken) => {
      queryClient.setQueryData<Token[]>(["tokens"], (oldData) => {
        return oldData
          ? oldData.map((token) =>
              token.id === updatedToken.id ? updatedToken : token
            )
          : [updatedToken];
      });
      queryClient.invalidateQueries({ queryKey: ["tokens"] });
    },
    onError: () => toast.error("Failed to edit token"),
  });
};

export const useDeleteToken = () => {
  const queryClient = useQueryClient();
  return useMutationAction<{ success: boolean }, string>(
    ["tokens"],
    tokenService.deleteToken,
    {
      onSuccess: (_, id) => {
        queryClient.setQueryData<Token[]>(["tokens"], (oldData) => {
          return oldData ? oldData.filter((token) => token.id !== id) : [];
        });
        queryClient.invalidateQueries({ queryKey: ["tokens"] });
      },
      onError: () => toast.error("Failed to delete token"),
    }
  );
};

export const useDeleteMultipleToken = () => {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean }, Error, string[]>({
    mutationFn: tokenService.deleteMultipleTokens,
    onSuccess: (_, ids) => {
      queryClient.setQueryData<Token[]>(["tokens"], (oldData) => {
        return oldData
          ? oldData.filter((token) => !ids.includes(token.id))
          : [];
      });
      queryClient.invalidateQueries({ queryKey: ["tokens"] });
    },
    onError: () => toast.error("Failed to delete selected tokens"),
  });
};

export const useRefreshTokens = () => {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["tokens"] });
    queryClient.refetchQueries({ queryKey: ["tokens"] }); // Explicit refetch
  };
  return { refresh };
};
