// import axiosClient from "../axiosClient";
import { CreateProviderResponse, EditProviderResponse, ProviderResponse, ProviderType } from "../type";

const mockProviders = [
    { id: "ABC1", name: "truongkinhquinh", type: "LDAP", domain: "---", callBackUrl: 'fb.com', token: 'hihi' },
    { id: "ABC2", name: "tolaokien", type: "LDAP", domain: "---", callBackUrl: 'fb.com', token: 'hihi' },
    { id: "ABC3", name: "truongkinhquinh", type: "LDAP", domain: "---", callBackUrl: 'fb.com', token: 'hihi' },
    { id: "ABC4", name: "tolaokien", type: "LDAP", domain: "---", callBackUrl: 'fb.com', token: 'hihi' },
    { id: "ABC5", name: "tolaokien", type: "LDAP", domain: "---", callBackUrl: 'fb.com', token: 'hihi' },
];
const providerService = {
    getAllProviders: async (): Promise<ProviderResponse> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ contents: mockProviders, totalElements: mockProviders.length });
            }, 500);
        });
    },

    createProvider: async (newProvider: ProviderType): Promise<CreateProviderResponse> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                mockProviders.push({ ...newProvider, id: `ABC${mockProviders.length + 1}` });
                resolve({ success: true });
            }, 500);
        });
    },

    editProvider: async (updatedProvider: ProviderType): Promise<EditProviderResponse> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const index = mockProviders.findIndex((provider) => provider.id === updatedProvider.id);
                if (index !== -1) {
                    mockProviders[index] = updatedProvider;
                }
                resolve({ success: true });
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