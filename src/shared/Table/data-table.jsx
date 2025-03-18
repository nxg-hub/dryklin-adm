"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "../../components/checkbox.jsx";
import Button from "../Buttons/Button.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchFilter from "../Searchbar/SearchFilter.jsx";
import { useLocation } from "react-router-dom";

export function DataTable({
  columns,
  data,
  showCheckbox = true,
  onRowClick,
  actionColumn,
  showPagination = true,
  currentPage,
  itemsPerPage = 10,

  onPageChange,
  showFooter = true,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("customer"); // Default filter
  const location = useLocation();
  const currentRoute = location.pathname;

  // List of filters
  const filters = [
    { label: "Select", value: "" },
    { label: "Customer", value: "customer" },
    { label: "ID", value: "id" },
    { label: "Payment Status", value: "paymentStatus" },
    { label: "Order Status", value: "orderStatus" },
  ];

  // Handle search and filter changes
  const handleSearch = (term, filter) => {
    setSearchTerm(term);
    setFilterBy(filter);
  };

  const filteredData = data.filter((item) =>
    //apply full filter features when in this route
    currentRoute === "/dashboard/orderManagement"
      ? item[filterBy]?.toLowerCase().includes(searchTerm.toLowerCase())
      : item.customer?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  // Get items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = showFooter
    ? filteredData?.slice(startIndex, endIndex)
    : filteredData;
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-4 py-2 text-sm ${
              currentPage === i
                ? "text-[#E85C13] font-medium"
                : "text-[#667085]"
            }`}>
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <span key={i} className="px-4 py-2 text-[#667085]">
            ...
          </span>
        );
      }
    }

    return (
      <div className="flex items-center justify-between  mt-4">
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <div className="flex items-center">{pages}</div>
        <Button
          variant="outline"
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2">
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      {/* Search & Filter Component */}
      {showFooter && <SearchFilter onSearch={handleSearch} filters={filters} />}
      <div className="border border-[#e4e7ec] rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-white border-b border-[#e4e7ec]">
              {showCheckbox && (
                <th className="w-10 p-4 text-left">
                  <Checkbox className="border-2 border-[#d0d5dd] rounded-[4px]" />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="p-4 text-sm font-medium text-[#344054] text-left">
                  {column.title}
                </th>
              ))}
              {actionColumn && (
                <th className="p-4 text-sm font-medium text-[#344054] text-left">
                  {actionColumn.title}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-[#e4e7ec] last:border-b-0 hover:bg-gray-50 cursor-pointer"
                onClick={() => onRowClick && onRowClick(row)}>
                {showCheckbox && (
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <Checkbox className="border-2 border-[#d0d5dd] rounded-[4px]" />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={`${rowIndex}-${column.key}`}
                    className="p-4 text-sm text-[#344054]">
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
                {actionColumn && (
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    {actionColumn.render(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          {showFooter && (
            <tfoot>
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (showCheckbox ? 1 : 0) +
                    (actionColumn ? 1 : 0)
                  }
                  className="pb-3 border-t border-[#e4e7ec]">
                  {showPagination && renderPagination()}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
