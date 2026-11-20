import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/userService";

export const useUsersList = (params: any) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      const response = await userService.getAll(params);
      if (!response.success) throw new Error("Gagal mengambil daftar pengguna");
      const payload = response.data;
      const users = Array.isArray(payload)
        ? payload
        : payload?.data ||
          payload?.users ||
          payload?.items ||
          payload?.rows ||
          [];
      const pagination = payload?.pagination || {};
      const limit = Number(pagination.limit) || Number(params?.limit) || 10;
      const total = Number(
        pagination.total_data ??
          pagination.total ??
          (Array.isArray(users) ? users.length : 0),
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
        data: users,
        users,
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

export const useUserDetail = (id: any, enabled = true) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await userService.getById(id);
      if (!response.success) throw new Error("Gagal mengambil detail pengguna");
      return response.data;
    },
    enabled: !!id && enabled,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      password?: string;
      role: string;
    }) => userService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      userService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => userService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
