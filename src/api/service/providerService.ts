import { CreateProviderResponse, EditProviderResponse, ProviderResponse, ProviderType } from "../type";

const mockProviders: ProviderType[] = [
    { id: "ABC1", name: "truongkinhquinh", type: "SAML", applicationId: "App1", methodId: "Method1", proxy_host_ip: "192.168.1.1", domain: "---", callbackURL: 'fb.com', createdAt: new Date().toISOString(), updateAt: new Date().toISOString() },
    { id: "ABC2", name: "tolaokien", type: "SAML", applicationId: "App2", methodId: "Method2", proxy_host_ip: "192.168.1.2", domain: "---", callbackURL: 'fb.com', createdAt: new Date().toISOString(), updateAt: new Date().toISOString() },
];

const providerService = {
    getAllProviders: async (): Promise<ProviderResponse> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ contents: mockProviders, totalElements: mockProviders.length });
            }, 500);
        });
    },

    createProvider: async (newProvider: Omit<ProviderType, 'id' | 'createdAt' | 'updateAt'>): Promise<CreateProviderResponse> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const providerWithId: ProviderType = {
                    ...newProvider,
                    id: `ABC${mockProviders.length + 1}`,
                    createdAt: new Date().toISOString(),
                    updateAt: new Date().toISOString()
                };
                mockProviders.push(providerWithId);
                resolve({ success: true });
            }, 500);
        });
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