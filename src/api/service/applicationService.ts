import axiosClient from "../axiosClient";
import { CreateApplicationResponse, EditApplicationResponse, Application, ApplicationResponse } from "../type";
const mockApplications = [
  { id: "ABC1", name: "truongkinhquinh", provider: "bmchien1", token: "---", createdAt: new Date().toISOString(), updateAt: new Date().toISOString()  },
  { id: "ABC2", name: "tolaokien", provider: "bmchien2", token: "---", createdAt: new Date().toISOString(), updateAt: new Date().toISOString()  },
  { id: "ABC3", name: "truongkinhquinh", provider: "bmchien3", token: "---", createdAt: new Date().toISOString(), updateAt: new Date().toISOString()  },
  { id: "ABC4", name: "tolaokien", provider: "bmchien4", token: "---", createdAt: new Date().toISOString(), updateAt: new Date().toISOString()  },
  { id: "ABC5", name: "tolaokien", provider: "bmchien5", token: "---", createdAt: new Date().toISOString(), updateAt: new Date().toISOString()  },
];

const applicationService = {
  getAllApplications: async (): Promise<Application[]> => {
    try {
      const response = await axiosClient.get("/applications");
      return response.data;
  } catch (error) {
      throw error;
  }
  },

  createApplication: async (newApplication: Application): Promise<Application> => {
    try {
      console.log(newApplication);
      const response = await axiosClient.post("/applications", newApplication);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  editApplication: async (updatedApplication: Application): Promise<EditApplicationResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockApplications.findIndex((application) => application.id === updatedApplication.id);
        if (index !== -1) {
          mockApplications[index] = updatedApplication;
        }
        resolve({ success: true });
      }, 500);
    });
  },

  deleteApplication: async (id: string): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockApplications.findIndex((application) => application.id === id);
        if (index !== -1) {
          mockApplications.splice(index, 1);
        }
        resolve({ success: true });
      }, 500);
    });
  },
  deleteMultipleApplications: async (ids: string[]): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        ids.forEach((id) => {
          const index = mockApplications.findIndex((application) => application.id === id);
          if (index !== -1) {
            mockApplications.splice(index, 1);
          }
        });
        resolve({ success: true });
      }, 500);
    });
  },
};

export default applicationService;