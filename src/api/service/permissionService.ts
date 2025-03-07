// import axiosClient from "../axiosClient";
import { CreatePermissionResponse, EditPermissionResponse, Permission, PermissionResponse } from "../type";
const mockPermissions = [
  { id: "ABC1", name: "truongkinhquinh", application: "bmchien1",created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC2", name: "tolaokien", application: "bmchien2", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC3", name: "truongkinhquinh", application: "bmchien3", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC4", name: "tolaokien", application: "bmchien4", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC5", name: "tolaokien", application: "bmchien5", created: "2025-02-21T16:51:11.872Z" },
];

const permissionService = {
  getAllPermissions: async (): Promise<PermissionResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ contents: mockPermissions, totalElements: mockPermissions.length });
      }, 500);
    });
  },

  createPermission: async (newPermission: Permission): Promise<CreatePermissionResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockPermissions.push({ ...newPermission, id: `ABC${mockPermissions.length + 1}` });
        resolve({ success: true });
      }, 500);
    });
  },

  editPermission: async (updatedPermission: Permission): Promise<EditPermissionResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockPermissions.findIndex((permission) => permission.id === updatedPermission.id);
        if (index !== -1) {
          mockPermissions[index] = updatedPermission;
        }
        resolve({ success: true });
      }, 500);
    });
  },

  deletePermission: async (id: string): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockPermissions.findIndex((permission) => permission.id === id);
        if (index !== -1) {
          mockPermissions.splice(index, 1);
        }
        resolve({ success: true });
      }, 500);
    });
  },
  deleteMultiplePermissions: async (ids: string[]): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        ids.forEach((id) => {
          const index = mockPermissions.findIndex((permission) => permission.id === id);
          if (index !== -1) {
            mockPermissions.splice(index, 1);
          }
        });
        resolve({ success: true });
      }, 500);
    });
  },
};

export default permissionService;