import axiosClient from "../axiosClient";
import { SignInResponse } from "../type";
const mockUsers = [
    { id: "ABC1", email: "truongkinhquinh", password: "bmchien1", created: "2025-02-21T16:51:11.872Z" },
    { id: "ABC2", email: "tolaokien", password: "bmchien2", created: "2025-02-21T16:51:11.872Z" },
  ];
  
  const signinService = {
    login: async (email: string, password: string):Promise<SignInResponse> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const user = mockUsers.find((user) => user.email === email && user.password === password);
          if (user) {
            resolve({ success: true, user });
          } else {
            resolve({ success: false, message: "Invalid email or password" });
          }
        }, 500);
      });
    },
  
    register: async (email: string, password: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const exists = mockUsers.some((user) => user.email === email);
          if (exists) {
            resolve({ success: false, message: "Email already registered" });
          } else {
            const user = { email:email, password:password, id: `ABC${mockUsers.length + 1}`, created: new Date().toISOString() };
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