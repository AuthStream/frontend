import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import tokenService from "../api/service/tokenService";
import { Token, TokenResponse, CreateTokenResponse, EditTokenResponse } from "../api/type";
import useMutationAction from "../provider/queryGlobal";

export const useGetTokens = () => {
    return useQuery<TokenResponse>({
        queryKey: ["tokens"],
        queryFn: tokenService.getAllTokens,
    });
};

export const useCreateToken = () => {
    return useMutationAction<CreateTokenResponse, Token>(["tokens"], tokenService.createToken, {});
};

export const useEditToken = () => {
    return useMutationAction<EditTokenResponse, Token>(["tokens"], tokenService.editToken, {});
};

export const useDeleteToken = () => {
    return useMutationAction<{ success: boolean }, string>(["tokens"], tokenService.deleteToken, {});
};


export const useDeleteMultipleToken = () => {
    const queryClient = useQueryClient();
    return useMutation<{ success: boolean }, Error, string[]>({
        mutationFn: tokenService.deleteMultipleTokens,
        onSettled: () => {
            // Invalidate query để làm mới dữ liệu sau khi mutation (thành công hoặc thất bại)
            queryClient.invalidateQueries({
                queryKey: ['tokens'],
            });
        },
    });
};
