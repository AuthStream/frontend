// import axiosClient from "../axiosClient";
import axiosClient from "../axiosClient";
import { CreateUserResponse, EditUserResponse, User, UserResponse } from "../type";
const mockUsers = [
  { id: "ABC1", email: "truongkinhquinh", password: "bmchien1", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC2", email: "tolaokien", password: "bmchien2", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC3", email: "truongkinhquinh", password: "bmchien3", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC4", email: "tolaokien", password: "bmchien4", created: "2025-02-21T16:51:11.872Z" },
  { id: "ABC5", email: "tolaokien", password: "bmchien5", created: "2025-02-21T16:51:11.872Z" },
];

const userService = {
  getAllUsers: async (): Promise<User> => {
    try {
      const response = await axiosClient.get("/users");
      return response.data;
    } catch (error) {
        throw error;
    }
  },

  createUser: async (newUser: User): Promise<User> => {
    try {
      const response = await axiosClient.post("/users", newUser);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  editUser: async (updatedUser: User): Promise<User> => {
    try {
      const response = await axiosClient.put("/users", updatedUser);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id: string): Promise<{ success: boolean }> => {
    try {
      await axiosClient.delete(`/users/${id}`);
      return { success: true };
    } catch (error) {
      throw error;
    }
  },
  deleteMultipleUsers: async (ids: string[]): Promise<{ success: boolean }> => {
    try {
      await Promise.all(ids.map((id) => axiosClient.delete(`/users/${id}`)));
      return { success: true };
    } catch (error) {
      throw error;
    }
  },
};

export default userService;