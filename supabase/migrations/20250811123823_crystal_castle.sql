/*
  # إدراج البيانات التجريبية

  1. البيانات المدرجة
    - بيانات الأراضي الوقفية التجريبية
    - قضايا تجريبية
    - وثائق تجريبية
    - مواعيد تجريبية
    - أخبار وإعلانات تجريبية
    - صلاحيات المستخدمين

  2. الهدف
    - توفير بيانات للاختبار والعرض
    - إظهار وظائف النظام
*/

-- إدراج بيانات الأراضي الوقفية التجريبية
INSERT INTO waqf_lands (
  name, description, area, location, type, status, value, monthly_income, monthly_expenses,
  manager_name, manager_id, governorate, establishment_date, historical_period, founder,
  management_type, maintenance_status, national_registry_id
) VALUES
  (
    'المسجد الأقصى المبارك',
    'أولى القبلتين وثالث الحرمين الشريفين، أقدس المساجد في فلسطين والعالم الإسلامي',
    144000,
    '{"address": "الحرم القدسي الشريف", "city": "القدس", "district": "البلدة القديمة", "lat": 31.7767, "lng": 35.2345}',
    'mosque',
    'active',
    50000000,
    0,
    50000,
    'الشيخ عكرمة صبري',
    1,
    'JER',
    '691-01-01',
    'umayyad',
    'الخليفة عبد الملك بن مروان',
    'ministry_direct',
    'excellent',
    'PS-JER-001-MSQ-001'
  ),
  (
    'وقف الزيتون التجاري',
    'مجمع تجاري وقفي يحتوي على محلات ومكاتب للإيجار في مركز مدينة رام الله',
    1800,
    '{"address": "شارع عمر بن الخطاب", "city": "رام الله", "district": "وسط المدينة", "lat": 31.9038, "lng": 35.2034}',
    'commercial',
    'active',
    3200000,
    28000,
    12000,
    'فاطمة خالد يوسف',
    3,
    'RAM',
    '2019-03-22',
    'modern',
    'جمعية الأوقاف الخيرية',
    'private_manager',
    'good',
    'PS-RAM-002-COM-001'
  ),
  (
    'مقبرة الشهداء',
    'مقبرة إسلامية وقفية لدفن الموتى من أبناء المنطقة في نابلس',
    5000,
    '{"address": "طريق نابلس الرئيسي", "city": "نابلس", "district": "شرق المدينة", "lat": 32.2211, "lng": 35.2544}',
    'cemetery',
    'active',
    800000,
    2000,
    3000,
    'محمد علي حسن',
    5,
    'NAB',
    '1950-01-01',
    'modern',
    'بلدية نابلس',
    'local_committee',
    'fair',
    'PS-NAB-003-CEM-001'
  ),
  (
    'مدرسة الأوقاف الابتدائية',
    'مدرسة ابتدائية وقفية تخدم أطفال المنطقة في حي الزيتون',
    3200,
    '{"address": "حي الزيتون", "city": "غزة", "district": "حي الزيتون", "lat": 31.5017, "lng": 34.4668}',
    'school',
    'under_review',
    1500000,
    5000,
    18000,
    'سارة أحمد محمود',
    4,
    'GAZ',
    '2021-09-05',
    'modern',
    'وزارة الأوقاف',
    'ministry_direct',
    'good',
    'PS-GAZ-004-SCH-001'
  ),
  (
    'أراضي زراعية - وادي النار',
    'أراضي زراعية وقفية مزروعة بأشجار الزيتون والحمضيات في وادي النار',
    12000,
    '{"address": "وادي النار", "city": "الخليل", "district": "وادي النار", "lat": 31.5326, "lng": 35.0998}',
    'agricultural',
    'disputed',
    2800000,
    8000,
    5000,
    'خالد يوسف إبراهيم',
    6,
    'HEB',
    '1800-01-01',
    'ottoman',
    'عائلة الخليلي الوقفية',
    'family_managed',
    'needs_assessment',
    'PS-HEB-005-AGR-001'
  )
ON CONFLICT (national_registry_id) DO NOTHING;

-- إدراج قضايا تجريبية
INSERT INTO cases (
  title, description, type, status, priority, waqf_land_id, assigned_to, created_by, due_date
) VALUES
  (
    'نزاع حدود أرض المسجد الكبير',
    'نزاع حول الحدود الشرقية لأرض المسجد الكبير مع الأراضي المجاورة في البلدة القديمة',
    'boundary',
    'in_progress',
    'high',
    1,
    2,
    1,
    '2024-02-15'
  ),
  (
    'مراجعة إيرادات وقف الزيتون',
    'مراجعة شاملة لإيرادات ومصروفات وقف الزيتون للربع الأخير من العام',
    'income',
    'open',
    'medium',
    2,
    3,
    1,
    '2024-01-30'
  ),
  (
    'صيانة طارئة لمسجد الرحمة',
    'إصلاح تسريب في سقف مسجد الرحمة وتجديد نظام الإضاءة',
    'maintenance',
    'resolved',
    'urgent',
    NULL,
    2,
    1,
    '2024-01-20'
  )
ON CONFLICT DO NOTHING;

-- إدراج أخبار تجريبية
INSERT INTO news (
  title, excerpt, content, image_url, author, category, status, view_count, is_featured, tags, published_at
) VALUES
  (
    'وزير الأوقاف يفتتح المسجد الجديد في حي الزيتون',
    'افتتح وزير الأوقاف والشؤون الدينية المسجد الجديد في حي الزيتون بمدينة غزة، والذي يتسع لـ 500 مصلي.',
    'افتتح وزير الأوقاف والشؤون الدينية اليوم المسجد الجديد في حي الزيتون بمدينة غزة، والذي يتسع لـ 500 مصلي. يأتي هذا المشروع ضمن خطة الوزارة لتعزيز الخدمات الدينية في المناطق المكتظة بالسكان.',
    'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800',
    'إدارة الأخبار',
    'mosques',
    'published',
    1250,
    true,
    ARRAY['افتتاح مسجد', 'غزة', 'حي الزيتون', 'وزير الأوقاف'],
    '2024-01-15 10:00:00'
  ),
  (
    'انطلاق مسابقة القرآن الكريم السنوية',
    'تنطلق غداً مسابقة القرآن الكريم السنوية على مستوى فلسطين بمشاركة أكثر من 200 متسابق.',
    'تنطلق غداً مسابقة القرآن الكريم السنوية على مستوى فلسطين بمشاركة أكثر من 200 متسابق من مختلف المحافظات. المسابقة تهدف إلى تشجيع الشباب على حفظ القرآن الكريم وتلاوته.',
    'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800',
    'قسم الأنشطة',
    'events',
    'published',
    890,
    true,
    ARRAY['مسابقة قرآن', 'شباب', 'فلسطين', 'تلاوة'],
    '2024-01-14 09:00:00'
  )
ON CONFLICT DO NOTHING;

-- إدراج إعلانات تجريبية
INSERT INTO announcements (
  title, content, priority, valid_until, is_active, target_audience, created_by
) VALUES
  (
    'إغلاق استثنائي للمسجد الأقصى يوم الجمعة',
    'تعلن الوزارة عن إغلاق استثنائي للمسجد الأقصى يوم الجمعة القادم لأعمال الصيانة الطارئة من الساعة 6 صباحاً حتى 2 ظهراً.',
    'urgent',
    '2024-01-19',
    true,
    'public',
    1
  ),
  (
    'فتح باب التسجيل لدورة تأهيل الأئمة',
    'تعلن الوزارة عن فتح باب التسجيل لدورة تأهيل الأئمة والخطباء الجدد للعام 2024. الدورة تستمر 3 أشهر وتشمل التدريب على الخطابة والإرشاد الديني.',
    'high',
    '2024-01-30',
    true,
    'public',
    1
  )
ON CONFLICT DO NOTHING;

-- إدراج أنشطة تجريبية
INSERT INTO activities (
  title, description, category, type, start_date, end_date, location, organizer, max_participants, current_participants, status, image_url
) VALUES
  (
    'مسابقة القرآن الكريم السنوية',
    'مسابقة قرآنية كبرى على مستوى فلسطين بمشاركة أكثر من 200 متسابق من جميع المحافظات',
    'religious',
    'competition',
    '2024-02-15',
    '2024-02-17',
    'المسجد الكبير - القدس',
    'إدارة التعليم الديني',
    200,
    156,
    'upcoming',
    'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800'
  ),
  (
    'ندوة الأخلاق الإسلامية في العمل',
    'ندوة تثقيفية حول تطبيق الأخلاق الإسلامية في بيئة العمل المعاصرة وأثرها على الإنتاجية',
    'educational',
    'seminar',
    '2024-02-20',
    '2024-02-20',
    'قاعة المؤتمرات - رام الله',
    'إدارة الشؤون الدينية',
    150,
    89,
    'upcoming',
    'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800'
  )
ON CONFLICT DO NOTHING;

-- إدراج صلاحيات المستخدمين
INSERT INTO user_permissions (user_id, module, permissions, governorate_restricted, allowed_governorates) VALUES
  -- مدير النظام العام - صلاحيات كاملة
  (1, 'cases_management', ARRAY['create', 'read', 'update', 'delete', 'assign', 'close'], false, ARRAY[]::text[]),
  (1, 'waqf_lands', ARRAY['create', 'read', 'update', 'delete', 'manage'], false, ARRAY[]::text[]),
  (1, 'documents', ARRAY['upload', 'read', 'update', 'delete', 'archive'], false, ARRAY[]::text[]),
  (1, 'users', ARRAY['create', 'read', 'update', 'delete', 'manage_permissions'], false, ARRAY[]::text[]),
  (1, 'reports', ARRAY['create', 'read', 'export'], false, ARRAY[]::text[]),
  (1, 'settings', ARRAY['read', 'update'], false, ARRAY[]::text[]),
  
  -- مدير القضايا - القدس
  (2, 'cases_management', ARRAY['create', 'read', 'update', 'assign'], true, ARRAY['JER']),
  (2, 'documents', ARRAY['upload', 'read', 'update'], true, ARRAY['JER']),
  (2, 'waqf_lands', ARRAY['read'], true, ARRAY['JER']),
  
  -- مدير الأراضي الوقفية - رام الله
  (3, 'waqf_lands', ARRAY['create', 'read', 'update', 'manage'], true, ARRAY['RAM']),
  (3, 'documents', ARRAY['upload', 'read', 'update'], true, ARRAY['RAM']),
  (3, 'gis', ARRAY['read', 'update'], true, ARRAY['RAM']),
  
  -- مدير الوثائق والأرشيف
  (4, 'documents', ARRAY['upload', 'read', 'update', 'delete', 'archive'], true, ARRAY['JER', 'RAM', 'NAB']),
  (4, 'archive', ARRAY['create', 'read', 'update', 'manage'], true, ARRAY['JER', 'RAM', 'NAB']),
  
  -- موظف - نابلس
  (5, 'cases_management', ARRAY['read', 'update'], true, ARRAY['NAB']),
  (5, 'waqf_lands', ARRAY['read'], true, ARRAY['NAB']),
  (5, 'documents', ARRAY['upload', 'read'], true, ARRAY['NAB']),
  
  -- المدير الإقليمي - غزة
  (6, 'cases_management', ARRAY['create', 'read', 'update', 'assign'], true, ARRAY['GAZ', 'N_GAZ', 'DEI', 'KHA', 'RAF']),
  (6, 'waqf_lands', ARRAY['create', 'read', 'update'], true, ARRAY['GAZ', 'N_GAZ', 'DEI', 'KHA', 'RAF']),
  (6, 'documents', ARRAY['upload', 'read', 'update'], true, ARRAY['GAZ', 'N_GAZ', 'DEI', 'KHA', 'RAF'])
ON CONFLICT (user_id, module) DO NOTHING;