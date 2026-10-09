export const formatExamStatus = (status?: string): string => {
  if (!status) return "Tersedia";
  const statusLower = status.toLowerCase();

  if (statusLower === "tersedia") return "Tersedia";
  if (statusLower === "selesai") return "Selesai";
  if (statusLower === "terlewat") return "Terlewat";
  if (statusLower === "sedang review" || statusLower === "pending")
    return "Sedang Review";
  if (
    statusLower === "sedang ujian" ||
    statusLower === "berlangsung" ||
    statusLower === "in_progress"
  )
    return "Sedang Ujian";
  if (statusLower === "mendatang") return "Belum Mulai";

  return "Tersedia";
};

export const getBackendStatus = (status: string): string | undefined => {
  const map: Record<string, string> = {
    Tersedia: "tersedia",
    "Belum Mulai": "mendatang",
    "Sedang Ujian": "berlangsung",
    "Sedang Review": "pending",
    Selesai: "selesai",
    Terlewat: "terlewat",
  };
  return map[status];
};

export interface StatusStyle {
  color: string;
  dot: string;
}

export const getExamStatusStyle = (status?: string): StatusStyle => {
  const statusMap: Record<string, StatusStyle> = {
    Selesai: { color: "text-[#029854]", dot: "bg-[#029854]" },
    Tersedia: { color: "text-[#3843F6]", dot: "bg-[#3843F6]" },
    Terlewat: { color: "text-[#D82B1F]", dot: "bg-[#D82B1F]" },
    "Sedang Review": { color: "text-[#DB6703]", dot: "bg-[#DB6703]" },
    "Sedang Ujian": { color: "text-[#DB6703]", dot: "bg-[#DB6703]" },
    "Belum Mulai": { color: "text-[#465366]", dot: "bg-[#97A1B2]" },
  };

  if (!status) return { color: "text-gray-500", dot: "bg-gray-400" };
  return statusMap[status] || { color: "text-gray-500", dot: "bg-gray-400" };
};