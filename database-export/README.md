# 📦 أدوات تصدير قاعدة البيانات

أدوات بسيطة لتصدير جميع بيانات قاعدة البيانات من Supabase.

---

## 🚀 البداية السريعة

### 1. التثبيت
```bash
cd database-export
npm install
```

### 2. إعداد كلمة المرور

**احصل على كلمة المرور:**
1. اذهب إلى: https://supabase.com/dashboard/project/lyeryfsrhrxuepuqepgi/settings/database
2. انسخ كلمة مرور قاعدة البيانات

**استبدل في الملفات:**
- افتح `export-all-tables.js` (السطر 11)
- افتح `preview-database.js` (السطر 7)
- استبدل `[YOUR-PASSWORD]` بكلمة المرور الحقيقية

### 3. التشغيل

**معاينة البيانات أولاً:**
```bash
npm run preview
```

**تصدير كل شيء:**
```bash
npm run export
```

---

## 📊 ماذا سيُصدّر؟

✅ **26 جدول** تشمل:
- users, user_roles, permissions, role_permissions
- waqf_lands, land_documents, land_transactions
- mosques, mosque_services
- cases, case_documents, case_updates
- appointments, documents, news, announcements
- friday_sermons, activities, projects, media_gallery
- services, e_services, contacts, notifications
- audit_logs, system_settings

✅ **بصيغتين:**
- **JSON** - قابل للقراءة والمعالجة البرمجية
- **SQL** - قابل للاستيراد مباشرة في قاعدة بيانات أخرى

---

## 📁 الملفات المُصدَّرة

بعد التصدير، ستجد في مجلد `exports/`:

```
exports/
├── users.json
├── users.sql
├── waqf_lands.json
├── waqf_lands.sql
├── ... (52 ملف - جدول × 2 صيغة)
├── full_export_2025-12-18.sql  ← كل البيانات في ملف واحد
└── export_report_2025-12-18.txt ← تقرير مفصل
```

---

## 🔧 الاستخدام المتقدم

### استيراد البيانات لقاعدة بيانات أخرى

```bash
# استيراد من ملف SQL كامل
psql "postgresql://user:password@host:5432/database" < exports/full_export_2025-12-18.sql

# استيراد جدول واحد فقط
psql "postgresql://user:password@host:5432/database" < exports/users.sql
```

### قراءة ملفات JSON برمجياً

```javascript
import fs from 'fs';

const users = JSON.parse(fs.readFileSync('exports/users.json'));
console.log(`Found ${users.length} users`);

// معالجة البيانات
users.forEach(user => {
  console.log(user.email);
});
```

---

## ⚠️ ملاحظات أمنية

- 🔒 **لا تشارك ملفات التصدير** - تحتوي على بيانات حساسة
- 🔒 **لا ترفعها على Git** - محمية تلقائياً في .gitignore
- 🔒 **احفظها في مكان آمن** - استخدم تشفير عند النقل
- 🔒 **احذفها بعد الاستخدام** - لا تتركها على الجهاز

---

## 🆘 حل المشاكل

### "connection refused"
- تحقق من كلمة المرور
- تأكد من اتصال الإنترنت

### "relation does not exist"
- الجدول غير موجود في قاعدة البيانات
- حدّث قائمة الجداول في `export-all-tables.js`

### "out of memory"
- قاعدة البيانات كبيرة جداً
- صدّر الجداول واحداً تلو الآخر

---

## 📞 روابط مهمة

- **لوحة Supabase:** https://supabase.com/dashboard/project/lyeryfsrhrxuepuqepgi
- **إعدادات قاعدة البيانات:** https://supabase.com/dashboard/project/lyeryfsrhrxuepuqepgi/settings/database

---

**جاهز؟ ابدأ الآن!**

```bash
npm install
npm run preview
npm run export
```
