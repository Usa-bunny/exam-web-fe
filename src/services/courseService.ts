import api from "../config/api";

export const courseService = {
  getAll: async (params: any) => {
    const response = await api.get("/courses", { params });
    return response.data;
  },
  getMyCourses: async () => {
    const response = await api.get("/courses/my-courses");
    return response.data;
  },
  getById: async (id: any) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post("/courses", data);
    return response.data;
  },
  update: async (id: any, data: any) => {
    const response = await api.put(`/courses/${id}`, data);
    return response.data;
  },
  delete: async (id: any) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },
};
