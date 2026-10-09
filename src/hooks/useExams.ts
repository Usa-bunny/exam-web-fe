import { examService } from "@/services/examService";
import { useQuery } from "@tanstack/react-query";

export const useActiveDashboardExams = () => {
  return useQuery({
    queryKey: ["active-dashboard-exams"],
    queryFn: async () => {
      const [resTersedia, resBerlangsung] = await Promise.all([
        examService.getMyExams({ status: "tersedia" }),
        examService.getMyExams({ status: "berlangsung" }),
      ]);

      const tersedia = resTersedia.success ? resTersedia.data?.data || [] : [];
      const berlangsung = resBerlangsung.success
        ? resBerlangsung.data?.data || []
        : [];

      return [...berlangsung, ...tersedia];
    },
  });
};
