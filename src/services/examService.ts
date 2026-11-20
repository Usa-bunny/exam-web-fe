import api from "../config/api";

export const examService = {
  getMyExams: async (params: any) => {
    const response = await api.get("/exams/my-exams", { params });
    return response.data;
  },
  startExam: async (id: any) => {
    const response = await api.post(`/exam-attempts/${id}/start`);
    return response.data;
  },
  getAll: async (params: any) => {
    const response = await api.get("/exams", { params });
    return response.data;
  },
  getById: async (id: any) => {
    const response = await api.get(`/exams/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post("/exams", data);
    return response.data;
  },
  update: async (id: any, data: any) => {
    const response = await api.put(`/exams/${id}`, data);
    return response.data;
  },
  delete: async (id: any) => {
    const response = await api.delete(`/exams/${id}`);
    return response.data;
  },
  assignQuestions: async (examId: any, questionIds: any) => {
    const response = await api.patch(`/exams/${examId}/questions`, {
      question_ids: questionIds,
    });
    return response.data;
  },
  getQuestions: async (examId: any) => {
    const response = await api.get(`/exams/${examId}/questions`);
    return response.data;
  },
  getExamDetail: async (id: any) => {
    const response = await api.get(`/exam-attempts/${id}/detail`);
    return response.data;
  },
  submitAnswer: async (examId: any, data: any) => {
    const response = await api.post(`/exam-attempts/${examId}/answer`, data);
    return response.data;
  },
  submitExam: async (examId: any) => {
    const response = await api.post(`/exam-attempts/${examId}/submit`);
    return response.data;
  },
  getMyAttempt: async (examId: any) => {
    const response = await api.get(`/exam-attempts/my-attempts/${examId}`);
    return response.data;
  },
  getMyAttempts: async (params: any) => {
    const response = await api.get("/exam-attempts/my-attempts", { params });
    return response.data;
  },
  getMyAttemptsForTeacher: async (params: any) => {
    const response = await api.get("/exam-attempts/teacher", { params });
    return response.data;
  },
  getAttemptDetailForTeacher: async (examId: any, userId: any) => {
    const response = await api.get(`/exam-attempts/${examId}`, {
      params: { user_id: userId },
    });
    return response.data;
  },
  correctAnswers: async (data: any) => {
    const response = await api.patch("/answers/correct", data);
    return response.data;
  },
  getActiveExams: async (params: any) => {
    const response = await api.get("/exams/active", { params });
    return response.data;
  },
  getExamMonitor: async (examId: any, params: any) => {
    const response = await api.get(`/exams/monitor/${examId}`, { params });
    return response.data;
  },
};
