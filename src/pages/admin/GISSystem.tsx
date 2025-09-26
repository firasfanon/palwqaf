import React, { useState, useEffect, useRef } from 'react';
import { 
  Map, 
  Layers, 
  MapPin, 
  Search, 
  Filter, 
  Ruler, 
  Square, 
  Circle, 
  Pen, 
  Move,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Upload,
  Settings,
  Eye,
  EyeOff,
  Target,
  Navigation,
  Compass,
  Satellite,
  Building,
  TreePine,
  Home,
  School,
  ShoppingCart,
  Cross,
  Mountain,
  Activity,
  BarChart3,
  PieChart,
  TrendingUp,
  Database,
  Zap,
  Globe,
  Crosshair,
  MousePointer,
  Hand,
  Maximize,
  Minimize,
  RefreshCw,
  Save,
  Share2,
  Printer,
  FileText,
  Image,
  Calendar,
  Clock,
  User,
  Tag,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const GISSystem: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedTool, setSelectedTool] = useState('select');
  const [selectedLayer, setSelectedLayer] = useState<string[]>(['all']);
  const [mapView, setMapView] = useState('satellite');
  const [showLayersPanel, setShowLayersPanel] = useState(true);
  const [showToolsPanel, setShowToolsPanel] = useState(true);
  const [showAnalysisPanel, setShowAnalysisPanel] = useState(false);
  const [selectedLand, setSelectedLand] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [measurements, setMeasurements] = useState<any[]>([]);
  const [drawings, setDrawings] = useState<any[]>([]);
  const [mapCenter, setMapCenter] = useState({ lat: 31.7767, lng: 35.2345 });
  const [zoomLevel, setZoomLevel] = useState(10);

  // بيانات الأراضي الوقفية مع الإحداثيات
  const waqfLands = [
    {
      id: 1,
      name: 'أرض المسجد الكبير',
      type: 'mosque',
      area: 2500,
      coordinates: { lat: 31.7767, lng: 35.2345 },
      boundaries: [
        { lat: 31.7770, lng: 35.2340 },
        { lat: 31.7770, lng: 35.2350 },
        { lat: 31.7764, lng: 35.2350 },
        { lat: 31.7764, lng: 35.2340 }
      ],
      status: 'active',
      value: 2500000,
      city: 'القدس',
      district: 'القدس',
      manager: 'أحمد محمد',
      documentsCount: 12,
      casesCount: 2,
      description: 'أرض وقفية تحتوي على المسجد الكبير والمرافق التابعة له في البلدة القديمة',
      lastUpdate: '2024-01-15'
    },
    {
      id: 2,
      name: 'وقف الزيتون التجاري',
      type: 'commercial',
      area: 1800,
      coordinates: { lat: 31.9038, lng: 35.2034 },
      boundaries: [
        { lat: 31.9041, lng: 35.2030 },
        { lat: 31.9041, lng: 35.2038 },
        { lat: 31.9035, lng: 35.2038 },
        { lat: 31.9035, lng: 35.2030 }
      ],
      status: 'active',
      value: 3200000,
      city: 'رام الله',
      district: 'رام الله والبيرة',
      manager: 'فاطمة خالد',
      documentsCount: 18,
      casesCount: 1,
      description: 'مجمع تجاري وقفي يحتوي على محلات ومكاتب للإيجار في مركز مدينة رام الله',
      lastUpdate: '2024-01-12'
    },
    {
      id: 3,
      name: 'مقبرة الشهداء',
      type: 'cemetery',
      area: 5000,
      coordinates: { lat: 32.2211, lng: 35.2544 },
      boundaries: [
        { lat: 32.2220, lng: 35.2530 },
        { lat: 32.2220, lng: 35.2558 },
        { lat: 32.2202, lng: 35.2558 },
        { lat: 32.2202, lng: 35.2530 }
      ],
      status: 'active',
      value: 800000,
      city: 'نابلس',
      district: 'نابلس',
      manager: 'محمد علي',
      documentsCount: 8,
      casesCount: 0,
      description: 'مقبرة إسلامية وقفية لدفن الموتى من أبناء المنطقة',
      lastUpdate: '2024-01-08'
    },
    {
      id: 4,
      name: 'مدرسة الأوقاف الابتدائية',
      type: 'school',
      area: 3200,
      coordinates: { lat: 31.5017, lng: 34.4668 },
      boundaries: [
        { lat: 31.5025, lng: 34.4660 },
        { lat: 31.5025, lng: 34.4676 },
        { lat: 31.5009, lng: 34.4676 },
        { lat: 31.5009, lng: 34.4660 }
      ],
      status: 'under_review',
      value: 1500000,
      city: 'غزة',
      district: 'غزة',
      manager: 'سارة أحمد',
      documentsCount: 15,
      casesCount: 3,
      description: 'مدرسة ابتدائية وقفية تخدم أطفال المنطقة في حي الزيتون',
      lastUpdate: '2024-01-14'
    },
    {
      id: 5,
      name: 'أراضي زراعية - وادي النار',
      type: 'agricultural',
      area: 12000,
      coordinates: { lat: 31.5326, lng: 35.0998 },
      boundaries: [
        { lat: 31.5350, lng: 35.0970 },
        { lat: 31.5350, lng: 35.1026 },
        { lat: 31.5302, lng: 35.1026 },
        { lat: 31.5302, lng: 35.0970 }
      ],
      status: 'disputed',
      value: 2800000,
      city: 'الخليل',
      district: 'الخليل',
      manager: 'خالد يوسف',
      documentsCount: 22,
      casesCount: 5,
      description: 'أراضي زراعية وقفية مزروعة بأشجار الزيتون والحمضيات في وادي النار',
      lastUpdate: '2024-01-09'
    }
  ];

  // طبقات الخريطة
  const mapLayers = [
    { 
      id: 'all', 
      name: 'جميع الطبقات', 
      icon: Layers, 
      color: 'text-gray-600',
      count: waqfLands.length
    },
    { 
      id: 'mosque', 
      name: 'المساجد', 
      icon: Building, 
      color: 'text-green-600',
      count: waqfLands.filter(l => l.type === 'mosque').length
    },
    { 
      id: 'cemetery', 
      name: 'المقابر', 
      icon: Cross, 
      color: 'text-gray-600',
      count: waqfLands.filter(l => l.type === 'cemetery').length
    },
    { 
      id: 'school', 
      name: 'المدارس', 
      icon: School, 
      color: 'text-blue-600',
      count: waqfLands.filter(l => l.type === 'school').length
    },
    { 
      id: 'commercial', 
      name: 'التجاري', 
      icon: ShoppingCart, 
      color: 'text-purple-600',
      count: waqfLands.filter(l => l.type === 'commercial').length
    },
    { 
      id: 'residential', 
      name: 'السكني', 
      icon: Home, 
      color: 'text-orange-600',
      count: waqfLands.filter(l => l.type === 'residential').length
    },
    { 
      id: 'agricultural', 
      name: 'الزراعي', 
      icon: TreePine, 
      color: 'text-green-500',
      count: waqfLands.filter(l => l.type === 'agricultural').length
    }
  ];

  // أدوات الخريطة
  const mapTools = [
    { id: 'select', name: 'تحديد', icon: MousePointer, description: 'تحديد العناصر على الخريطة' },
    { id: 'pan', name: 'تحريك', icon: Hand, description: 'تحريك الخريطة' },
    { id: 'zoom_in', name: 'تكبير', icon: ZoomIn, description: 'تكبير الخريطة' },
    { id: 'zoom_out', name: 'تصغير', icon: ZoomOut, description: 'تصغير الخريطة' },
    { id: 'measure_distance', name: 'قياس المسافة', icon: Ruler, description: 'قياس المسافة بين نقطتين' },
    { id: 'measure_area', name: 'قياس المساحة', icon: Square, description: 'قياس مساحة منطقة' },
    { id: 'draw_point', name: 'رسم نقطة', icon: Target, description: 'إضافة نقطة على الخريطة' },
    { id: 'draw_line', name: 'رسم خط', icon: Pen, description: 'رسم خط على الخريطة' },
    { id: 'draw_polygon', name: 'رسم مضلع', icon: Square, description: 'رسم مضلع على الخريطة' },
    { id: 'draw_circle', name: 'رسم دائرة', icon: Circle, description: 'رسم دائرة على الخريطة' }
  ];

  // عروض الخريطة
  const mapViews = [
    { id: 'satellite', name: 'قمر صناعي', icon: Satellite },
    { id: 'streets', name: 'الشوارع', icon: Map },
    { id: 'terrain', name: 'التضاريس', icon: Mountain },
    { id: 'hybrid', name: 'مختلط', icon: Layers }
  ];

  // أدوات التحليل المكاني
  const analysisTools = [
    { id: 'buffer', name: 'تحليل المنطقة المحيطة', icon: Circle, description: 'تحليل المنطقة المحيطة بنقطة أو خط' },
    { id: 'intersection', name: 'تحليل التقاطع', icon: Target, description: 'العثور على تقاطع الطبقات' },
    { id: 'proximity', name: 'تحليل القرب', icon: Navigation, description: 'العثور على أقرب العناصر' },
    { id: 'density', name: 'تحليل الكثافة', icon: Activity, description: 'تحليل كثافة توزيع العناصر' },
    { id: 'statistics', name: 'الإحصائيات المكانية', icon: BarChart3, description: 'حساب الإحصائيات المكانية' },
    { id: 'visibility', name: 'تحليل الرؤية', icon: Eye, description: 'تحليل مجال الرؤية من نقطة' }
  ];

  const getLayerIcon = (layerId: string) => {
    const layer = mapLayers.find(l => l.id === layerId);
    return layer ? layer.icon : Building;
  };

  const getLayerColor = (layerId: string) => {
    const layer = mapLayers.find(l => l.id === layerId);
    return layer ? layer.color : 'text-gray-600';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'disputed':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'under_review':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'disputed':
        return 'bg-red-100 text-red-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const handleLayerToggle = (layerId: string) => {
    if (layerId === 'all') {
      setSelectedLayer(['all']);
    } else {
      const newLayers = selectedLayer.includes('all') 
        ? [layerId]
        : selectedLayer.includes(layerId)
          ? selectedLayer.filter(l => l !== layerId)
          : [...selectedLayer.filter(l => l !== 'all'), layerId];
      
      setSelectedLayer(newLayers.length === 0 ? ['all'] : newLayers);
    }
  };

  const filteredLands = waqfLands.filter(land => {
    const matchesSearch = land.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         land.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         land.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLayer = selectedLayer.includes('all') || selectedLayer.includes(land.type);
    return matchesSearch && matchesLayer;
  });

  // حساب الإحصائيات
  const totalArea = waqfLands.reduce((sum, land) => sum + land.area, 0);
  const totalValue = waqfLands.reduce((sum, land) => sum + land.value, 0);
  const activeLands = waqfLands.filter(land => land.status === 'active').length;
  const disputedLands = waqfLands.filter(land => land.status === 'disputed').length;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">نظام المعلومات الجغرافية (GIS)</h1>
            <p className="text-gray-600">نظام متقدم لإدارة وتحليل الأراضي الوقفية جغرافياً</p>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Download className="w-5 h-5 ml-2" />
              تصدير الخريطة
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <Save className="w-5 h-5 ml-2" />
              حفظ المشروع
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
              <Share2 className="w-5 h-5 ml-2" />
              مشاركة
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Sidebar - Tools and Layers */}
        <div className="w-80 bg-white shadow-lg border-l border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="البحث في الأراضي الوقفية..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 pl-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Statistics */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">إحصائيات سريعة</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600">{waqfLands.length}</p>
                <p className="text-xs text-gray-600">إجمالي الأراضي</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">{activeLands}</p>
                <p className="text-xs text-gray-600">أراضي نشطة</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <p className="text-lg font-bold text-purple-600">{(totalArea / 1000).toFixed(1)}K</p>
                <p className="text-xs text-gray-600">م² إجمالي</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg text-center">
                <p className="text-lg font-bold text-orange-600">{disputedLands}</p>
                <p className="text-xs text-gray-600">متنازع عليها</p>
              </div>
            </div>
          </div>

          {/* Map Tools */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">أدوات الخريطة</h3>
              <button
                onClick={() => setShowToolsPanel(!showToolsPanel)}
                className="text-gray-500 hover:text-gray-700"
              >
                {showToolsPanel ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {showToolsPanel && (
              <div className="grid grid-cols-2 gap-2">
                {mapTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                      selectedTool === tool.id
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                    title={tool.description}
                  >
                    <tool.icon className="w-5 h-5 mb-1" />
                    <span className="text-xs text-center">{tool.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Map Layers */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">طبقات الخريطة</h3>
              <button
                onClick={() => setShowLayersPanel(!showLayersPanel)}
                className="text-gray-500 hover:text-gray-700"
              >
                {showLayersPanel ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {showLayersPanel && (
              <div className="space-y-2">
                {mapLayers.map((layer) => {
                  const LayerIcon = layer.icon;
                  const isSelected = selectedLayer.includes(layer.id);
                  return (
                    <button
                      key={layer.id}
                      onClick={() => handleLayerToggle(layer.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                        isSelected
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <LayerIcon className={`w-5 h-5 ${isSelected ? 'text-green-600' : layer.color}`} />
                        <span className="font-medium">{layer.name}</span>
                      </div>
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                        {layer.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Map Views */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">عرض الخريطة</h3>
            <div className="grid grid-cols-2 gap-2">
              {mapViews.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setMapView(view.id)}
                  className={`flex items-center space-x-2 space-x-reverse p-2 rounded-lg transition-all ${
                    mapView === view.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <view.icon className="w-4 h-4" />
                  <span className="text-sm">{view.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Analysis Tools */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">أدوات التحليل</h3>
              <button
                onClick={() => setShowAnalysisPanel(!showAnalysisPanel)}
                className="text-gray-500 hover:text-gray-700"
              >
                {showAnalysisPanel ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {showAnalysisPanel && (
              <div className="space-y-2">
                {analysisTools.map((tool) => (
                  <button
                    key={tool.id}
                    className="w-full flex items-center space-x-3 space-x-reverse p-3 rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all"
                    title={tool.description}
                  >
                    <tool.icon className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">{tool.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Lands List */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="font-semibold text-gray-800 mb-3">الأراضي الوقفية ({filteredLands.length})</h3>
            <div className="space-y-3">
              {filteredLands.map((land) => {
                const LayerIcon = getLayerIcon(land.type);
                return (
                  <div
                    key={land.id}
                    onClick={() => setSelectedLand(land)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedLand?.id === land.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <LayerIcon className={`w-4 h-4 ${getLayerColor(land.type)}`} />
                        <span className="font-medium text-gray-800 text-sm">{land.name}</span>
                      </div>
                      {getStatusIcon(land.status)}
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>{land.city} - {land.area.toLocaleString()} م²</p>
                      <p>{land.manager}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(land.status)}`}>
                        {land.status === 'active' ? 'نشط' : 
                         land.status === 'disputed' ? 'متنازع' :
                         land.status === 'under_review' ? 'قيد المراجعة' : 'غير نشط'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {land.value.toLocaleString()} ₪
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Map Area */}
        <div className="flex-1 relative">
          {/* Map Container */}
          <div 
            ref={mapRef}
            className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden"
          >
            {/* Map Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="map-grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#map-grid)" className="text-gray-400"/>
              </svg>
            </div>

            {/* Map Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Map className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">خريطة تفاعلية</h3>
                <p className="text-gray-500">عرض: {mapViews.find(v => v.id === mapView)?.name}</p>
                <p className="text-gray-500">الأداة المحددة: {mapTools.find(t => t.id === selectedTool)?.name}</p>
                <p className="text-gray-500">المركز: {mapCenter.lat.toFixed(4)}, {mapCenter.lng.toFixed(4)}</p>
                <p className="text-gray-500">مستوى التكبير: {zoomLevel}</p>
              </div>
            </div>

            {/* Simulated Land Markers */}
            {filteredLands.map((land, index) => {
              const LayerIcon = getLayerIcon(land.type);
              return (
                <div
                  key={land.id}
                  onClick={() => setSelectedLand(land)}
                  className={`absolute w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all transform hover:scale-110 ${
                    selectedLand?.id === land.id ? 'bg-green-600 shadow-lg' : 'bg-white shadow-md'
                  }`}
                  style={{
                    top: `${20 + (index * 15)}%`,
                    right: `${20 + (index * 12)}%`
                  }}
                >
                  <LayerIcon className={`w-4 h-4 ${
                    selectedLand?.id === land.id ? 'text-white' : getLayerColor(land.type)
                  }`} />
                </div>
              );
            })}

            {/* Map Controls */}
            <div className="absolute top-4 left-4 space-y-2">
              <button
                onClick={() => setZoomLevel(prev => Math.min(prev + 1, 18))}
                className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ZoomIn className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setZoomLevel(prev => Math.max(prev - 1, 1))}
                className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ZoomOut className="w-5 h-5 text-gray-600" />
              </button>
              <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Navigation className="w-5 h-5 text-gray-600" />
              </button>
              <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Compass className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Coordinates Display */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-2">
              <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                <Crosshair className="w-4 h-4" />
                <span>الإحداثيات: {mapCenter.lat.toFixed(6)}, {mapCenter.lng.toFixed(6)}</span>
              </div>
            </div>

            {/* Scale Bar */}
            <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md p-2">
              <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                <Ruler className="w-4 h-4" />
                <span>المقياس: 1:{(1000 * Math.pow(2, 18 - zoomLevel)).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Land Details */}
        {selectedLand && (
          <div className="w-96 bg-white shadow-lg border-r border-gray-200 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">تفاصيل الأرض الوقفية</h3>
                <button
                  onClick={() => setSelectedLand(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Basic Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 space-x-reverse mb-3">
                    {React.createElement(getLayerIcon(selectedLand.type), {
                      className: `w-8 h-8 ${getLayerColor(selectedLand.type)}`
                    })}
                    <div>
                      <h4 className="font-semibold text-gray-800">{selectedLand.name}</h4>
                      <p className="text-sm text-gray-600">{selectedLand.city}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{selectedLand.description}</p>
                </div>

                {/* Geographic Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">المعلومات الجغرافية</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">المساحة:</span>
                      <span className="font-medium">{selectedLand.area.toLocaleString()} م²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">خط العرض:</span>
                      <span className="font-medium">{selectedLand.coordinates.lat.toFixed(6)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">خط الطول:</span>
                      <span className="font-medium">{selectedLand.coordinates.lng.toFixed(6)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">المحافظة:</span>
                      <span className="font-medium">{selectedLand.district}</span>
                    </div>
                  </div>
                </div>

                {/* Status and Value */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">الحالة والقيمة</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">الحالة:</span>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        {getStatusIcon(selectedLand.status)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(selectedLand.status)}`}>
                          {selectedLand.status === 'active' ? 'نشط' : 
                           selectedLand.status === 'disputed' ? 'متنازع عليه' :
                           selectedLand.status === 'under_review' ? 'قيد المراجعة' : 'غير نشط'}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">القيمة التقديرية:</span>
                      <span className="font-medium text-green-600">{selectedLand.value.toLocaleString()} ₪</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">المدير المسؤول:</span>
                      <span className="font-medium">{selectedLand.manager}</span>
                    </div>
                  </div>
                </div>

                {/* Related Data */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">البيانات المرتبطة</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-600">الوثائق</span>
                      </div>
                      <span className="font-medium">{selectedLand.documentsCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-gray-600">القضايا</span>
                      </div>
                      <span className="font-medium">{selectedLand.casesCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-gray-600">آخر تحديث</span>
                      </div>
                      <span className="font-medium text-xs">
                        {new Date(selectedLand.lastUpdate).toLocaleDateString('ar-EG')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Boundaries */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">نقاط الحدود</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {selectedLand.boundaries.map((point: any, index: number) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">النقطة {index + 1}:</span>
                        <span className="font-mono">{point.lat.toFixed(4)}, {point.lng.toFixed(4)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Eye className="w-4 h-4 ml-2" />
                    تكبير على الخريطة
                  </button>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                    <FileText className="w-4 h-4 ml-2" />
                    عرض الوثائق
                  </button>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 ml-2" />
                    عرض القضايا
                  </button>
                  <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center">
                    <Ruler className="w-4 h-4 ml-2" />
                    قياس المساحة
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-white border-t border-gray-200 p-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4 space-x-reverse">
            <span>الأداة النشطة: {mapTools.find(t => t.id === selectedTool)?.name}</span>
            <span>الطبقات المرئية: {selectedLayer.includes('all') ? 'جميع الطبقات' : selectedLayer.length}</span>
            <span>الأراضي المعروضة: {filteredLands.length}</span>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <span>إجمالي المساحة: {totalArea.toLocaleString()} م²</span>
            <span>إجمالي القيمة: {totalValue.toLocaleString()} ₪</span>
          </div>
        </div>
      </div>

      {/* Floating Analysis Panel */}
      {showAnalysisPanel && (
        <div className="fixed top-20 left-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">لوحة التحليل المكاني</h3>
              <button
                onClick={() => setShowAnalysisPanel(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">تحليل التوزيع</h4>
              <div className="space-y-1 text-sm text-blue-700">
                <p>المساجد: {waqfLands.filter(l => l.type === 'mosque').length} موقع</p>
                <p>التجاري: {waqfLands.filter(l => l.type === 'commercial').length} موقع</p>
                <p>الزراعي: {waqfLands.filter(l => l.type === 'agricultural').length} موقع</p>
              </div>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">تحليل المساحات</h4>
              <div className="space-y-1 text-sm text-green-700">
                <p>أكبر أرض: {Math.max(...waqfLands.map(l => l.area)).toLocaleString()} م²</p>
                <p>أصغر أرض: {Math.min(...waqfLands.map(l => l.area)).toLocaleString()} م²</p>
                <p>متوسط المساحة: {Math.round(totalArea / waqfLands.length).toLocaleString()} م²</p>
              </div>
            </div>
            
            <div className="bg-purple-50 p-3 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">تحليل القيم</h4>
              <div className="space-y-1 text-sm text-purple-700">
                <p>أعلى قيمة: {Math.max(...waqfLands.map(l => l.value)).toLocaleString()} ₪</p>
                <p>أقل قيمة: {Math.min(...waqfLands.map(l => l.value)).toLocaleString()} ₪</p>
                <p>متوسط القيمة: {Math.round(totalValue / waqfLands.length).toLocaleString()} ₪</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GISSystem;