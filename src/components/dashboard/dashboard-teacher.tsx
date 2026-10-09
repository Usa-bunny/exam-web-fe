import {
  FileTextIcon,
  ListChecksIcon,
  BookOpenIcon,
  UsersThreeIcon,
  CircleNotchIcon,
} from "@phosphor-icons/react";
import AverageScoreChart from "./average-score";
import MetricCard from "./metric-card";
import { useTeacherStats } from "@/hooks/useDashboard";
import ExamStatus from "./exam-status";

const DashboardTeacher = () => {
  const { data: stats, isLoading, error } = useTeacherStats();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-80 w-full">
        <div className="flex flex-col items-center gap-3">
          <CircleNotchIcon size={40} className="text-[#3641f5] animate-spin" />
          <span className="text-gray-500 font-medium text-sm">
            Memuat Dashboard Guru...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-80 w-full text-red-500 font-medium">
        Gagal memuat data statistik dashboard guru.
      </div>
    );
  }

  const metrics = [
    {
      label: "Total Ujian Anda",
      value: String(stats?.card_stats?.total_exams || 0),
      icon: FileTextIcon,
    },
    {
      label: "Total Soal Dibuat",
      value: String(stats?.card_stats?.total_questions || 0),
      icon: ListChecksIcon,
    },
    {
      label: "Total Kelas Diajar",
      value: String(stats?.card_stats?.total_courses || 0),
      icon: BookOpenIcon,
    },
    {
      label: "Percobaan Ujian",
      value: String(stats?.card_stats?.total_attempts || 0),
      icon: UsersThreeIcon,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((item, index) => (
          <MetricCard
            key={index}
            label={item.label}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AverageScoreChart
          chartData={stats?.exam_averages?.data || stats?.exam_averages || []}
        />
        <ExamStatus
          statusData={
            stats?.exam_attempt_status?.data || stats?.exam_attempt_status || []
          }
        />
      </div>
    </div>
  );
};

export default DashboardTeacher;
