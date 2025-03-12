import { CreateProviderResponse, EditProviderResponse, ProviderResponse, ProviderType } from "../type";
import axiosClient from "../axiosClient.ts";

const mockProviders: ProviderType[] = [
    { id: "ABC1", name: "truongkinhquinh", type: "SAML", applicationId: "App1", methodId: "Method1", methodName:"nnnn",proxyHostIp: "192.168.1.1", domainName: "---", callbackUrl: 'fb.com', createdAt: new Date().toISOString(), updateAt: new Date().toISOString() },
    { id: "ABC2", name: "tolaokien", type: "SAML", applicationId: "App2", methodId: "Method2",methodName:"nnnn", proxyHostIp: "192.168.1.2", domainName: "---", callbackUrl: 'fb.com', createdAt: new Date().toISOString(), updateAt: new Date().toISOString() },
];

const providerService = {
    
    getAllProviders: async (): Promise<{ contents: ProviderType[] }> => {
        try {
            const response = await axiosClient.get("/providers");
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createProvider: async (
        newProvider: ProviderType
      ): Promise<ProviderType> => {
        try {
            const response = await axiosClient.post("/providers", newProvider);
            return response.data;
          } catch (error) {
            throw error;
          }
    },

    editProvider: async (updatedProvider: ProviderType): Promise<EditProviderResponse> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const index = mockProviders.findIndex((provider) => provider.id === updatedProvider.id);
                if (index !== -1) {
                    mockProviders[index] = { ...updatedProvider, updateAt: new Date().toISOString() };
                    resolve({ success: true });
                } else {
                    resolve({ success: false });
                }
            }, 500);
        });
    },

    deleteProvider: async (id: string): Promise<{ success: boolean }> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const index = mockProviders.findIndex((provider) => provider.id === id);
                if (index !== -1) {
                    mockProviders.splice(index, 1);
                }
                resolve({ success: true });
            }, 500);
        });
    },

    deleteMultipleProviders: async (ids: string[]): Promise<{ success: boolean }> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                ids.forEach((id) => {
                    const index = mockProviders.findIndex((provider) => provider.id === id);
                    if (index !== -1) {
                        mockProviders.splice(index, 1);
                    }
                });
                resolve({ success: true });
            }, 500);
        });
    },
};

export default providerService;