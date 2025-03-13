import { useMutation } from "@tanstack/react-query";
import signinService from "../api/service/signinService";

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  user?: any;
  message?: string;
}

interface ResendKeyRequest {
  email: string;
}

export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: async ({ email, password }) => {
      return (await signinService.login(email, password)) as AuthResponse;
    },
  });
};

export const useRegister = () => {
  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: async ({ email, password }) => {
      return (await signinService.register(email, password)) as AuthResponse;
    },
  });
};

export const useResendKey = () => {
  return useMutation<
    { success: boolean; message?: string },
    Error,
    ResendKeyRequest
  >({
    mutationFn: async ({ email }) => {
      return (await signinService.resendKey(email)) as {
        success: boolean;
        message?: string;
      };
    },
  });
};
