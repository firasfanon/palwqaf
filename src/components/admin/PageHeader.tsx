import React from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface ActionButton {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: LucideIcon;
  action?: ActionButton;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  onBack?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  description,
  icon: Icon,
  action,
  actions,
  breadcrumbs,
  onBack
}) => {
  return (
    <div className="mb-4">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-2 space-x-reverse text-xs text-sage-600 mb-2 font-body">
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
        <div className="flex items-center space-x-3 space-x-reverse">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg hover:bg-islamic-100 text-islamic-600 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {Icon && (
            <div className="w-10 h-10 bg-islamic-500 rounded-lg flex items-center justify-center shadow">
              <Icon className="w-5 h-5 text-white" />
            </div>
          )}

          <div>
            <h1 className="text-xl font-bold text-islamic-800">{title}</h1>
            {subtitle && (
              <p className="text-xs text-sage-600 mt-0.5">{subtitle}</p>
            )}
            {description && (
              <p className="text-sm text-sage-600 mt-1">{description}</p>
            )}
          </div>
        </div>

        {(action || actions) && (
          <div className="flex items-center space-x-2 space-x-reverse">
            {action && (
              <button
                onClick={action.onClick}
                disabled={action.disabled}
                className={`${
                  action.variant === 'secondary' ? 'btn-secondary' :
                  action.variant === 'outline' ? 'btn-outline' :
                  'btn-primary'
                } ${action.icon ? 'animate-pulse' : ''}`}
              >
                {action.icon && <action.icon className={`w-5 h-5 ml-2 ${action.disabled ? '' : 'animate-none'}`} />}
                {action.label}
              </button>
            )}
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
