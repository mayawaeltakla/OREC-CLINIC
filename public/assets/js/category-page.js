/* ==========================================================================
   OREC CLINIC — Category page renderer
   ========================================================================== */

(function () {
  "use strict";

  var root = document.getElementById("category-root");
  var categorySlug = document.body.getAttribute("data-category");
  var category = categorySlug && window.OREC ? OREC.categories.filter(function (item) { return item.slug === categorySlug; })[0] : null;

  if (!root || !category) return;

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function icon(name) {
    var paths = {
      arrow: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
      plus: '<path d="M12 5v14M5 12h14"/>',
      shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
      calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'
    };
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (paths[name] || paths.arrow) + "</svg>";
  }

  var standalone = Object.keys(OREC.services)
    .map(function (key) { return OREC.services[key]; })
    .filter(function (service) { return service.category === categorySlug; })
    .sort(function (a, b) { return Number(a.no) - Number(b.no); });

  var groupKeys = Object.keys(OREC.groups).filter(function (key) {
    return OREC.groupCategory[key] === categorySlug;
  });

  var groupServices = groupKeys.reduce(function (all, key) {
    return all.concat(OREC.groups[key].services);
  }, []);

  var total = standalone.length + groupServices.length;
  var art = "images/art/" + (category.art || "clinic") + ".svg";

  /* ---------- Head ---------- */

  document.title = category.name + " — عيادة أوريك";
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", category.intro);
  var ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", category.name + " — عيادة أوريك");
  var ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", category.intro);

  /* ---------- Hero ---------- */

  var hero =
    '<section class="cat-hero">' +
      '<div class="container">' +
        '<nav class="crumbs" aria-label="مسار التصفح">' +
          '<a href="index.html">الرئيسية</a><span class="sep">/</span>' +
          '<a href="services.html">الخدمات</a><span class="sep">/</span>' +
          '<span aria-current="page">' + esc(category.name) + "</span>" +
        "</nav>" +
        '<div class="cat-hero__grid">' +
          '<div>' +
            '<span class="eyebrow eyebrow--light">' + esc(category.en) + "</span>" +
            "<h1>" + esc(category.name) + "</h1>" +
            '<p class="lead">' + esc(category.intro) + "</p>" +
            '<div class="cat-hero__meta">' +
              '<span><span class="num">' + String(total).padStart(2, "0") + "</span> خدمة ضمن القسم</span>" +
              '<span>' + esc(category.tagline) + "</span>" +
              '<span>إسطنبول، تركيا</span>' +
            "</div>" +
          "</div>" +
          '<div class="cat-hero__art reveal-img">' +
            '<img src="' + art + '" alt="" width="720" height="900">' +
            '<div class="cat-hero__stamp"><span class="num">' + esc(category.no) + "</span><span>" + esc(category.short) + " · OREC CLINIC</span></div>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</section>";

  /* ---------- Sticky in-page nav ---------- */

  var navLinks = ['<a href="#overview">نظرة عامة</a>', '<a href="#services">الخدمات</a>'];
  groupKeys.forEach(function (key) {
    navLinks.push('<a href="#group-' + key + '">' + esc(OREC.groups[key].title) + "</a>");
  });
  navLinks.push('<a href="#next">الخطوة التالية</a>');

  var catNav =
    '<nav class="cat-nav" aria-label="أقسام الصفحة"><div class="container"><div class="cat-nav__inner">' +
      navLinks.join("") +
    "</div></div></nav>";

  /* ---------- Overview ---------- */

  var overview =
    '<section class="cat-section" id="overview">' +
      '<div class="container">' +
        '<div class="cat-section__head">' +
          '<div><span class="eyebrow">OVERVIEW</span><h2>منهجية القسم</h2><span class="en-label">' + esc(category.en) + "</span></div>" +
          '<div><p class="lead">' + esc(category.summary) + "</p></div>" +
        "</div>" +
        '<div class="split split--wide">' +
          '<div class="prose"><p>' + esc(category.intro) + "</p>" +
            "<p>يبدأ كل مسار في أوريك بالاستماع إلى المريض ثم الفحص والتشخيص، ولا يُقترح أي إجراء قبل التأكد من ملاءمته. نناقش البدائل والحدود والمخاطر بوضوح، ونضع خطة متابعة تناسب الحالة.</p>" +
            "<p>هذه الصفحة تجمع الخدمات الأساسية التي لها صفحات مستقلة، والخدمات المرتبطة التي تُعرض ضمن مجموعات قابلة للفتح. يمكنك الانتقال مباشرة إلى الخدمة التي تهمك، أو التواصل معنا لاختيار المسار الأنسب.</p>" +
          "</div>" +
          '<div class="quote-block"><p>الرعاية الجيدة لا تبدأ بالإجراء، بل بالسؤال الصحيح: ما الذي يحتاجه هذا الشخص فعلاً؟</p><cite>فلسفة عيادة أوريك</cite></div>' +
        "</div>" +
      "</div>" +
    "</section>";

  /* ---------- Featured services ---------- */

  function featureCard(service) {
    return (
      '<a class="svc-feature" href="service-' + service.slug + '.html">' +
        '<div class="svc-feature__media">' +
          '<img src="images/art/' + (service.art || category.art) + '.svg" alt="" width="720" height="520" loading="lazy">' +
          '<span class="svc-feature__no">' + esc(service.no) + "</span>" +
        "</div>" +
        '<div class="svc-feature__body">' +
          "<h3>" + esc(service.name) + "</h3>" +
          '<span class="en-label">' + esc(service.en) + "</span>" +
          "<p>" + esc(service.tagline) + "</p>" +
          '<span class="link-arrow">تفاصيل الخدمة ' + icon("arrow") + "</span>" +
        "</div>" +
      "</a>"
    );
  }

  var featured =
    '<section class="cat-section cat-section--alt" id="services">' +
      '<div class="container">' +
        '<div class="cat-section__head">' +
          '<div><span class="eyebrow">CORE SERVICES</span><h2>الخدمات الأساسية</h2><span class="en-label">Signature Procedures</span></div>' +
          '<div><p class="lead">' + (standalone.length ? "لكل خدمة من هذه الخدمات صفحة مستقلة تشرح التقنيات والحالات المرشحة وخطوات العلاج والتعافي." : "تُعرض الخدمات ضمن مجموعات القسم أدناه.") + "</p></div>" +
        "</div>" +
        (standalone.length
          ? '<div class="svc-feature-grid">' + standalone.map(featureCard).join("") + "</div>"
          : '<div class="services-note"><div><h3>الخدمات ضمن مجموعات</h3><p>انتقل إلى مجموعة الخدمات أدناه لقراءة التفاصيل.</p></div><div><a class="btn btn--ghost" href="#group-' + (groupKeys[0] || "") + '">استعرض المجموعات <span class="btn__arrow">' + icon("arrow") + "</span></a></div></div>") +
      "</div>" +
    "</section>";

  /* ---------- Grouped services ---------- */

  function groupSection(key, index) {
    var group = OREC.groups[key];
    var alt = index % 2 === 0 ? " cat-section--alt" : "";
    var items = group.services.map(function (service) {
      return (
        '<details class="acc" id="' + service.slug + '">' +
          '<summary class="acc__summary">' +
            '<span class="num">' + esc(service.no) + "</span>" +
            "<div><h3>" + esc(service.name) + "</h3><span class=\"en-label\">" + esc(service.en) + "</span></div>" +
            '<span class="acc__plus">' + icon("plus") + "</span>" +
          "</summary>" +
          '<div class="acc__body">' +
            "<p>" + esc(service.lead) + "</p>" +
            (service.paragraphs || []).map(function (paragraph) { return "<p>" + esc(paragraph) + "</p>"; }).join("") +
            (service.points && service.points.length ? "<ul>" + service.points.map(function (point) { return "<li>" + esc(point) + "</li>"; }).join("") + "</ul>" : "") +
            (service.note ? '<p><strong>ملاحظة:</strong> ' + esc(service.note) + "</p>" : "") +
          "</div>" +
        "</details>"
      );
    }).join("");

    var privacy = key === "intimate"
      ? '<div class="intimate-note">' + icon("shield") + "<p>خصوصية المريض جزء أساسي من الرعاية. تُناقش تفاصيل هذه الإجراءات في استشارة خاصة، ولا تُعرض صور أو حالات شخصية على الموقع.</p></div>"
      : "";

    return (
      '<section class="cat-section' + alt + '" id="group-' + key + '">' +
        '<div class="container">' +
          '<div class="cat-section__head">' +
            '<div><span class="eyebrow">' + esc(key.toUpperCase()) + '</span><h2>' + esc(group.title) + '</h2><span class="en-label">' + esc(group.en) + "</span></div>" +
            '<div><p class="lead">' + esc(group.intro) + "</p></div>" +
          "</div>" +
          '<div class="group-block">' + items + "</div>" +
          privacy +
        "</div>" +
      "</section>"
    );
  }

  var groups = groupKeys.map(groupSection).join("");

  /* ---------- CTA ---------- */

  var cta =
    '<section class="cta-band" id="next">' +
      '<div class="container cta-band__grid">' +
        '<div class="cta-band__copy">' +
          '<span class="eyebrow">START HERE</span>' +
          '<h2>خطوتك الأولى تبدأ <span class="latin">باستشارة</span></h2>' +
          "<p>أخبرنا بما يشغلك، وسنساعدك على فهم الخيارات المتاحة قبل أي قرار. الاستشارة مساحة للأسئلة، لا للضغط.</p>" +
          '<div class="cta-band__actions">' +
            '<a class="btn btn--gold" href="contact.html">تواصل مع العيادة <span class="btn__arrow">' + icon("arrow") + "</span></a>" +
            '<a class="link-arrow link-arrow--light" href="services.html">جميع الخدمات ' + icon("arrow") + "</a>" +
          "</div>" +
        "</div>" +
        '<div class="cta-band__visual">' +
          '<div class="cta-band__art"><img src="' + art + '" alt="" width="640" height="720" loading="lazy"></div>' +
          '<div class="cta-band__seal"><span class="num">' + esc(category.no) + "</span>OREC<br>CARE</div>" +
        "</div>" +
      "</div>" +
    "</section>";

  root.innerHTML = hero + catNav + overview + featured + groups + cta;
})();
