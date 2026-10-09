import api from "@/config/api";

export interface GetMyExamsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  [key: string]: unknown;
}

export const examService = {
  getMyExams: async (params: GetMyExamsParams) => {
    const response = await api.get("/exams/my-exams", { params });
    return response.data;
  },
  startExam: async (id: string | number) => {
    const response = await api.get(`/exam-attempts/${id}/start`);
    return response.data;
  },
};
