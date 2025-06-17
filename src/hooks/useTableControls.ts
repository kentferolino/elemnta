import { useState, useMemo } from "react";

type SortOrder = "asc" | "desc";

interface UseTableControlsProps<T, K extends keyof T> {
  data: T[];
  defaultPageSize?: number;
  defaultSortField: K;
  defaultSortOrder?: SortOrder;
}

interface UseTableControlsReturn<T, K extends keyof T> {
  currentPage: number;
  handlePageSizeChange: (value: string) => void;
  handleSort: (field: K) => void;
  pageSize: number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  sortField: K;
  sortOrder: SortOrder;
  tableData: T[];
  totalPages: number;
}

export function useTableControls<T, K extends keyof T>({
  data,
  defaultPageSize = 5,
  defaultSortField,
  defaultSortOrder = "asc",
}: UseTableControlsProps<T, K>): UseTableControlsReturn<T, K> {
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<K>(defaultSortField);
  const [sortOrder, setSortOrder] = useState<SortOrder>(defaultSortOrder);

  const sortedData = useMemo(() => {
    if (!data) return [];

    return [...data].sort((a, b) => {
      const aValue = String(a[sortField]).toLowerCase();
      const bValue = String(b[sortField]).toLowerCase();

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }, [data, sortField, sortOrder]);

  const tableData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = useMemo(() => {
    return Math.ceil(sortedData.length / pageSize);
  }, [sortedData, pageSize]);

  const handleSort = (field: K) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrentPage(1);
  };

  return {
    currentPage,
    pageSize,
    totalPages,
    setCurrentPage,
    setPageSize,
    handlePageSizeChange,
    sortField,
    sortOrder,
    handleSort,
    tableData,
  };
}
