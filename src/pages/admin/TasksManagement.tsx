import React, { useState, useEffect } from 'react';
import {
  ListTodo,
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  PauseCircle,
  PlayCircle,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  BarChart3,
  TrendingUp,
  Loader,
  Save,
  X,
  ChevronDown,
  ChevronRight,
  Flag,
  Target,
  Users,
  FileText,
  Link as LinkIcon,
  MapPin,
  Building,
  Briefcase
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../hooks/useToast';

interface TaskStatus {
  id: string;
  name_ar: string;
  name_en: string;
  color: string;
  order_index: number;
  is_final: boolean;
  allows_editing: boolean;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  task_type?: string;
  priority?: string;
  due_date?: string;
  due_time?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  task_status_id?: string;
  assigned_to?: string[];
  progress_percentage?: number;
  estimated_hours?: number;
  actual_hours?: number;
  tags?: string[];
  governorate_id?: string;
  location_details?: string;
  notes?: string;
  followup_required?: boolean;
  followup_deadline?: string;
  waqf_land_id?: number;
  case_id?: number;
}

const TasksManagement: React.FC = () => {
  const { success, error: showError } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [governorates, setGovernorates] = useState<any[]>([]);

  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'kanban'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assignedFilter, setAssignedFilter] = useState('all');

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    task_type: 'general',
    priority: 'medium',
    due_date: '',
    due_time: '',
    task_status_id: '',
    assigned_to: [] as string[],
    progress_percentage: 0,
    estimated_hours: 0,
    tags: [] as string[],
    governorate_id: '',
    location_details: '',
    notes: '',
    followup_required: false,
    followup_deadline: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await Promise.all([
      loadTasks(),
      loadTaskStatuses(),
      loadUsers(),
      loadGovernorates()
    ]);
    setLoading(false);
  };

  const loadTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (err: any) {
      showError('خطأ', 'فشل تحميل المهام');
      console.error('Error loading tasks:', err);
    }
  };

  const loadTaskStatuses = async () => {
    try {
      const { data, error } = await supabase
        .from('task_statuses')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (error) throw error;
      setTaskStatuses(data || []);
      if (data && data.length > 0 && !taskForm.task_status_id) {
        setTaskForm(prev => ({ ...prev, task_status_id: data[0].id }));
      }
    } catch (err: any) {
      console.error('Error loading task statuses:', err);
    }
  };

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, name, email, role')
        .eq('status', 'active')
        .order('name');

      if (error) throw error;
      setUsers(data || []);
    } catch (err: any) {
      console.error('Error loading users:', err);
    }
  };

  const loadGovernorates = async () => {
    try {
      const { data, error } = await supabase
        .from('governorates')
        .select('id, name_ar, code')
        .order('name_ar');

      if (error) throw error;
      setGovernorates(data || []);
    } catch (err: any) {
      console.error('Error loading governorates:', err);
    }
  };

  const handleSaveTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);

      const taskData = {
        title: taskForm.title,
        description: taskForm.description || null,
        task_type: taskForm.task_type,
        priority: taskForm.priority,
        due_date: taskForm.due_date || null,
        due_time: taskForm.due_time || null,
        task_status_id: taskForm.task_status_id,
        assigned_to: taskForm.assigned_to.length > 0 ? taskForm.assigned_to : null,
        progress_percentage: taskForm.progress_percentage,
        estimated_hours: taskForm.estimated_hours || null,
        tags: taskForm.tags.length > 0 ? taskForm.tags : [],
        governorate_id: taskForm.governorate_id || null,
        location_details: taskForm.location_details || null,
        notes: taskForm.notes || null,
        followup_required: taskForm.followup_required,
        followup_deadline: taskForm.followup_deadline || null,
        updated_at: new Date().toISOString()
      };

      if (editingTask) {
        const { error } = await supabase
          .from('tasks')
          .update(taskData)
          .eq('id', editingTask.id);

        if (error) throw error;
        success('تم التحديث', 'تم تحديث المهمة بنجاح');
      } else {
        const { error } = await supabase
          .from('tasks')
          .insert(taskData);

        if (error) throw error;
        success('تم الإضافة', 'تم إضافة المهمة بنجاح');
      }

      handleCloseModal();
      loadTasks();
    } catch (err: any) {
      showError('خطأ', err.message || 'فشل حفظ المهمة');
      console.error('Error saving task:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه المهمة؟')) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      success('تم الحذف', 'تم حذف المهمة بنجاح');
      loadTasks();
    } catch (err: any) {
      showError('خطأ', err.message || 'فشل حذف المهمة');
      console.error('Error deleting task:', err);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description || '',
      task_type: task.task_type || 'general',
      priority: task.priority || 'medium',
      due_date: task.due_date || '',
      due_time: task.due_time || '',
      task_status_id: task.task_status_id || taskStatuses[0]?.id || '',
      assigned_to: task.assigned_to || [],
      progress_percentage: task.progress_percentage || 0,
      estimated_hours: task.estimated_hours || 0,
      tags: task.tags || [],
      governorate_id: task.governorate_id || '',
      location_details: task.location_details || '',
      notes: task.notes || '',
      followup_required: task.followup_required || false,
      followup_deadline: task.followup_deadline || ''
    });
    setShowTaskModal(true);
  };

  const handleCloseModal = () => {
    setShowTaskModal(false);
    setEditingTask(null);
    setTaskForm({
      title: '',
      description: '',
      task_type: 'general',
      priority: 'medium',
      due_date: '',
      due_time: '',
      task_status_id: taskStatuses[0]?.id || '',
      assigned_to: [],
      progress_percentage: 0,
      estimated_hours: 0,
      tags: [],
      governorate_id: '',
      location_details: '',
      notes: '',
      followup_required: false,
      followup_deadline: ''
    });
  };

  const handleUpdateStatus = async (taskId: string, newStatusId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          task_status_id: newStatusId,
          status_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', taskId);

      if (error) throw error;
      success('تم التحديث', 'تم تحديث حالة المهمة بنجاح');
      loadTasks();
    } catch (err: any) {
      showError('خطأ', err.message || 'فشل تحديث حالة المهمة');
      console.error('Error updating task status:', err);
    }
  };

  const getStatusInfo = (statusId?: string) => {
    const status = taskStatuses.find(s => s.id === statusId);
    return status || { name_ar: 'غير محدد', color: '#6B7280' };
  };

  const getPriorityBadge = (priority?: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority?: string) => {
    switch (priority) {
      case 'urgent': return 'عاجل';
      case 'high': return 'عالية';
      case 'medium': return 'متوسطة';
      case 'low': return 'منخفضة';
      default: return 'غير محدد';
    }
  };

  const getTaskTypeLabel = (type?: string) => {
    switch (type) {
      case 'general': return 'عامة';
      case 'inspection': return 'تفتيش';
      case 'court': return 'محكمة';
      case 'meeting': return 'اجتماع';
      case 'maintenance': return 'صيانة';
      case 'documentation': return 'توثيق';
      default: return type || 'غير محدد';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.task_status_id === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => {
      const status = getStatusInfo(t.task_status_id);
      return status.name_ar === 'مكتملة';
    }).length,
    inProgress: tasks.filter(t => {
      const status = getStatusInfo(t.task_status_id);
      return status.name_ar === 'قيد التنفيذ';
    }).length,
    overdue: tasks.filter(t => t.due_date && new Date(t.due_date) < new Date()).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة المهام</h1>
          <p className="text-gray-600 mt-2">تتبع وإدارة جميع المهام والمتابعات</p>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse">
          <button className="btn-secondary">
            <Download className="w-5 h-5 ml-2" />
            تصدير
          </button>
          <button
            onClick={() => {
              setEditingTask(null);
              setShowTaskModal(true);
            }}
            className="btn-primary"
          >
            <Plus className="w-5 h-5 ml-2" />
            مهمة جديدة
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">إجمالي المهام</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <ListTodo className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">قيد التنفيذ</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.inProgress}</p>
            </div>
            <PlayCircle className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">مكتملة</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.completed}</p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">متأخرة</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.overdue}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في المهام..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pr-10"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select"
          >
            <option value="all">جميع الحالات</option>
            {taskStatuses.map(status => (
              <option key={status.id} value={status.id}>{status.name_ar}</option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="form-select"
          >
            <option value="all">جميع الأولويات</option>
            <option value="urgent">عاجل</option>
            <option value="high">عالية</option>
            <option value="medium">متوسطة</option>
            <option value="low">منخفضة</option>
          </select>

          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <FileText className="w-5 h-5 mx-auto" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex-1 p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <BarChart3 className="w-5 h-5 mx-auto" />
            </button>
          </div>
        </div>
      </div>

      {/* Tasks Display */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : viewMode === 'list' ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">المهمة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">النوع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">الأولوية</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">الموعد</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">التقدم</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTasks.map((task) => {
                  const status = getStatusInfo(task.task_status_id);
                  return (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{task.title}</div>
                          {task.description && (
                            <div className="text-sm text-gray-600 line-clamp-1">{task.description}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {getTaskTypeLabel(task.task_type)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(task.priority)}`}>
                          {getPriorityLabel(task.priority)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {task.due_date ? (
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{new Date(task.due_date).toLocaleDateString('ar-EG')}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={task.task_status_id || ''}
                          onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
                          className="text-sm rounded-full px-3 py-1 border-0"
                          style={{
                            backgroundColor: status.color + '20',
                            color: status.color
                          }}
                        >
                          {taskStatuses.map(s => (
                            <option key={s.id} value={s.id}>{s.name_ar}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${task.progress_percentage || 0}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{task.progress_percentage || 0}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button
                            onClick={() => {
                              setSelectedTask(task);
                              setShowDetailsModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditTask(task)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => {
            const status = getStatusInfo(task.task_status_id);
            return (
              <div key={task.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{task.title}</h3>
                    {task.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
                    )}
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(task.priority)}`}>
                    {getPriorityLabel(task.priority)}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">النوع:</span>
                    <span className="font-medium">{getTaskTypeLabel(task.task_type)}</span>
                  </div>
                  {task.due_date && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">الموعد:</span>
                      <span className="font-medium">{new Date(task.due_date).toLocaleDateString('ar-EG')}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">التقدم:</span>
                    <span className="font-medium">{task.progress_percentage || 0}%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${task.progress_percentage || 0}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: status.color + '20',
                      color: status.color
                    }}
                  >
                    {status.name_ar}
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setShowDetailsModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditTask(task)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingTask ? 'تعديل مهمة' : 'مهمة جديدة'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">عنوان المهمة *</label>
                <input
                  type="text"
                  required
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="form-input"
                  placeholder="أدخل عنوان المهمة"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                <textarea
                  rows={3}
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                  className="form-textarea"
                  placeholder="وصف تفصيلي للمهمة"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نوع المهمة</label>
                  <select
                    value={taskForm.task_type}
                    onChange={(e) => setTaskForm({ ...taskForm, task_type: e.target.value })}
                    className="form-select"
                  >
                    <option value="general">عامة</option>
                    <option value="inspection">تفتيش</option>
                    <option value="court">محكمة</option>
                    <option value="meeting">اجتماع</option>
                    <option value="maintenance">صيانة</option>
                    <option value="documentation">توثيق</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الأولوية</label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                    className="form-select"
                  >
                    <option value="low">منخفضة</option>
                    <option value="medium">متوسطة</option>
                    <option value="high">عالية</option>
                    <option value="urgent">عاجل</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                  <select
                    value={taskForm.task_status_id}
                    onChange={(e) => setTaskForm({ ...taskForm, task_status_id: e.target.value })}
                    className="form-select"
                  >
                    {taskStatuses.map(status => (
                      <option key={status.id} value={status.id}>{status.name_ar}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الاستحقاق</label>
                  <input
                    type="date"
                    value={taskForm.due_date}
                    onChange={(e) => setTaskForm({ ...taskForm, due_date: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">وقت الاستحقاق</label>
                  <input
                    type="time"
                    value={taskForm.due_time}
                    onChange={(e) => setTaskForm({ ...taskForm, due_time: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الساعات المقدرة</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={taskForm.estimated_hours}
                    onChange={(e) => setTaskForm({ ...taskForm, estimated_hours: parseFloat(e.target.value) })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نسبة التقدم (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={taskForm.progress_percentage}
                    onChange={(e) => setTaskForm({ ...taskForm, progress_percentage: parseInt(e.target.value) })}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المحافظة</label>
                <select
                  value={taskForm.governorate_id}
                  onChange={(e) => setTaskForm({ ...taskForm, governorate_id: e.target.value })}
                  className="form-select"
                >
                  <option value="">اختر المحافظة</option>
                  {governorates.map(gov => (
                    <option key={gov.id} value={gov.id}>{gov.name_ar}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تفاصيل الموقع</label>
                <input
                  type="text"
                  value={taskForm.location_details}
                  onChange={(e) => setTaskForm({ ...taskForm, location_details: e.target.value })}
                  className="form-input"
                  placeholder="عنوان أو تفاصيل الموقع"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات</label>
                <textarea
                  rows={3}
                  value={taskForm.notes}
                  onChange={(e) => setTaskForm({ ...taskForm, notes: e.target.value })}
                  className="form-textarea"
                  placeholder="ملاحظات إضافية"
                />
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <input
                  type="checkbox"
                  id="followup_required"
                  checked={taskForm.followup_required}
                  onChange={(e) => setTaskForm({ ...taskForm, followup_required: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="followup_required" className="text-sm font-medium text-gray-700">
                  تتطلب متابعة
                </label>
              </div>

              {taskForm.followup_required && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">موعد المتابعة</label>
                  <input
                    type="date"
                    value={taskForm.followup_deadline}
                    onChange={(e) => setTaskForm({ ...taskForm, followup_deadline: e.target.value })}
                    className="form-input"
                  />
                </div>
              )}

              <div className="flex items-center space-x-3 space-x-reverse pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn-outline flex-1"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary flex-1"
                >
                  {saving ? (
                    <>
                      <Loader className="w-4 h-4 ml-2 animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 ml-2" />
                      حفظ المهمة
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">تفاصيل المهمة</h2>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedTask(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedTask.title}</h3>
                {selectedTask.description && (
                  <p className="text-gray-600">{selectedTask.description}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">النوع:</span>
                  <p className="font-medium mt-1">{getTaskTypeLabel(selectedTask.task_type)}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">الأولوية:</span>
                  <p className="font-medium mt-1">{getPriorityLabel(selectedTask.priority)}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">الحالة:</span>
                  <p className="font-medium mt-1">{getStatusInfo(selectedTask.task_status_id).name_ar}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">التقدم:</span>
                  <p className="font-medium mt-1">{selectedTask.progress_percentage || 0}%</p>
                </div>
                {selectedTask.due_date && (
                  <div>
                    <span className="text-sm text-gray-500">تاريخ الاستحقاق:</span>
                    <p className="font-medium mt-1">{new Date(selectedTask.due_date).toLocaleDateString('ar-EG')}</p>
                  </div>
                )}
                {selectedTask.estimated_hours && (
                  <div>
                    <span className="text-sm text-gray-500">الساعات المقدرة:</span>
                    <p className="font-medium mt-1">{selectedTask.estimated_hours} ساعة</p>
                  </div>
                )}
              </div>

              {selectedTask.location_details && (
                <div>
                  <span className="text-sm text-gray-500">الموقع:</span>
                  <p className="font-medium mt-1">{selectedTask.location_details}</p>
                </div>
              )}

              {selectedTask.notes && (
                <div>
                  <span className="text-sm text-gray-500">ملاحظات:</span>
                  <p className="font-medium mt-1">{selectedTask.notes}</p>
                </div>
              )}

              {selectedTask.followup_required && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 space-x-reverse text-yellow-800">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">تتطلب متابعة</span>
                  </div>
                  {selectedTask.followup_deadline && (
                    <p className="text-sm text-yellow-700 mt-2">
                      موعد المتابعة: {new Date(selectedTask.followup_deadline).toLocaleDateString('ar-EG')}
                    </p>
                  )}
                </div>
              )}

              <div className="flex items-center space-x-3 space-x-reverse pt-4 border-t">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleEditTask(selectedTask);
                  }}
                  className="btn-primary flex-1"
                >
                  <Edit className="w-4 h-4 ml-2" />
                  تعديل
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedTask(null);
                  }}
                  className="btn-outline flex-1"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksManagement;
