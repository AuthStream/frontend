// import axiosClient from "../axiosClient";
import { CreateApplicationResponse, EditApplicationResponse, Application, ApplicationResponse } from "../type";
const mockApplications = [
  { id: "ABC1", name: "truongkinhquinh", provider: "bmchien1", token: "---" },
  { id: "ABC2", name: "tolaokien", provider: "bmchien2", token: "---" },
  { id: "ABC3", name: "truongkinhquinh", provider: "bmchien3", token: "---" },
  { id: "ABC4", name: "tolaokien", provider: "bmchien4", token: "---" },
  { id: "ABC5", name: "tolaokien", provider: "bmchien5", token: "---" },
];

const applicationService = {
  getAllApplications: async (): Promise<ApplicationResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ contents: mockApplications, totalElements: mockApplications.length });
      }, 500);
    });
  },

  createApplication: async (newApplication: Application): Promise<CreateApplicationResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockApplications.push({ ...newApplication, id: `ABC${mockApplications.length + 1}` });
        resolve({ success: true });
      }, 500);
    });
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