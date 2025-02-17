import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import tokenService from "../api/service/tokenService";
import { Token, TokenResponse, CreateTokenResponse, EditTokenResponse } from "../api/type";

export const useGetTokens = () => {
    return useQuery<TokenResponse>({
        queryKey: ["tokens"],
        queryFn: tokenService.getAllTokens,
    });
};

export const useCreateToken = () => {
    const queryClient = useQueryClient();
    return useMutation<CreateTokenResponse, Error, Token>({
        mutationFn: tokenService.createToken,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tokens"] }); // Refetch tokens
        },
    });
};

export const useEditToken = () => {
    const queryClient = useQueryClient();
    return useMutation<EditTokenResponse, Error, Token>({
        mutationFn: tokenService.editToken,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tokens"] });
        },
    });
};

export const useDeleteToken = () => {
    const queryClient = useQueryClient();
    return useMutation<{ success: boolean }, Error, string>({
        mutationFn: tokenService.deleteToken,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tokens"] });
        },
    });
};
