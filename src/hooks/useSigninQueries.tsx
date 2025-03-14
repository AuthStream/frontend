// import { useMutation } from "@tanstack/react-query";
import signinService from "../api/service/signinService";
import useMutationAction from "../provider/queryGlobal";
import {
  RegisterData,
  RegisterResponse,
  SigninData,
  SignInResponse,
} from "../api/type";

// interface ResendKeyRequest {
//   email: string;
// }

export const useLogin = () => {
  return useMutationAction<SignInResponse, SigninData>(
    ["signin"],
    signinService.login
  );
};

export const useRegister = () => {
  return useMutationAction<RegisterResponse, RegisterData>(
    ["signin"],
    signinService.register
  );
};

// export const useResendKey = () => {
//   return useMutation<
//     { success: boolean; message?: string },
//     Error,
//     ResendKeyRequest
//   >({
//     mutationFn: async ({ email }) => {
//       return (await signinService.resendKey(email)) as {
//         success: boolean;
//         message?: string;
//       };
//     },
//   });
// };
