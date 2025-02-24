// import axiosClient from "../axiosClient";
import { CreateGroupResponse, EditGroupResponse, Group, GroupResponse } from "../type";
const mockGroups = [
  { id: "ABC1", email: "truongkinhquinh", password: "bmchien1", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC2", email: "tolaokien", password: "bmchien2", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC3", email: "truongkinhquinh", password: "bmchien3", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC4", email: "tolaokien", password: "bmchien4", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC5", email: "tolaokien", password: "bmchien5", created: "2025-02-21T16:51:11.872Z" },
];

const groupService = {
  getAllGroups: async (): Promise<GroupResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ contents: mockGroups, totalElements: mockGroups.length });
      }, 500);
    });
  },

  createGroup: async (newGroup: Group): Promise<CreateGroupResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockGroups.push({ ...newGroup, id: `ABC${mockGroups.length + 1}` });
        resolve({ success: true });
      }, 500);
    });
  },

  editGroup: async (updatedGroup: Group): Promise<EditGroupResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockGroups.findIndex((group) => group.id === updatedGroup.id);
        if (index !== -1) {
          mockGroups[index] = updatedGroup;
        }
        resolve({ success: true });
      }, 500);
    });
  },

  deleteGroup: async (id: string): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockGroups.findIndex((group) => group.id === id);
        if (index !== -1) {
          mockGroups.splice(index, 1);
        }
        resolve({ success: true });
      }, 500);
    });
  },
  deleteMultipleGroups: async (ids: string[]): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        ids.forEach((id) => {
          const index = mockGroups.findIndex((group) => group.id === id);
          if (index !== -1) {
            mockGroups.splice(index, 1);
          }
        });
        resolve({ success: true });
      }, 500);
    });
  },
};

export default groupService;