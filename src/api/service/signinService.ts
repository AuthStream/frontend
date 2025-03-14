import axiosClient from "../axiosClient";
import { RegisterData, RegisterResponse, SigninData, SignInResponse } from "../type";
const mockUsers = [
    { id: "ABC1", email: "admin@example.authstream", password: "Password123@", created: "2025-02-21T16:51:11.872Z" },
  ];
  
  const signinService = {
    login: async (data:SigninData):Promise<SignInResponse> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const user = mockUsers.find((user) => user.email === data.email && user.password === data.password);
          if (user) {
            resolve({ success: true, user });
          } else {
            resolve({ success: false, message: "Invalid email or password" });
          }
        }, 500);
      });
    },
  
    register: async (data:RegisterData):Promise<RegisterResponse> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const exists = mockUsers.some((user) => user.email === data.email);
          if (exists) {
            resolve({ success: false, message: "Email already registered" });
          } else {
            const user = { email:data.email,password:data.password, id: `ABC${mockUsers.length + 1}`, created: new Date().toISOString() };
            mockUsers.push(user);
            resolve({ success: true, user });
          }
        }, 500);
      });
    },
  
    resendKey: async (email: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const user = mockUsers.find((user) => user.email === email);
          if (user) {
            resolve({ success: true, message: "Verification key resent successfully" });
          } else {
            resolve({ success: false, message: "Email not found" });
          }
        }, 500);
      });
    },
  };
  
  export default signinService;