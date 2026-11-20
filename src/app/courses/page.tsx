"use client";

import { useState, useEffect } from "react";
import { Plus, Funnel, CircleNotch } from "@phosphor-icons/react";
import Button from "@/components/button";
import Input from "@/components/input";
import Pagination from "@/components/pagination";
import Modal from "@/components/modal";
import CourseTable from "@/components/course/course-table";
import CourseDelete from "@/components/course/course-delete";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useCoursesList, useDeleteCourse } from "@/hooks/useCourses";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

export default function CourcePage() {
  const router = useRouter();
  const deleteModal = useDisclosure();
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [pagination, setPagination] = useState({
    current_page: 1,
    limit: 10,
  });
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, current_page: 1 }));
  }, [debouncedSearch]);

  // fetch courses hook
  const {
    data: coursesData,
    isLoading,
    isFetching,
  } = useCoursesList({
    page: pagination.current_page,
    limit: pagination.limit,
    search: debouncedSearch,
  });

  // delete cources hook
  const deleteCourseMutation = useDeleteCourse();

  // courses data
  const courses = coursesData?.data || coursesData?.courses || [];
  const queryPagination = coursesData?.pagination || {
    current_page: pagination.current_page,
    total_page: 1,
    total_data: 0,
    limit: pagination.limit,
  };

  const loading = isLoading || deleteCourseMutation.isPending;

  const handlePageChange = (newPage: any) => {
    setPagination((prev) => ({ ...prev, current_page: newPage }));
  };

  const handleLimitChange = (newLimit: any) => {
    setPagination((prev) => ({ ...prev, limit: newLimit, current_page: 1 }));
  };

  const handleEdit = (course: any) => {
    router.push(`/courses/edit/${course.id}`);
  };

  const handleManageStudents = (course: any) => {
    router.push(`/courses/${course.id}/students`);
  };

  const handleDeleteConfirm = async (course: any) => {
    try {
      await deleteCourseMutation.mutateAsync(course.id);
      deleteModal.close();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full px-1">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium text-[#1D2939] tracking-tight">
            Daftar Mapel / Kelas
          </h1>
          <p className="text-[#475467] mt-0.5">
            Kelola Mapel dan penugasan guru pengampu.
          </p>
        </div>
        <div className="flex md:justify-end">
          <Button
            className="w-full md:w-auto h-11"
            onClick={() => router.push("/courses/create")}
          >
            <Plus size={20} weight="bold" className="mr-2" />
            Buat Mapel Baru
          </Button>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(16,24,40,0.1),0_1px_2px_rgba(16,24,40,0.06)] overflow-hidden flex flex-col transition-all duration-300">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex-1">
            <Input
              label="Search"
              placeholder="Cari kursus..."
              className="w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <CourseTable
          courses={courses}
          currentPage={pagination.current_page}
          limit={pagination.limit}
          onEdit={handleEdit}
          onDelete={(course) => {
            setSelectedCourse(course);
            deleteCourseMutation.reset();
            deleteModal.open();
          }}
          onManageStudents={handleManageStudents}
        />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={queryPagination.current_page}
        totalPages={queryPagination.total_page}
        onPageChange={handlePageChange}
        limit={pagination.limit}
        onLimitChange={handleLimitChange}
      />

      {/* Delete confirm */}
      <Modal isOpen={deleteModal.isOpen} onClose={deleteModal.close}>
        <CourseDelete
          course={selectedCourse}
          onClose={deleteModal.close}
          onDelete={handleDeleteConfirm}
          isLoading={deleteCourseMutation.isPending}
          error={deleteCourseMutation.error}
        />
      </Modal>
    </div>
  );
}
