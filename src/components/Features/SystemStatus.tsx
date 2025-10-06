import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Database, 
  Wifi, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  RefreshCw,
  Zap,
  HardDrive,
  Cpu,
  MemoryStick,
  Network
} from 'lucide-react';

const SystemStatus: React.FC = () => {
  const [systemHealth, setSystemHealth] = useState({
    database: 'healthy',
    api: 'healthy',
    storage: 'healthy',
    realtime: 'healthy',
    lastCheck: new Date()
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const statusItems = [
    {
      id: 'database',
      name: 'قاعدة البيانات',
      icon: Database,
      status: systemHealth.database,
      description: 'Supabase PostgreSQL'
    },
    {
      id: 'api',
      name: 'واجهة البرمجة',
      icon: Zap,
      status: systemHealth.api,
      description: 'REST API'
    },
    {
      id: 'storage',
      name: 'التخزين',
      icon: HardDrive,
      status: systemHealth.storage,
      description: 'Supabase Storage'
    },
    {
      id: 'realtime',
      name: 'التحديثات المباشرة',
      icon: Wifi,
      status: systemHealth.realtime,
      description: 'Realtime Subscriptions'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-orange-100 text-orange-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const refreshStatus = async () => {
    setIsRefreshing(true);
    
    // محاكاة فحص حالة النظام
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSystemHealth(prev => ({
      ...prev,
      lastCheck: new Date()
    }));
    
    setIsRefreshing(false);
  };

  return (
    <div className="card-sage">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-sage-800 font-display">حالة النظام</h3>
        <button
          onClick={refreshStatus}
          disabled={isRefreshing}
          className="p-2 rounded-lg hover:bg-sage-100 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 text-sage-600 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="space-y-3">
        {statusItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
            <div className="flex items-center space-x-3 space-x-reverse">
              <item.icon className="w-5 h-5 text-sage-600" />
              <div>
                <p className="font-medium text-sage-800 font-body">{item.name}</p>
                <p className="text-xs text-sage-600 font-body">{item.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              {getStatusIcon(item.status)}
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(item.status)}`}>
                {item.status === 'healthy' ? 'سليم' : 
                 item.status === 'warning' ? 'تحذير' : 'خطأ'}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-sage-200">
        <p className="text-xs text-sage-600 text-center font-body">
          آخر فحص: {systemHealth.lastCheck.toLocaleTimeString('ar-EG')}
        </p>
      </div>
    </div>
  );
};

export default SystemStatus;