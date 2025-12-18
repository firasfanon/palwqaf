import React, { useState, useMemo } from 'react';
import { Search, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, Filter, Download } from 'lucide-react';

export interface Column<T> {
  key: string;
  title: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchKeys?: string[];
  onRowClick?: (item: T) => void;
  actions?: (item: T) => React.ReactNode;
  emptyMessage?: string;
  pageSize?: number;
  showExport?: boolean;
  onExport?: () => void;
}

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchKeys = [],
  onRowClick,
  actions,
  emptyMessage = 'لا توجد بيانات',
  pageSize = 10,
  showExport = false,
  onExport
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter((item) => {
      return searchKeys.some((key) => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });
    });
  }, [data, searchTerm, searchKeys]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [filteredData, sortKey, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
          <input
            type="text"
            placeholder="بحث..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="form-input pr-10"
          />
        </div>

        <div className="flex items-center space-x-2 space-x-reverse">
          {showExport && (
            <button
              onClick={onExport}
              className="btn-secondary text-sm"
            >
              <Download className="w-4 h-4 ml-1" />
              تصدير
            </button>
          )}
          <button className="btn-outline text-sm">
            <Filter className="w-4 h-4 ml-1" />
            تصفية
          </button>
        </div>
      </div>

      <div className="card-islamic overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-islamic-50 border-b border-islamic-200">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-6 py-3 text-right text-sm font-semibold text-islamic-800 ${
                      column.sortable ? 'cursor-pointer hover:bg-islamic-100' : ''
                    } ${column.width || ''}`}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{column.title}</span>
                      {column.sortable && (
                        <div className="flex flex-col">
                          <ArrowUp
                            className={`w-3 h-3 ${
                              sortKey === column.key && sortDirection === 'asc'
                                ? 'text-islamic-600'
                                : 'text-sage-300'
                            }`}
                          />
                          <ArrowDown
                            className={`w-3 h-3 -mt-1 ${
                              sortKey === column.key && sortDirection === 'desc'
                                ? 'text-islamic-600'
                                : 'text-sage-300'
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
                {actions && (
                  <th className="px-6 py-3 text-right text-sm font-semibold text-islamic-800">
                    الإجراءات
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-200">
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-6 py-12 text-center text-sage-500 font-body"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-islamic-50 transition-colors ${
                      onRowClick ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => onRowClick && onRowClick(item)}
                  >
                    {columns.map((column) => (
                      <td key={column.key} className="px-6 py-4 text-sm text-sage-700 font-body">
                        {column.render ? column.render(item) : item[column.key]}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-6 py-4 text-sm text-sage-700 font-body">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {actions(item)}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 bg-sage-50 border-t border-sage-200">
            <div className="text-sm text-sage-600 font-body">
              عرض {(currentPage - 1) * pageSize + 1} إلى{' '}
              {Math.min(currentPage * pageSize, sortedData.length)} من{' '}
              {sortedData.length} نتيجة
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-islamic-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-islamic-600" />
              </button>

              <div className="flex items-center space-x-1 space-x-reverse">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === pageNum
                          ? 'bg-islamic-600 text-white'
                          : 'hover:bg-islamic-100 text-islamic-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-islamic-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-islamic-600" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataTable;
