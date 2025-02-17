// import axiosClient from "../axiosClient";
import { CreateTokenResponse, EditTokenResponse, Token, TokenResponse } from "../type";
const mockTokens = [
    {
      id: "ABC1",
      name: "truongkinhquinh",
      expired: 1000,
      body: "Sample body 1",
      encrypt: "tken1",
    },
    {
      id: "ABC2",
      name: "tolaokien",
      expired: 3000,
      body: "Sample body 2",
      encrypt: "tken2",
    },
  ];
  
  const tokenService = {
    getAllTokens: async (): Promise<TokenResponse> => {
        return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ contents: mockTokens, totalElements: mockTokens.length });
        }, 500);
      });
    },
  
    createToken: async (newToken: Token): Promise<CreateTokenResponse> => {
        return new Promise((resolve) => {
        setTimeout(() => {
          mockTokens.push({ ...newToken, id: `ABC${mockTokens.length + 1}` });
          resolve({ success: true });
        }, 500);
      });
    },
  
    editToken: async (updatedToken: Token): Promise<EditTokenResponse> => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const index = mockTokens.findIndex((token) => token.id === updatedToken.id);
            if (index !== -1) {
              mockTokens[index] = updatedToken;
            }
            resolve({ success: true });
          }, 500);
        });
      },
    
      deleteToken: async (id: string): Promise<{ success: boolean }> => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const index = mockTokens.findIndex((token) => token.id === id);
            if (index !== -1) {
              mockTokens.splice(index, 1);
            }
            resolve({ success: true });
          }, 500);
        });
      },
  };
  
  export default tokenService;