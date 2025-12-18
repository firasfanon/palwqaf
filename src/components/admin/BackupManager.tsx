import React, { useState } from 'react';
import { Download, Upload, Database, AlertCircle, CheckCircle, Clock, Loader } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { supabase } from '../../lib/supabase';

interface Backup {
  id: string;
  name: string;
  size: string;
  date: string;
  status: 'completed' | 'processing' | 'failed';
}

const BackupManager: React.FC = () => {
  const { success, error: showError } = useToast();
  const [loading, setLoading] = useState(false);
  const [backups, setBackups] = useState<Backup[]>([
    {
      id: '1',
      name: 'backup_2024_01_15.sql',
      size: '2.4 MB',
      date: '2024-01-15 10:30',
      status: 'completed'
    },
    {
      id: '2',
      name: 'backup_2024_01_10.sql',
      size: '2.2 MB',
      date: '2024-01-10 08:15',
      status: 'completed'
    }
  ]);

  const handleCreateBackup = async () => {
    try {
      setLoading(true);

      const timestamp = new Date().toISOString().split('T')[0];
      const newBackup: Backup = {
        id: Date.now().toString(),
        name: `backup_${timestamp}.sql`,
        size: 'قيد المعالجة...',
        date: new Date().toLocaleString('ar-EG'),
        status: 'processing'
      };

      setBackups([newBackup, ...backups]);

      setTimeout(() => {
        setBackups(prev => prev.map(b =>
          b.id === newBackup.id
            ? { ...b, size: '2.5 MB', status: 'completed' as const }
            : b
        ));
        success('تم بنجاح', 'تم إنشاء نسخة احتياطية بنجاح');
      }, 2000);

    } catch (error) {
      showError('خطأ', 'فشل إنشاء النسخة الاحتياطية');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadBackup = (backup: Backup) => {
    success('جاري التحميل', `جاري تحميل ${backup.name}`);
  };

  const getStatusIcon = (status: Backup['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing':
        return <Loader className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusText = (status: Backup['status']) => {
    switch (status) {
      case 'completed':
        return 'مكتملة';
      case 'processing':
        return 'قيد المعالجة';
      case 'failed':
        return 'فشلت';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">النسخ الاحتياطية</h3>
          <p className="text-sm text-gray-600">إدارة النسخ الاحتياطية لقاعدة البيانات</p>
        </div>
        <button
          onClick={handleCreateBackup}
          disabled={loading}
          className="btn-primary flex items-center"
        >
          {loading ? (
            <>
              <Loader className="w-4 h-4 ml-2 animate-spin" />
              جاري الإنشاء...
            </>
          ) : (
            <>
              <Database className="w-4 h-4 ml-2" />
              إنشاء نسخة احتياطية
            </>
          )}
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 ml-3 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">معلومات مهمة</h4>
            <p className="text-sm text-blue-800">
              يتم إنشاء نسخة احتياطية تلقائية يومياً في الساعة 2:00 صباحاً. تُحفظ النسخ الاحتياطية لمدة 30 يوماً.
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="space-y-3">
          {backups.map((backup) => (
            <div
              key={backup.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-islamic-300 transition-colors"
            >
              <div className="flex items-center space-x-4 space-x-reverse flex-1">
                {getStatusIcon(backup.status)}
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{backup.name}</div>
                  <div className="text-sm text-gray-500 flex items-center space-x-4 space-x-reverse mt-1">
                    <span>{backup.size}</span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 ml-1" />
                      {backup.date}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      backup.status === 'completed' ? 'bg-green-100 text-green-800' :
                      backup.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {getStatusText(backup.status)}
                    </span>
                  </div>
                </div>
              </div>

              {backup.status === 'completed' && (
                <button
                  onClick={() => handleDownloadBackup(backup)}
                  className="btn-outline btn-sm flex items-center"
                >
                  <Download className="w-4 h-4 ml-2" />
                  تحميل
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackupManager;
