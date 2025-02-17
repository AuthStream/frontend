import { useQuery } from "@tanstack/react-query";
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