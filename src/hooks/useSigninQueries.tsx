// import { useMutation } from "@tanstack/react-query";
import signinService from "../api/service/signinService";
import useMutationAction from "../provider/queryGlobal";
import {
  DbConfig,
  DbPreviewRequest,
  RegisterData,
  RegisterResponse,
  SigninData,
  SignInResponse,
  TableConfig,
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

export const useCheckConnection = () => {
  return useMutationAction<any, DbConfig>(
    ["signin"],
    signinService.checkConnection
  );
};

export const useGetSchema = () => {
  return useMutationAction<any, DbConfig>(["signin"], signinService.getSchema);
};

export const usePreviewData = () => {
  return useMutationAction<any, DbPreviewRequest>(
    ["signin"],
    signinService.previewData
  );
};

export const useSubmitConfig = () => {
  return useMutationAction<any, DbConfig>(
    ["signin"],
    signinService.submitConfig
  );
};

export const useSubmitTableConfig = () => {
  return useMutationAction<any, TableConfig>(
    ["signin"],
    signinService.submitTableConfig
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
