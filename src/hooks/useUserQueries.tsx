import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userService from "../api/service/userService";
import {
  User,
  UserResponse,
  CreateUserResponse,
  EditUserResponse,
} from "../api/type";
import useMutationAction from "../provider/queryGlobal";

export const useGetUsers = () => {
  return useQuery<UserResponse>({
    queryKey: ["users"],
    queryFn: userService.getAllUsers,
  });
};

export const useCreateUsers = () => {
  return useMutationAction<CreateUserResponse, User>(
    ["users"],
    userService.createUser
  );
};

export const useRefreshUsers = () => {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  return { refresh };
};

export const useEditUsers = () => {
  return useMutationAction<EditUserResponse, User>(
    ["users"],
    userService.editUser,
    {}
  );
};

export const useDeleteUsers = () => {
  return useMutationAction<{ success: boolean }, string>(
    ["users"],
    userService.deleteUser,
    {}
  );
};

export const useDeleteMultipleUsers = () => {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean }, Error, string[]>({
    mutationFn: userService.deleteMultipleUsers,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
