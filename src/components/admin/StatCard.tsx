import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: 'up' | 'down';
  trendValue?: string;
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'yellow';
  subtitle?: string;
  onClick?: () => void;
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-500',
    text: 'text-blue-600',
    bgLight: 'bg-blue-50',
    border: 'border-blue-200'
  },
  green: {
    bg: 'bg-green-500',
    text: 'text-green-600',
    bgLight: 'bg-green-50',
    border: 'border-green-200'
  },
  red: {
    bg: 'bg-red-500',
    text: 'text-red-600',
    bgLight: 'bg-red-50',
    border: 'border-red-200'
  },
  purple: {
    bg: 'bg-purple-500',
    text: 'text-purple-600',
    bgLight: 'bg-purple-50',
    border: 'border-purple-200'
  },
  orange: {
    bg: 'bg-orange-500',
    text: 'text-orange-600',
    bgLight: 'bg-orange-50',
    border: 'border-orange-200'
  },
  yellow: {
    bg: 'bg-yellow-500',
    text: 'text-yellow-600',
    bgLight: 'bg-yellow-50',
    border: 'border-yellow-200'
  }
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = 'blue',
  subtitle,
  onClick
}) => {
  const colors = colorClasses[color];

  return (
    <div
      className={`card-islamic hover-lift ${onClick ? 'cursor-pointer' : ''} group transition-all duration-300`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && trendValue && (
          <div className={`flex items-center space-x-1 space-x-reverse text-sm font-medium ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-sage-600 font-body">{title}</p>
        <p className="text-3xl font-bold text-islamic-700 font-display">{value}</p>
        {subtitle && (
          <p className="text-xs text-sage-500 font-body mt-2">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
