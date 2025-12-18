import React from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  onBack?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
  actions,
  breadcrumbs,
  onBack
}) => {
  return (
    <div className="mb-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-2 space-x-reverse text-sm text-sage-600 mb-4 font-body">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="hover:text-islamic-700 transition-colors"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className="text-islamic-700 font-medium">{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="text-sage-400">/</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-islamic-100 text-islamic-600 transition-colors"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          )}

          {Icon && (
            <div className="w-12 h-12 bg-islamic-500 rounded-xl flex items-center justify-center shadow-lg">
              <Icon className="w-6 h-6 text-white" />
            </div>
          )}

          <div>
            <h1 className="heading-1 text-islamic-800">{title}</h1>
            {subtitle && (
              <p className="body-text text-sage-600 mt-1">{subtitle}</p>
            )}
          </div>
        </div>

        {actions && (
          <div className="flex items-center space-x-3 space-x-reverse">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
