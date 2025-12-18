# دليل استخدام قاعدة البيانات

## المحتويات
1. [الاتصال بقاعدة البيانات](#الاتصال-بقاعدة-البيانات)
2. [الاستعلامات الشائعة](#الاستعلامات-الشائعة)
3. [أمثلة عملية](#أمثلة-عملية)
4. [إدارة البيانات](#إدارة-البيانات)

---

## الاتصال بقاعدة البيانات

### في تطبيق React/TypeScript

```typescript
import { supabase } from './lib/supabase';

// مثال: جلب الأراضي الوقفية
const { data, error } = await supabase
  .from('waqf_lands')
  .select('*')
  .eq('status', 'active');
```

---

## الاستعلامات الشائعة

### 1. الأراضي الوقفية

#### جلب جميع الأراضي النشطة
```typescript
const { data, error } = await supabase
  .from('waqf_lands')
  .select(`
    *,
    governorates(name_ar),
    waqf_managers(name_ar)
  `)
  .eq('status', 'active')
  .order('created_at', { ascending: false });
```

#### البحث عن أرض وقفية
```typescript
const { data, error } = await supabase
  .from('waqf_lands')
  .select('*')
  .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
```

#### إحصائيات الأراضي حسب النوع
```typescript
const { data, error } = await supabase
  .from('waqf_lands')
  .select('type, count')
  .eq('status', 'active');
```

### 2. العقود والإيجارات

#### جلب العقود النشطة مع تفاصيل المستأجر
```typescript
const { data, error } = await supabase
  .from('contracts')
  .select(`
    *,
    tenants(name_ar, phone, email),
    waqf_lands(name, type)
  `)
  .eq('status', 'active')
  .gte('end_date', new Date().toISOString());
```

#### العقود التي ستنتهي قريباً (خلال 30 يوم)
```typescript
const thirtyDaysFromNow = new Date();
thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

const { data, error } = await supabase
  .from('contracts')
  .select(`
    *,
    tenants(name_ar, phone),
    waqf_lands(name)
  `)
  .eq('status', 'active')
  .lte('end_date', thirtyDaysFromNow.toISOString())
  .gte('end_date', new Date().toISOString());
```

### 3. التفتيش والصيانة

#### جلب التفتيشات الأخيرة
```typescript
const { data, error } = await supabase
  .from('inspections')
  .select(`
    *,
    waqf_lands(name, type),
    waqf_managers(name_ar)
  `)
  .eq('status', 'completed')
  .order('inspection_date', { ascending: false })
  .limit(10);
```

#### الأراضي التي تحتاج صيانة عاجلة
```typescript
const { data, error } = await supabase
  .from('inspections')
  .select(`
    waqf_land_id,
    waqf_lands(name, type, governorate),
    findings,
    priority
  `)
  .eq('requires_maintenance', true)
  .in('priority', ['high', 'urgent'])
  .eq('status', 'completed');
```

#### إضافة سجل صيانة جديد
```typescript
const { data, error } = await supabase
  .from('maintenance_records')
  .insert({
    waqf_land_id: 1,
    maintenance_type: 'preventive',
    description: 'صيانة دورية للمسجد',
    priority: 'medium',
    status: 'pending',
    estimated_cost: 5000,
    scheduled_date: '2025-02-01'
  });
```

### 4. المعاملات المالية

#### إضافة معاملة دخل
```typescript
const { data, error } = await supabase
  .from('financial_transactions')
  .insert({
    transaction_number: 'TRX-2025-001',
    waqf_land_id: 1,
    transaction_type: 'income',
    category: 'rent',
    description: 'إيجار شهر يناير 2025',
    amount: 3000,
    payment_method: 'bank_transfer',
    transaction_date: new Date().toISOString(),
    status: 'completed',
    fiscal_year: 2025,
    recorded_by: userId
  });
```

#### تقرير الإيرادات الشهرية
```typescript
const { data, error } = await supabase
  .from('financial_transactions')
  .select('amount')
  .eq('transaction_type', 'income')
  .eq('fiscal_year', 2025)
  .gte('transaction_date', '2025-01-01')
  .lte('transaction_date', '2025-01-31');

const totalIncome = data?.reduce((sum, t) => sum + t.amount, 0);
```

#### تقرير المصروفات حسب الفئة
```typescript
const { data, error } = await supabase
  .from('financial_transactions')
  .select('category, amount')
  .eq('transaction_type', 'expense')
  .eq('fiscal_year', 2025);

const expensesByCategory = data?.reduce((acc, t) => {
  acc[t.category] = (acc[t.category] || 0) + t.amount;
  return acc;
}, {});
```

### 5. المستندات

#### رفع مستند جديد
```typescript
// 1. رفع الملف إلى Storage
const { data: fileData, error: uploadError } = await supabase.storage
  .from('documents')
  .upload(`contracts/${filename}`, file);

// 2. الحصول على URL العام
const { data: { publicUrl } } = supabase.storage
  .from('documents')
  .getPublicUrl(`contracts/${filename}`);

// 3. حفظ معلومات المستند في قاعدة البيانات
const { data, error } = await supabase
  .from('waqf_documents')
  .insert({
    document_number: 'DOC-2025-001',
    title_ar: 'عقد إيجار المحل رقم 5',
    category_id: 1,
    document_type: 'contract',
    related_entity_type: 'contract',
    related_entity_id: 10,
    file_url: publicUrl,
    access_level: 'internal',
    created_by: userId
  });
```

#### البحث عن المستندات
```typescript
const { data, error } = await supabase
  .from('waqf_documents')
  .select(`
    *,
    document_categories(name_ar)
  `)
  .textSearch('title_ar', searchTerm, { type: 'websearch' })
  .eq('status', 'active');
```

### 6. الإشعارات

#### إنشاء إشعار جديد
```typescript
const { data, error } = await supabase
  .from('user_notifications')
  .insert({
    user_id: targetUserId,
    title_ar: 'عقد ينتهي قريباً',
    message_ar: `عقد رقم ${contractNumber} سينتهي خلال 7 أيام`,
    notification_type: 'warning',
    category: 'contract',
    priority: 'high',
    related_entity_type: 'contract',
    related_entity_id: contractId,
    action_url: `/admin/contracts/${contractId}`
  });
```

#### جلب إشعارات المستخدم الحالي
```typescript
const { data, error } = await supabase
  .from('user_notifications')
  .select('*')
  .eq('user_id', userId)
  .eq('is_read', false)
  .order('created_at', { ascending: false });
```

#### تحديث حالة الإشعار إلى "مقروء"
```typescript
const { data, error } = await supabase
  .from('user_notifications')
  .update({
    is_read: true,
    read_at: new Date().toISOString()
  })
  .eq('id', notificationId);
```

### 7. المهام

#### إنشاء مهمة جديدة
```typescript
const { data, error } = await supabase
  .from('user_tasks')
  .insert({
    title_ar: 'تفتيش مسجد الرحمة',
    description: 'إجراء تفتيش دوري شامل',
    task_type: 'inspection',
    priority: 'high',
    status: 'pending',
    related_entity_type: 'waqf_land',
    related_entity_id: 5,
    assigned_to: inspectorUserId,
    assigned_by: currentUserId,
    due_date: '2025-02-15',
    created_by: currentUserId
  });
```

#### تحديث حالة المهمة
```typescript
const { data, error } = await supabase
  .from('user_tasks')
  .update({
    status: 'in_progress',
    start_date: new Date().toISOString(),
    completion_percentage: 25
  })
  .eq('id', taskId);
```

---

## أمثلة عملية

### مثال 1: إدارة عقد إيجار كامل

```typescript
async function createNewLease(leaseData) {
  // 1. إنشاء المستأجر (إذا كان جديد)
  const { data: tenant, error: tenantError } = await supabase
    .from('tenants')
    .insert({
      name_ar: leaseData.tenantName,
      national_id: leaseData.tenantId,
      phone: leaseData.phone,
      email: leaseData.email,
      tenant_type: 'individual'
    })
    .select()
    .single();

  // 2. إنشاء العقد
  const { data: contract, error: contractError } = await supabase
    .from('contracts')
    .insert({
      contract_number: generateContractNumber(),
      waqf_land_id: leaseData.waqfLandId,
      tenant_id: tenant.id,
      contract_type: 'lease',
      start_date: leaseData.startDate,
      end_date: leaseData.endDate,
      monthly_amount: leaseData.monthlyRent,
      status: 'active'
    })
    .select()
    .single();

  // 3. إنشاء تفاصيل الإيجار
  const { data: lease, error: leaseError } = await supabase
    .from('leases')
    .insert({
      contract_id: contract.id,
      lease_number: contract.contract_number,
      monthly_rent: leaseData.monthlyRent,
      leased_area: leaseData.area,
      utilities_included: false,
      maintenance_responsibility: 'tenant'
    });

  // 4. إنشاء إشعار للمتابعة
  await supabase
    .from('user_notifications')
    .insert({
      user_id: managerId,
      title_ar: 'عقد إيجار جديد',
      message_ar: `تم إنشاء عقد إيجار جديد رقم ${contract.contract_number}`,
      notification_type: 'success',
      category: 'contract'
    });

  return { contract, lease, tenant };
}
```

### مثال 2: نظام التفتيش والصيانة المتكامل

```typescript
async function performInspectionWorkflow(waqfLandId, inspectorId) {
  // 1. إنشاء سجل التفتيش
  const { data: inspection, error } = await supabase
    .from('inspections')
    .insert({
      waqf_land_id: waqfLandId,
      inspector_id: inspectorId,
      inspection_date: new Date().toISOString(),
      inspection_type: 'routine',
      status: 'scheduled'
    })
    .select()
    .single();

  // 2. إنشاء مهمة للمفتش
  await supabase
    .from('user_tasks')
    .insert({
      title_ar: 'تفتيش دوري',
      task_type: 'inspection',
      priority: 'medium',
      status: 'pending',
      related_entity_type: 'inspection',
      related_entity_id: inspection.id,
      assigned_to: inspectorId,
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // بعد أسبوع
    });

  // 3. إشعار المفتش
  await supabase
    .from('user_notifications')
    .insert({
      user_id: inspectorId,
      title_ar: 'مهمة تفتيش جديدة',
      message_ar: 'تم تعيين مهمة تفتيش دورية لك',
      notification_type: 'info',
      category: 'inspection',
      priority: 'normal'
    });

  return inspection;
}

async function completeInspection(inspectionId, findings) {
  // 1. تحديث سجل التفتيش
  const { data: inspection } = await supabase
    .from('inspections')
    .update({
      status: 'completed',
      findings: findings.notes,
      overall_rating: findings.rating,
      requires_maintenance: findings.needsMaintenance,
      priority: findings.priority
    })
    .eq('id', inspectionId)
    .select()
    .single();

  // 2. إذا كان يحتاج صيانة، إنشاء سجل صيانة
  if (findings.needsMaintenance) {
    await supabase
      .from('maintenance_records')
      .insert({
        waqf_land_id: inspection.waqf_land_id,
        inspection_id: inspectionId,
        maintenance_type: 'corrective',
        description: findings.maintenanceDescription,
        priority: findings.priority,
        status: 'pending',
        estimated_cost: findings.estimatedCost
      });

    // 3. إنشاء تنبيه
    await supabase
      .from('system_alerts')
      .insert({
        alert_type: 'maintenance_required',
        title_ar: 'صيانة مطلوبة',
        severity: findings.priority === 'urgent' ? 'critical' : 'high',
        related_entity_type: 'waqf_land',
        related_entity_id: inspection.waqf_land_id
      });
  }

  return inspection;
}
```

### مثال 3: التقارير المالية

```typescript
async function generateFinancialReport(year: number, quarter?: number) {
  // 1. الإيرادات
  let incomeQuery = supabase
    .from('financial_transactions')
    .select('amount, category, transaction_date')
    .eq('transaction_type', 'income')
    .eq('fiscal_year', year);

  if (quarter) {
    const startMonth = (quarter - 1) * 3 + 1;
    const endMonth = quarter * 3;
    incomeQuery = incomeQuery
      .gte('transaction_date', `${year}-${startMonth.toString().padStart(2, '0')}-01`)
      .lt('transaction_date', `${year}-${(endMonth + 1).toString().padStart(2, '0')}-01`);
  }

  const { data: income } = await incomeQuery;

  // 2. المصروفات
  let expenseQuery = supabase
    .from('financial_transactions')
    .select('amount, category, transaction_date')
    .eq('transaction_type', 'expense')
    .eq('fiscal_year', year);

  if (quarter) {
    const startMonth = (quarter - 1) * 3 + 1;
    const endMonth = quarter * 3;
    expenseQuery = expenseQuery
      .gte('transaction_date', `${year}-${startMonth.toString().padStart(2, '0')}-01`)
      .lt('transaction_date', `${year}-${(endMonth + 1).toString().padStart(2, '0')}-01`);
  }

  const { data: expenses } = await expenseQuery;

  // 3. الحسابات
  const totalIncome = income?.reduce((sum, t) => sum + Number(t.amount), 0) || 0;
  const totalExpenses = expenses?.reduce((sum, t) => sum + Number(t.amount), 0) || 0;
  const netIncome = totalIncome - totalExpenses;

  // 4. تحليل حسب الفئة
  const incomeByCategory = income?.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
    return acc;
  }, {});

  const expensesByCategory = expenses?.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
    return acc;
  }, {});

  return {
    period: quarter ? `Q${quarter} ${year}` : `${year}`,
    totalIncome,
    totalExpenses,
    netIncome,
    incomeByCategory,
    expensesByCategory
  };
}
```

---

## إدارة البيانات

### نسخ احتياطي للبيانات

```bash
# استخدام أدوات Supabase CLI
supabase db dump -f backup.sql
```

### استعادة البيانات

```bash
# استعادة من ملف SQL
psql -h your-project.supabase.co -U postgres -d postgres -f backup.sql
```

---

## أفضل الممارسات

### 1. الأمان
- استخدم RLS دائماً
- لا تكشف معلومات حساسة في الـ frontend
- تحقق من صلاحيات المستخدم

### 2. الأداء
- استخدم الفهارس للبحث السريع
- تجنب جلب بيانات غير ضرورية
- استخدم pagination للقوائم الطويلة

### 3. البيانات
- تحقق من صحة البيانات قبل الإدخال
- استخدم transactions للعمليات المعقدة
- احتفظ بنسخ احتياطية دورية

---

## الموارد الإضافية

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
