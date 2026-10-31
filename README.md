# عيادة أوريك — الموقع التعريفي

موقع تعريفي عربي (RTL) متعدد الصفحات لعيادة أوريك في إسطنبول. بُني الموقع كموقع ثابت بدون خطوة بناء أو قاعدة بيانات، اعتماداً على HTML وCSS وJavaScript فقط.

## التشغيل والمعاينة

افتح الملف التالي مباشرة في المتصفح:

```
public/index.html
```

جميع المسارات داخل الصفحات نسبية، لذلك يعمل الموقع من نظام الملفات دون خادم. ويمكن أيضاً تقديم مجلد `public/` عبر أي خادم ملفات ثابت، مثال:

```
python -m http.server 4173 --directory public
```

ثم افتح `http://localhost:4173/`.

> ملاحظة: لا يوجد `package.json` ولا `npm install` ولا `npm run build`. الموقع لا يعتمد على Next.js أو Tailwind أو أي حزمة بناء.

## البنية

```
public/
├─ index.html                     الصفحة الرئيسية
├─ about.html                     عن العيادة
├─ services.html                  فهرس الخدمات (33 خدمة)
├─ contact.html                   التواصل ونموذج استفسار أولي
├─ dental.html                    قسم الأسنان
├─ cosmetic-surgery.html          قسم الجراحات التجميلية
├─ hair-transplant.html           قسم زراعة الشعر
├─ bariatric-surgery.html         قسم جراحات السمنة
├─ service-*.html                 17 صفحة خدمة مستقلة
├─ assets/
│  ├─ css/                        نظام التصميم (fonts, base, components, pages, inner, responsive, typography)
│  └─ js/                         البيانات، التخطيط، وعرض الصفحات
└─ images/
   ├─ brand/                      الشعارات الرسمية (JPG)
   └─ art/                        لوحات SVG تجريدية قابلة للاستبدال
```

## الصفحات والمسارات

### الصفحات الأساسية

| الصفحة | الملف |
|---|---|
| الرئيسية | `index.html` |
| عن العيادة | `about.html` |
| جميع الخدمات | `services.html` |
| التواصل | `contact.html` |

### الأقسام

| القسم | الملف | الخدمات |
|---|---|---|
| تجميل ومعالجة الأسنان | `dental.html` | 4 خدمات مستقلة |
| الجراحات التجميلية | `cosmetic-surgery.html` | 8 خدمات مستقلة + 14 خدمة ضمن مجموعات |
| زراعة الشعر | `hair-transplant.html` | 3 خدمات مستقلة |
| جراحات السمنة | `bariatric-surgery.html` | 2 خدمات مستقلة + 2 ضمن مجموعات |

### الخدمات المستقلة (17)

`dental-implants`, `hollywood-smile`, `restorative-dentistry`, `teeth-whitening`, `facelift`, `rhinoplasty`, `lip-aesthetics`, `blepharoplasty`, `body-contouring`, `breast-surgery`, `gynecomastia`, `abdominoplasty`, `scalp-hair-transplantation`, `beard-mustache-transplantation`, `eyebrow-transplantation`, `gastric-sleeve`, `gastric-bypass`.

كل خدمة لها ملف بالشكل `service-<slug>.html`.

### الخدمات ضمن المجموعات (16)

- الوجه: `brow-lift`, `otoplasty`, `neck-lift`, `forehead-contouring`, `genioplasty`, `cheek-enhancement`
- الجسم: `brachioplasty`, `thigh-lift`
- المنطقة الحساسة: `bbl`, `labiaplasty`, `vaginal-fat-filler`, `vaginoplasty`, `penile-aesthetics`, `penile-lengthening`
- السمنة: `gastric-balloon`, `gastric-botox`

تظهر هذه الخدمات داخل صفحات الأقسام كقوائم قابلة للفتح، ولكل خدمة مرساة (anchor) مستقلة.

## فصل المحتوى عن العرض

- `assets/js/data.js`: بيانات الموقع والتواصل والأقسام وخدمات الأسنان.
- `assets/js/data-hair.js`: خدمات الشعر وخدمات السمنة المستقلة.
- `assets/js/data-cosmetic.js`: خدمات التجميل المستقلة.
- `assets/js/data-groups.js`: الخدمات المجمّعة وفهرس المجموعات.
- `assets/js/layout.js`: الهيدر والتنقل والقائمة الجانبية والفوتر.
- `assets/js/service-page.js`: عرض صفحة الخدمة.
- `assets/js/category-page.js`: عرض صفحة القسم.
- `assets/js/services-page.js`: عرض فهرس الخدمات.
- `assets/js/app.js`: سلوك الواجهة (الهيدر، القوائم، الأكورديون، النموذج).

لتعديل نص خدمة، عدّل ملف البيانات المناسب فقط. لتعديل التصميم، استخدم ملفات CSS.

## بيانات التواصل

قيم التواصل في `OREC.contact` داخل `assets/js/data.js` مضبوطة على `null` عمداً. تعرض الواجهة حالة "يُعلن قريباً" بدلاً من أرقام أو روابط غير مؤكدة.

عند اعتماد البيانات الرسمية، أضف:

```js
OREC.contact.phone = "+90...";
OREC.contact.phoneDisplay = "+90 ...";
OREC.contact.whatsapp = "905...";
OREC.contact.email = "info@...";
OREC.contact.address = "العنوان الكامل";
OREC.contact.maps = "https://...";
OREC.contact.hours = "ساعات العمل";
OREC.contact.social.instagram = "https://...";
```

ستتحدث روابط الهيدر والفوتر وصفحة التواصل تلقائياً بعد إضافة القيم، مع مراجعة القوالب التي تعرض حالة الانتظار.

## الهوية والأصول

- الشعار الرسمي: `images/brand/orec-logo-primary.jpg` و`orec-logo-secondary.jpg`.
- يُستخدم الشعار كما هو دون إعادة رسم أو تلوين أو تحويل إلى Base64.
- في الهيدر والفوتر والقائمة الجانبية يُعرض الشعار داخل مساحة مقصوصة مع خلفية كريمية، باستخدام `mix-blend-mode: multiply` في الهيدر.
- لوحات `images/art/*.svg` هي أعمال تجريدية أصلية، وليست صور عيادة أو مرضى. يمكن استبدالها بصور حقيقية عند توفرها مع الحفاظ على أبعاد متقاربة.

## الخطوط

- Markazi Text (300/500/700): النصوص والعناوين العربية.
- Chapaza (500/700): العناوين الإنجليزية واللمسات اللاتينية.
- Gilroy Light/Bold (300/700): النصوص الإنجليزية والقائمة والأزرار.

تُحمّل عبر `@font-face` من ملفات WOFF2 نفسها المستخدمة في المرجع، مع بدائل نظامية في CSS. قبل النشر يُفضّل نقلها إلى استضافة المشروع بعد تأكيد الترخيص.

## SEO وإمكانية الوصول

- كل صفحة لها `title` و`description` وOpen Graph خاص بها.
- بنية HTML دلالية: `header`, `nav`, `main`, `section`, `article`, `footer`.
- روابط تخطي، تسميات ARIA، تركيز مرئي، واحترام `prefers-reduced-motion`.
- الصفحات الديناميكية تحتوي محتوى احتياطياً داخل `<noscript>`.
- لا توجد صور مرضى أو نتائج قبل/بعد أو تقييمات مختلقة.

## الاختبار

- تم فحص جميع الصفحات الـ25 في المتصفح من نظام الملفات.
- لا أخطاء JavaScript في وحدة التحكم.
- جميع الروابط الداخلية والأصول المشار إليها موجودة.
- عدد الخدمات المعروض: 33 (17 مستقلة + 16 ضمن مجموعات).
- النموذج لا يرسل بيانات؛ يعرض رسالة توضيحية فقط.
- Lighthouse (على `file://`): إمكانية الوصول 1.0، أفضل الممارسات 1.0، SEO 0.83. خفض SEO سببه تعذر قراءة `robots.txt` عبر بروتوكول الملفات، وليس خطأً في الملف نفسه؛ يلزم التحقق عبر HTTP بعد النشر.
- تم التحقق من تحميل Markazi Text وChapaza وGilroy Light، ومن تطبيق المقاسات والأوزان على الصفحات الـ25 دون تجاوز أفقي أو أخطاء كونسول.

## ملاحظات قبل النشر

- اعتماد بيانات التواصل وحسابات التواصل الاجتماعي.
- مراجعة الادعاءات الطبية المذكورة في `review-notes.md` من قبل الطبيب المسؤول.
- استبدال اللوحات التجريدية بصور رسمية عند توفرها.
- إضافة `sitemap.xml` وبيانات النطاق بعد اعتماد الدومين.
- ربط النموذج بقناة الاستقبال الرسمية أو تعطيله نهائياً إن لم يكن مطلوباً.
