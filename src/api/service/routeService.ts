// import axiosClient from "../axiosClient";
import { CreateRouteResponse, EditRouteResponse, Route, RouteResponse } from "../type";
const mockRoutes = [
  {
    id: "ABC1",
    name: "truongkinhquinh",
    created: "",
    protected: false,
  },
  {
    id: "ABC2",
    name: "tolaokien",
    created: "",
    protected: true,
  },
];

const tokenService = {
  getAllRoutes: async (): Promise<RouteResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ contents: mockRoutes, totalElements: mockRoutes.length });
      }, 500);
    });
  },

  createRoute: async (newRoutes: Route[]): Promise<CreateRouteResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        newRoutes.forEach((route) => {
          mockRoutes.push({ ...route, id: `ABC${mockRoutes.length + 1}` });
        });
        resolve({ success: true });
      }, 500);
    });
  },
  

  editRoute: async (updatedRoute: Route): Promise<EditRouteResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockRoutes.findIndex((token) => token.id === updatedRoute.id);
        if (index !== -1) {
          mockRoutes[index] = updatedRoute;
        }
        resolve({ success: true });
      }, 500);
    });
  },

  deleteRoute: async (id: string): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockRoutes.findIndex((token) => token.id === id);
        if (index !== -1) {
          mockRoutes.splice(index, 1);
        }
        resolve({ success: true });
      }, 500);
    });
  },
  deleteMultipleRoutes: async (ids: string[]): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        ids.forEach((id) => {
          const index = mockRoutes.findIndex((token) => token.id === id);
          if (index !== -1) {
            mockRoutes.splice(index, 1);
          }
        });
        resolve({ success: true });
      }, 500);
    });
  },

};

export default tokenService;
