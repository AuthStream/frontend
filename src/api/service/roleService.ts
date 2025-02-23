// import axiosClient from "../axiosClient";
import { CreateRoleResponse, EditRoleResponse, Role, RoleResponse } from "../type";
const mockRoles = [
  { id: "ABC1", name: "truongkinhquinh", application: "bmchien1",created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC2", name: "tolaokien", application: "bmchien2", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC3", name: "truongkinhquinh", application: "bmchien3", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC4", name: "tolaokien", application: "bmchien4", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC5", name: "tolaokien", application: "bmchien5", created: "2025-02-21T16:51:11.872Z" },
];

const roleService = {
  getAllRoles: async (): Promise<RoleResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ contents: mockRoles, totalElements: mockRoles.length });
      }, 500);
    });
  },

  createRole: async (newRole: Role): Promise<CreateRoleResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockRoles.push({ ...newRole, id: `ABC${mockRoles.length + 1}` });
        resolve({ success: true });
      }, 500);
    });
  },

  editRole: async (updatedRole: Role): Promise<EditRoleResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockRoles.findIndex((role) => role.id === updatedRole.id);
        if (index !== -1) {
          mockRoles[index] = updatedRole;
        }
        resolve({ success: true });
      }, 500);
    });
  },

  deleteRole: async (id: string): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockRoles.findIndex((role) => role.id === id);
        if (index !== -1) {
          mockRoles.splice(index, 1);
        }
        resolve({ success: true });
      }, 500);
    });
  },
  deleteMultipleRoles: async (ids: string[]): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        ids.forEach((id) => {
          const index = mockRoles.findIndex((role) => role.id === id);
          if (index !== -1) {
            mockRoles.splice(index, 1);
          }
        });
        resolve({ success: true });
      }, 500);
    });
  },
};

export default roleService;