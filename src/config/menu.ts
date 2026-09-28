import {
  SquaresFourIcon,
  UsersIcon,
  BookOpenIcon,
  MonitorIcon,
  FileTextIcon,
  ListChecksIcon,
  ExamIcon,
  Icon,
} from "@phosphor-icons/react";

export interface MenuItem {
  title: string;
  path: string;
  icon: Icon;
}

export const MENU_DATA: Record<string, MenuItem[]> = {
  admin: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: SquaresFourIcon,
    },
    {
      title: "Kelola Pengguna",
      path: "/users",
      icon: UsersIcon,
    },
    {
      title: "Kelola Mapel",
      path: "/courses",
      icon: BookOpenIcon,
    },
    {
      title: "Monitor Ujian",
      path: "/monitor",
      icon: MonitorIcon,
    },
  ],
  teacher: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: SquaresFourIcon,
    },
    {
      title: "Kelola Ujian",
      path: "/exams",
      icon: FileTextIcon,
    },
    {
      title: "Bank Soal",
      path: "/question-bank",
      icon: ListChecksIcon,
    },
    {
      title: "Hasil & Evaluasi",
      path: "/results",
      icon: ExamIcon,
    },
  ],
  student: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: SquaresFourIcon,
    },
    {
      title: "Ujian Aktif",
      path: "/active-exams",
      icon: ExamIcon,
    },
    {
      title: "Riwayat Ujian",
      path: "/history",
      icon: FileTextIcon,
    },
  ],
};
