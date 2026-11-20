import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { examService } from "@/services/examService";

export const useActiveDashboardExams = () => {
  return useQuery({
    queryKey: ["active-dashboard-exams"],
    queryFn: async () => {
      const [resTersedia, resBerlangsung] = await Promise.all([
        examService.getMyExams({ status: "tersedia" }),
        examService.getMyExams({ status: "berlangsung" }),
      ]);

      const parseExams = (res: any) => {
        if (!res?.success) return [];
        const payload = res.data;
        if (Array.isArray(payload)) return payload;
        if (Array.isArray(payload?.data)) return payload.data;
        if (Array.isArray(payload?.exams)) return payload.exams;
        if (Array.isArray(payload?.rows)) return payload.rows;
        return [];
      };

      const tersedia = parseExams(resTersedia);
      const berlangsung = parseExams(resBerlangsung);

      return [...berlangsung, ...tersedia];
    },
  });
};

export const useExamsList = (params: any) => {
  return useQuery({
    queryKey: ["exams", params],
    queryFn: async () => {
      const response = await examService.getAll(params);
      if (!response.success) throw new Error("Gagal mengambil daftar ujian");
      const payload = response.data;
      const exams = Array.isArray(payload)
        ? payload
        : payload?.data ||
          payload?.exams ||
          payload?.items ||
          payload?.rows ||
          [];
      const pagination = payload?.pagination || {};
      const limit = Number(pagination.limit) || Number(params?.limit) || 10;
      const total = Number(
        pagination.total_data ??
          pagination.total ??
          (Array.isArray(exams) ? exams.length : 0),
      );
      const totalPages =
        Number(
          pagination.total_page ??
            pagination.total_pages ??
            Math.ceil(total / limit),
        ) || 1;
      const currentPage =
        Number(pagination.current_page ?? pagination.page ?? params?.page) || 1;

      return {
        data: exams,
        exams,
        pagination: {
          total_data: total,
          total_page: totalPages,
          total_pages: totalPages,
          current_page: currentPage,
          limit,
        },
      };
    },
    placeholderData: (previousData) => previousData,
  });
};

export const useExamDetail = (id: any, enabled = true) => {
  return useQuery({
    queryKey: ["exam", id],
    queryFn: async () => {
      const response = await examService.getById(id);
      if (!response.success) throw new Error("Gagal mengambil detail ujian");
      return response.data;
    },
    enabled: !!id && enabled,
  });
};

export const useCreateExam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data:any) => examService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
};

export const useUpdateExam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      examService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      queryClient.invalidateQueries({ queryKey: ["exam", variables.id] });
    },
  });
};

export const useDeleteExam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => examService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
};

export const useAssignExamQuestions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ examId, questionIds }: { examId: any; questionIds: any }) =>
      examService.assignQuestions(examId, questionIds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["exam", variables.examId] });
      queryClient.invalidateQueries({
        queryKey: ["exam-questions", variables.examId],
      });
    },
  });
};

export const useExamQuestions = (examId: any, enabled = true) => {
  return useQuery({
    queryKey: ["exam-questions", examId],
    queryFn: async () => {
      const response = await examService.getQuestions(examId);
      if (!response.success) throw new Error("Gagal mengambil soal ujian");
      return response.data;
    },
    enabled: !!examId && enabled,
  });
};

export const useMyExamsList = (params: any) => {
  return useQuery({
    queryKey: ["my-exams-list", params],
    queryFn: async () => {
      const response = await examService.getMyExams(params);
      if (!response.success)
        throw new Error("Gagal mengambil jadwal ujian saya");
      const payload = response.data;
      const exams = Array.isArray(payload)
        ? payload
        : payload?.data ||
          payload?.exams ||
          payload?.items ||
          payload?.rows ||
          payload?.results ||
          [];
      const pagination = Array.isArray(payload)
        ? {}
        : payload?.pagination || {};
      return {
        data: Array.isArray(exams) ? exams : [],
        pagination: {
          total_data: pagination.total_data || 0,
          total_pages: pagination.total_page || 1,
          current_page: pagination.current_page || 1,
          limit: pagination.limit || 10,
        },
      };
    },
  });
};

export const useMyAttempts = (enabled = true, params: any) => {
  return useQuery({
    queryKey: ["attempts-my", params],
    queryFn: async () => {
      const response = await examService.getMyAttempts(params);
      if (!response.success)
        throw new Error("Gagal mengambil riwayat ujian saya");
      const payload = response.data;
      const attempts = Array.isArray(payload)
        ? payload
        : payload?.data ||
          payload?.attempts ||
          payload?.items ||
          payload?.rows ||
          [];
      return {
        data: attempts,
        pagination: payload?.pagination || {
          total_data: attempts.length,
          total_page: 1,
          current_page: 1,
          limit: 10,
        },
      };
    },
    enabled,
  });
};

export const useAttemptsForTeacher = (enabled = true, params: any) => {
  return useQuery({
    queryKey: ["attempts-teacher", params],
    queryFn: async () => {
      const response = await examService.getMyAttemptsForTeacher(params);
      if (!response.success)
        throw new Error("Gagal mengambil riwayat pengerjaan");
      const payload = response.data;
      const attempts = Array.isArray(payload)
        ? payload
        : payload?.data ||
          payload?.attempts ||
          payload?.items ||
          payload?.rows ||
          [];
      return {
        data: attempts,
        pagination: payload?.pagination || {
          total_data: attempts.length,
          total_page: 1,
          current_page: 1,
          limit: 10,
        },
      };
    },
    enabled,
  });
};
