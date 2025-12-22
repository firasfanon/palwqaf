# نظام التصميم المحدث - PalWaqf AI

## نظرة عامة

تم تحديث نظام التصميم بألوان إسلامية أكثر هدوءاً واحترافية:
- **الأخضر الإسلامي الداكن**: `#1a472a` (بدلاً من الأخضر الفاتح)
- **الذهبي الكلاسيكي**: `#d4af37` (بدلاً من الأصفر الفاقع)

## الملفات المحدثة

### 1. `src/design-system.css`
ملف جديد يحتوي على نظام التصميم الكامل مع:
- متغيرات CSS للألوان والظلال والحركات
- مكونات جاهزة (أزرار، بطاقات، إدخالات)
- تأثيرات إسلامية محدثة
- نظام الوضع الداكن

### 2. `tailwind.config.js`
تم تحديث لوحة الألوان:
```js
primary: '#1a472a'   // أخضر داكن
secondary: '#d4af37' // ذهبي
```

### 3. `src/index.css`
تم دمج الألوان الجديدة في جميع الفصول الموجودة:
- `.islamic-gradient`
- `.golden-gradient`
- `.hover-lift`
- وغيرها...

## كيفية الاستخدام

### الألوان الأساسية

```css
/* باستخدام متغيرات CSS */
.my-element {
  color: var(--color-primary);
  background: var(--gradient-primary);
}

/* باستخدام Tailwind */
<div class="bg-primary-600 text-white">
  محتوى
</div>
```

### الأزرار

```jsx
{/* الطريقة القديمة (ما زالت تعمل) */}
<button className="btn-primary">
  زر رئيسي
</button>

{/* الطريقة الجديدة */}
<button className="btn-islamic">
  زر إسلامي
</button>

<button className="btn-golden">
  زر ذهبي
</button>
```

### البطاقات

```jsx
{/* الطريقة القديمة (ما زالت تعمل) */}
<div className="card-islamic">
  محتوى البطاقة
</div>

{/* الطريقة الجديدة */}
<div className="card-islamic-new">
  محتوى البطاقة بالتصميم الجديد
</div>
```

### التدرجات

```jsx
<div className="islamic-gradient">
  خلفية بتدرج إسلامي أخضر داكن
</div>

<div className="golden-gradient">
  خلفية بتدرج ذهبي
</div>
```

## الفصول الجديدة

### أزرار جديدة
- `.btn-islamic` - زر بتدرج أخضر داكن
- `.btn-golden` - زر بتدرج ذهبي

### بطاقات جديدة
- `.card-new` - بطاقة بسيطة
- `.card-islamic-new` - بطاقة بحدود إسلامية
- `.card-golden-new` - بطاقة بحدود ذهبية

### تأثيرات جديدة
- `.hover-lift-new` - تأثير رفع محدث
- `.animate-glow-new` - توهج محدث
- `.shadow-islamic-new` - ظل إسلامي محدث
- `.shadow-golden-new` - ظل ذهبي محدث

### أنماط نصية جديدة
- `.text-primary-new` - نص بلون أخضر داكن
- `.text-secondary-new` - نص بلون ذهبي

## التوافق

جميع الفصول القديمة ما زالت تعمل بشكل طبيعي مع الألوان الجديدة. لا حاجة لتغيير الكود الموجود.

## الخطوات التالية

لتطبيق التصميم الجديد بالكامل:

1. استبدل الفصول القديمة بالجديدة تدريجياً
2. استخدم المتغيرات CSS للألوان المخصصة
3. راجع جميع الصفحات للتأكد من التناسق

## أمثلة عملية

### مثال 1: بطاقة خدمة
```jsx
<div className="service-card-new">
  <div className="icon-primary">
    <FileContract />
  </div>
  <h3 className="text-xl font-bold text-white">توثيق الأوقاف</h3>
  <p className="text-white/90">وصف الخدمة</p>
</div>
```

### مثال 2: نموذج إدخال
```jsx
<input
  type="text"
  className="input-new"
  placeholder="أدخل النص..."
/>
```

### مثال 3: بطاقة إحصائية
```jsx
<div className="stats-card-new">
  <div className="text-3xl font-bold text-white">1,234</div>
  <div className="text-white/80">إجمالي الأوقاف</div>
</div>
```

## الدعم

للمزيد من المعلومات، راجع:
- `src/design-system.css` - جميع المتغيرات والفصول
- `src/index.css` - الفصول الأساسية
- `tailwind.config.js` - إعدادات Tailwind
