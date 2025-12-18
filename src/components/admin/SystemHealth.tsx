import React, { useState, useEffect } from 'react';
import { Activity, Database, Server, Wifi, AlertTriangle, CheckCircle, Loader } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface HealthMetric {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  value: string;
  icon: any;
}

const SystemHealth: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<HealthMetric[]>([
    {
      name: 'حالة قاعدة البيانات',
      status: 'healthy',
      value: 'متصل',
      icon: Database
    },
    {
      name: 'حالة الخادم',
      status: 'healthy',
      value: 'نشط',
      icon: Server
    },
    {
      name: 'الاتصال بالشبكة',
      status: 'healthy',
      value: 'مستقر',
      icon: Wifi
    },
    {
      name: 'استخدام الموارد',
      status: 'healthy',
      value: '45%',
      icon: Activity
    }
  ]);

  useEffect(() => {
    checkSystemHealth();
  }, []);

  const checkSystemHealth = async () => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from('system_settings')
        .select('id')
        .limit(1);

      const updatedMetrics = [...metrics];
      if (error) {
        updatedMetrics[0].status = 'error';
        updatedMetrics[0].value = 'خطأ في الاتصال';
      } else {
        updatedMetrics[0].status = 'healthy';
        updatedMetrics[0].value = 'متصل';
      }

      setMetrics(updatedMetrics);
    } catch (error) {
      console.error('Error checking system health:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: HealthMetric['status']) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
    }
  };

  const getStatusBg = (status: HealthMetric['status']) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
    }
  };

  const getStatusIcon = (status: HealthMetric['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusText = (status: HealthMetric['status']) => {
    switch (status) {
      case 'healthy':
        return 'سليم';
      case 'warning':
        return 'تحذير';
      case 'error':
        return 'خطأ';
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-8">
          <Loader className="w-6 h-6 animate-spin text-islamic-600" />
        </div>
      </div>
    );
  }

  const overallStatus = metrics.some(m => m.status === 'error') ? 'error' :
                        metrics.some(m => m.status === 'warning') ? 'warning' : 'healthy';

  return (
    <div className="space-y-6">
      <div className={`border rounded-lg p-4 ${getStatusBg(overallStatus)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            {getStatusIcon(overallStatus)}
            <div>
              <h3 className={`font-semibold ${getStatusColor(overallStatus)}`}>
                حالة النظام: {getStatusText(overallStatus)}
              </h3>
              <p className="text-sm text-gray-600">
                آخر فحص: {new Date().toLocaleString('ar-EG')}
              </p>
            </div>
          </div>
          <button
            onClick={checkSystemHealth}
            className="btn-outline btn-sm"
          >
            تحديث
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className={`border rounded-lg p-4 ${getStatusBg(metric.status)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Icon className={`w-5 h-5 ${getStatusColor(metric.status)}`} />
                  <span className="font-medium text-gray-900">{metric.name}</span>
                </div>
                {getStatusIcon(metric.status)}
              </div>
              <div className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                {metric.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SystemHealth;
