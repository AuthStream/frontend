import axiosClient from "../axiosClient";
import { RegisterData, RegisterResponse, SigninData, SignInResponse } from "../type";

  const signinService = {
    login: async (data:SigninData):Promise<SignInResponse> => {
      try{
        const response=await axiosClient.post("/auth/login",data);
        return response.data;
      }
      catch(error){
        throw error;
      }
    },
  
    register: async (data:RegisterData):Promise<RegisterResponse> => {
      try{
        const response=await axiosClient.post("/users",data);
        return response.data;
      }
      catch(error){
        throw error;
      }
    },
  
    // resendKey: async (email: string) => {
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       const user = mockUsers.find((user) => user.username === username);
    //       if (user) {
    //         resolve({ success: true, message: "Verification key resent successfully" });
    //       } else {
    //         resolve({ success: false, message: "Email not found" });
    //       }
    //     }, 500);
    //   });
    // },
  };
  
  export default signinService;