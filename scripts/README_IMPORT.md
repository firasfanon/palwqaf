# 🚀 دليل الاستيراد السريع

## الخطوات الأساسية

### 1️⃣ احصل على المفتاح
من لوحة تحكم Supabase المصدر:
```
https://supabase.com/dashboard/project/lyeryfsrhrxuepuqepgi/settings/api
```
انسخ: **Project API Key** (anon/public)

---

### 2️⃣ عدّل السكريبت
افتح `scripts/import-from-source.js` السطر 6:
```javascript
const SOURCE_SUPABASE_ANON_KEY = 'ضع_المفتاح_هنا';
```

---

### 3️⃣ اختبر الاتصال
```bash
node scripts/import-from-source.js test
```

---

### 4️⃣ ابدأ الاستيراد
```bash
# استيراد جميع الجداول
node scripts/import-from-source.js

# أو استيراد جداول محددة
node scripts/import-from-source.js tables users waqf_lands cases
```

---

## 📊 الجداول التي سيتم استيرادها (30 جدول)

✅ users, waqf_lands, cases, documents, appointments
✅ mosques, imams, friday_sermons, news, announcements
✅ activities, projects, services, social_services
✅ media_gallery, organizational_structure, former_ministers
✅ notifications, reports, user_permissions
✅ governorates, service_categories, service_details, service_settings
✅ case_timeline, contact_messages

---

## ⚡ ميزات

- ✅ استيراد تلقائي بدون تكرار (upsert)
- ✅ معالجة دفعية (100 صف/مرة)
- ✅ تقرير مفصل بعد الانتهاء
- ✅ يستمر حتى لو فشل جدول واحد

---

## 🔧 حل المشاكل

**المفتاح غير صحيح؟**
→ تأكد من نسخ `anon key` وليس `service_role_key`

**جدول غير موجود؟**
→ سيتم تخطيه تلقائياً

**خطأ في الصلاحيات؟**
→ جرّب استخدام `service_role_key` بدلاً من `anon_key`

---

## 📖 للمزيد

راجع `scripts/IMPORT_GUIDE.md` للدليل الشامل
