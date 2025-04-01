// import axiosClient from "../axiosClient";
import axiosClient from "../axiosClient";
import { CreateGroupResponse, EditGroupResponse, Group, GroupResponse } from "../type";
const mockGroups = [
  { id: "ABC1", email: "truongkinhquinh", password: "bmchien1", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC2", email: "tolaokien", password: "bmchien2", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC3", email: "truongkinhquinh", password: "bmchien3", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC4", email: "tolaokien", password: "bmchien4", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC5", email: "tolaokien", password: "bmchien5", created: "2025-02-21T16:51:11.872Z" },
];

const groupService = {
  getAllGroups: async (): Promise<Group[]> => {
    try {
      const response = await axiosClient.get("/groups");
      // console.log(response.data);
      return response.data;
  } catch (error) {
      throw error;
  }
  },

  createGroup: async (newGroup: Group): Promise<Group> => {
    try {
      const response = await axiosClient.post("/groups", newGroup);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  editGroup: async (updatedGroup: Group): Promise<Group> => {
    try {
      const response = await axiosClient.put(`/groups/${updatedGroup.id}`, updatedGroup);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteGroup: async (id: string): Promise<{ success: boolean }> => {
    try {
      await axiosClient.delete(`/groups/${id}`);
      return { success: true };
    } catch (error) {
      throw error;
    }
  },
  deleteMultipleGroups: async (ids: string[]): Promise<{ success: boolean }> => {
    try {
      await Promise.all(ids.map((id) => axiosClient.delete(`/groups/${id}`)));
      return { success: true };
    } catch (error) {
      throw error;
    }
  },
};

export default groupService;