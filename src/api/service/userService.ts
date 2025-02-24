// import axiosClient from "../axiosClient";
import { CreateUserResponse, EditUserResponse, User, UserResponse } from "../type";
const mockUsers = [
  { id: "ABC1", email: "truongkinhquinh", password: "bmchien1", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC2", email: "tolaokien", password: "bmchien2", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC3", email: "truongkinhquinh", password: "bmchien3", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC4", email: "tolaokien", password: "bmchien4", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC5", email: "tolaokien", password: "bmchien5", created: "2025-02-21T16:51:11.872Z" },
];

const userService = {
  getAllUsers: async (): Promise<UserResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ contents: mockUsers, totalElements: mockUsers.length });
      }, 500);
    });
  },

  createUser: async (newUser: User): Promise<CreateUserResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockUsers.push({ ...newUser, id: `ABC${mockUsers.length + 1}` });
        resolve({ success: true });
      }, 500);
    });
  },

  editUser: async (updatedUser: User): Promise<EditUserResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockUsers.findIndex((user) => user.id === updatedUser.id);
        if (index !== -1) {
          mockUsers[index] = updatedUser;
        }
        resolve({ success: true });
      }, 500);
    });
  },

  deleteUser: async (id: string): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockUsers.findIndex((user) => user.id === id);
        if (index !== -1) {
          mockUsers.splice(index, 1);
        }
        resolve({ success: true });
      }, 500);
    });
  },
  deleteMultipleUsers: async (ids: string[]): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        ids.forEach((id) => {
          const index = mockUsers.findIndex((user) => user.id === id);
          if (index !== -1) {
            mockUsers.splice(index, 1);
          }
        });
        resolve({ success: true });
      }, 500);
    });
  },
};

export default userService;