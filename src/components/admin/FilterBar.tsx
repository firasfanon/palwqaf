import React from 'react';
import { Filter, X, Calendar, Search } from 'lucide-react';

export interface FilterOption {
  id: string;
  label: string;
  type: 'select' | 'date' | 'daterange' | 'search' | 'checkbox';
  options?: { value: string; label: string }[];
  value?: any;
  onChange?: (value: any) => void;
  placeholder?: string;
}

interface FilterBarProps {
  filters: FilterOption[];
  onClear?: () => void;
  showClearButton?: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onClear,
  showClearButton = true
}) => {
  const hasActiveFilters = filters.some(f => f.value);

  return (
    <div className="card-islamic mb-6">
      <div className="flex items-center space-x-3 space-x-reverse mb-4">
        <Filter className="w-5 h-5 text-islamic-600" />
        <h3 className="text-lg font-semibold text-islamic-800 font-display">تصفية البيانات</h3>
        {showClearButton && hasActiveFilters && (
          <button
            onClick={onClear}
            className="mr-auto text-sm text-red-600 hover:text-red-700 font-medium font-body flex items-center space-x-1 space-x-reverse"
          >
            <X className="w-4 h-4" />
            <span>مسح الكل</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filters.map((filter) => (
          <div key={filter.id} className="space-y-2">
            <label className="block text-sm font-medium text-islamic-700 font-body">
              {filter.label}
            </label>

            {filter.type === 'select' && (
              <select
                value={filter.value || ''}
                onChange={(e) => filter.onChange?.(e.target.value)}
                className="form-select"
              >
                <option value="">الكل</option>
                {filter.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            {filter.type === 'search' && (
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-4 h-4" />
                <input
                  type="text"
                  value={filter.value || ''}
                  onChange={(e) => filter.onChange?.(e.target.value)}
                  placeholder={filter.placeholder || 'بحث...'}
                  className="form-input pr-10"
                />
              </div>
            )}

            {filter.type === 'date' && (
              <div className="relative">
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-4 h-4" />
                <input
                  type="date"
                  value={filter.value || ''}
                  onChange={(e) => filter.onChange?.(e.target.value)}
                  className="form-input pr-10"
                />
              </div>
            )}

            {filter.type === 'daterange' && (
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="date"
                  value={filter.value?.from || ''}
                  onChange={(e) =>
                    filter.onChange?.({ ...filter.value, from: e.target.value })
                  }
                  className="form-input text-sm"
                />
                <span className="text-sage-500">-</span>
                <input
                  type="date"
                  value={filter.value?.to || ''}
                  onChange={(e) =>
                    filter.onChange?.({ ...filter.value, to: e.target.value })
                  }
                  className="form-input text-sm"
                />
              </div>
            )}

            {filter.type === 'checkbox' && (
              <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                <input
                  type="checkbox"
                  checked={filter.value || false}
                  onChange={(e) => filter.onChange?.(e.target.checked)}
                  className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                />
                <span className="text-sm text-sage-700 font-body">
                  {filter.placeholder || 'تفعيل'}
                </span>
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
