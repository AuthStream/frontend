import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import groupService from "../api/service/groupService";
import {
  Group,
  GroupResponse,
  CreateGroupResponse,
  EditGroupResponse,
} from "../api/type";
import useMutationAction from "../provider/queryGlobal";

export const useGetGroups = () => {
  return useQuery<GroupResponse>({
    queryKey: ["groups"],
    queryFn: groupService.getAllGroups,
  });
};

export const useCreateGroups = () => {
  return useMutationAction<CreateGroupResponse, Group>(
    ["groups"],
    groupService.createGroup
  );
};

export const useRefreshGroups = () => {
  const queryClient = useQueryClient();
  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["groups"] });
  };

  return { refresh };
};

export const useEditGroups = () => {
  return useMutationAction<EditGroupResponse, Group>(
    ["groups"],
    groupService.editGroup,
    {}
  );
};

export const useDeleteGroups = () => {
  return useMutationAction<{ success: boolean }, string>(
    ["groups"],
    groupService.deleteGroup,
    {}
  );
};

export const useDeleteMultipleGroups = () => {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean }, Error, string[]>({
    mutationFn: groupService.deleteMultipleGroups,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};
