"use client";

import React, { useState, useEffect } from "react";
import { CircleNotch } from "@phosphor-icons/react";
import ExamTableStudentHistory from "@/components/exam/shared-components/exam-table-student-history";
import Pagination from "@/components/pagination";
import Input from "@/components/input";
import FilterDropdown from "@/components/filter-dropdown";
import { useAttemptsForTeacher, useMyAttempts } from "@/hooks/useExams";
import { useDebounce } from "@/hooks/useDebounce";

export default function ExamHistoryPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const {
    data: studentAttemptsData,
    isLoading: loading,
    error: studentError,
  } = useMyAttempts(true, { page, limit, search: debouncedSearch });

  const error = studentError ? "Gagal memuat data riwayat ujian." : "";

  const data = React.useMemo(() => {
    if (!studentAttemptsData) return [];
    const list = Array.isArray(studentAttemptsData.data)
      ? studentAttemptsData.data
      : Array.isArray(studentAttemptsData)
        ? studentAttemptsData
        : [];
    return list.map((item: any) => ({
      id: item.exam_id,
      title: item.exam_title,
      description: item.exam_description || "",
      course: item.course_title,
      endTime: item.end_time,
      score: item.score,
      status: item.status === "completed" ? "Sedang Review" : "Selesai",
    }));
  }, [studentAttemptsData, page, limit]);

  const pagination = React.useMemo(() => {
    const defaultPagination = {
      total_data: 0,
      total_page: 1,
      current_page: 1,
      limit: 10,
    };

    return studentAttemptsData?.pagination || defaultPagination;
  }, [studentAttemptsData]);

  return (
    <div className="flex flex-col gap-6 w-full px-1 pb-10">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-medium text-[#1D2939] tracking-tight">
          Riwayat & Hasil Ujian
        </h1>
        <p className="text-[#475467] mt-0.5">
          Lihat detail skor dan review dari ujian yang telah diselesaikan.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {/* Search & Toolbar Section */}
        <div className="p-5 border-b border-gray-100 flex flex-col gap-4">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Input
                label="Search"
                placeholder="Cari riwayat ujian.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <CircleNotch size={32} className="text-[#3641f5] animate-spin" />
            <span className="text-gray-500 font-medium text-sm">
              Memuat data...
            </span>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500 font-medium">
            {error}
          </div>
        ) : (
          <ExamTableStudentHistory data={data} />
        )}

        <Pagination
          currentPage={page}
          totalPages={pagination.total_page}
          onPageChange={(p) => setPage(p)}
          itemsPerPage={limit}
          onItemsPerPageChange={(l) => {
            setLimit(l);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
}
