import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../services/courseService";

export const useCoursesList = (params: any) => {
  return useQuery({
    queryKey: ["courses", params],
    queryFn: async () => {
      const response = await courseService.getAll(params);
      if (!response.success)
        throw new Error("Gagal mengambil daftar mata pelajaran");
      const payload = response.data;
      const courses = Array.isArray(payload)
        ? payload
        : payload?.data ||
          payload?.courses ||
          payload?.items ||
          payload?.rows ||
          [];
      const pagination = payload?.pagination || {};
      const limit = Number(pagination.limit) || Number(params?.limit) || 10;
      const total = Number(
        pagination.total_data ??
          pagination.total ??
          (Array.isArray(courses) ? courses.length : 0),
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
        data: courses,
        courses,
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

export const useMyCoursesList = () => {
  return useQuery({
    queryKey: ["my-courses"],
    queryFn: async () => {
      const response = await courseService.getMyCourses();
      if (!response.success)
        throw new Error("Gagal mengambil mata pelajaran pengguna");
      return response.data;
    },
  });
};

export const useCourseDetail = (id: any, enabled = true) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const response = await courseService.getById(id);
      if (!response.success)
        throw new Error("Gagal mengambil detail mata pelajaran");
      return response.data;
    },
    enabled: !!id && enabled,
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      title: string;
      description: string;
      teacher_id: number;
      student_ids?: number[];
    }) => courseService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      courseService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["course", variables.id] });
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => courseService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
