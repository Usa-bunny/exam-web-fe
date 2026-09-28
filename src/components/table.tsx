"use client";

import { DotsThreeVerticalIcon } from "@phosphor-icons/react";
import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import EmptyState from "./empty-state";

export interface Column<T> {
  header: string;
  key?: keyof T;
  className?: string;
  render?: (row: T) => ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  renderActions?: (row: T, closeMenu: () => void) => ReactNode;
}

const Table = <T extends Record<string, any>>({
  columns = [],
  data = [],
  renderActions,
}: TableProps<T>) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const toggleMenu = (e: any, rowIdx: any) => {
    if (activeMenu === rowIdx) {
      setActiveMenu(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX - 100,
      });
      setActiveMenu(rowIdx);
    }
  };

  return (
    <div className="bg-white rounded-[18px] border border-[#eff2f6] shadow-[0_2px_4px_-1px_rgba(16,24,40,0.06),0_1px_2px_rgba(16,24,40,0.03)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#EEF4FF] border-y border-[#eaedf3]">
            <tr>
              {columns.map((col: any, idx: any) => (
                <th
                  key={idx}
                  className={`px-6 py-3.5 text-[12px] font-semibold text-[#475467] tracking-wider whitespace-nowrap ${
                    col.className?.includes("text-center")
                      ? "text-center"
                      : col.className?.includes("text-right")
                        ? "text-right"
                        : "text-left"
                  } ${col.className || ""}`}
                >
                  {col.header}
                </th>
              ))}
              {renderActions && <th className="px-6 py-3 w-12.5"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length > 0 ? (
              data.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {columns.map((col: any, colIdx: any) => (
                    <td
                      key={colIdx}
                      className={`px-6 py-4 text-sm text-[#344054] ${col.className || ""}`}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  {renderActions && (
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={(e) => toggleMenu(e, rowIdx)}
                        className="p-1 hover:bg-gray-100 cursor-pointer rounded-lg text-gray-400 transition-colors"
                      >
                        <DotsThreeVerticalIcon size={24} weight="bold" />
                      </button>

                      {activeMenu === rowIdx &&
                        createPortal(
                          <>
                            <div
                              className="fixed inset-0 z-9998"
                              onClick={() => setActiveMenu(null)}
                            />
                            <div
                              style={{
                                position: "absolute",
                                top: menuPosition.top,
                                left: menuPosition.left,
                                width: "180px",
                              }}
                              className="z-9999 bg-white border border-[#eef1f5] rounded-[14px] shadow-[0_12px_28px_-6px_rgba(16,24,40,0.12),0_4px_10px_-2px_rgba(16,24,40,0.06)] py-1.5 text-left animate-in fade-in zoom-in duration-150"
                            >
                              {renderActions(row, () => setActiveMenu(null))}
                            </div>
                          </>,
                          document.body,
                        )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (renderActions ? 1 : 0)}>
                  <EmptyState />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
