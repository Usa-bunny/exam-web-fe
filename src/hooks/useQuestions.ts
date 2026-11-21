import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { questionService } from "@/services/questionService";

export const useQuestionsByCourse = (courseId: any, params: any) => {
  return useQuery({
    queryKey: ["questions-course", courseId, params],
    queryFn: async () => {
      const response = await questionService.getByCourseId(courseId, params);
      if (!response.success)
        throw new Error("Gagal mengambil daftar soal kelas");
      const payload = response.data;
      const questions = Array.isArray(payload)
        ? payload
        : payload?.data ||
          payload?.questions ||
          payload?.items ||
          payload?.rows ||
          [];
      const pagination = payload?.pagination || {};
      const limit = Number(pagination.limit) || Number(params?.limit) || 10;
      const total = Number(
        pagination.total_data ??
          pagination.total ??
          (Array.isArray(questions) ? questions.length : 0),
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
        data: questions,
        questions,
        pagination: {
          total_data: total,
          total_page: totalPages,
          total_pages: totalPages,
          current_page: currentPage,
          limit,
        },
      };
    },
    enabled: !!courseId,
    placeholderData: (previousData) => previousData,
  });
};

export const useQuestionsList = (params: any) => {
  return useQuery({
    queryKey: ["questions", params],
    queryFn: async () => {
      const response = await questionService.getAll(params);
      if (!response.success) throw new Error("Gagal mengambil daftar soal");
      const payload = response.data;
      const questions = Array.isArray(payload)
        ? payload
        : payload?.data ||
          payload?.questions ||
          payload?.items ||
          payload?.rows ||
          [];
      const pagination = payload?.pagination || {};
      const limit = Number(pagination.limit) || Number(params?.limit) || 10;
      const total = Number(
        pagination.total_data ??
          pagination.total ??
          (Array.isArray(questions) ? questions.length : 0),
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
        data: questions,
        questions,
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

export const useQuestionDetail = (id: any, enabled = true) => {
  return useQuery({
    queryKey: ["question", id],
    queryFn: async () => {
      const response = await questionService.getById(id);
      if (!response.success) throw new Error("Gagal mengambil detail soal");
      return response.data;
    },
    enabled: !!id && enabled,
  });
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data:any) => questionService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.invalidateQueries({ queryKey: ["questions-course"] });
    },
  });
};

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      questionService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.invalidateQueries({ queryKey: ["questions-course"] });
      queryClient.invalidateQueries({ queryKey: ["question", variables.id] });
    },
  });
};

// Hook untuk delete question
export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => questionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      queryClient.invalidateQueries({ queryKey: ["questions-course"] });
    },
  });
};
