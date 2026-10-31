/* ==========================================================================
   OREC CLINIC — Services index renderer
   ========================================================================== */

(function () {
  "use strict";

  var root = document.getElementById("services-root");
  if (!root || !window.OREC) return;

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
      calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'
    };
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (paths[name] || paths.arrow) + "</svg>";
  }

  var allStandalone = Object.keys(OREC.services).map(function (key) { return OREC.services[key]; });
  var allGrouped = Object.keys(OREC.groupedIndex || {}).map(function (key) { return OREC.groupedIndex[key]; });
  var total = allStandalone.length + allGrouped.length;

  /* ---------- Hero ---------- */

  var hero =
    '<section class="page-hero">' +
      '<div class="container">' +
        '<nav class="crumbs" aria-label="مسار التصفح"><a href="index.html">الرئيسية</a><span class="sep">/</span><span aria-current="page">الخدمات</span></nav>' +
        '<div class="page-hero__grid">' +
          '<div>' +
            '<span class="eyebrow">ALL SERVICES</span>' +
            "<h1>خدماتنا</h1>" +
            '<p class="lead">أربعة تخصصات، و' + total + ' خدمة تُعرض بوضوح: الخدمات الأساسية لها صفحات مستقلة، والخدمات المرتبطة تُعرض داخل صفحات الأقسام. ابدأ من التخصص الذي يهمك، أو تصفح القائمة كاملة.</p>' +
            '<div class="page-hero__meta">' +
              '<span><span class="num">' + String(total).padStart(2, "0") + "</span> خدمة</span>" +
              '<span><span class="num">04</span> تخصصات</span>' +
              '<span><span class="num">' + String(allStandalone.length).padStart(2, "0") + "</span> صفحة تفصيلية</span>" +
            "</div>" +
          "</div>" +
          '<div class="page-hero__art reveal-img"><img src="images/art/clinic.svg" alt="" width="720" height="900"></div>' +
        "</div>" +
      "</div>" +
    "</section>";

  /* ---------- Rows ---------- */

  function standaloneRow(service) {
    return (
      '<a class="service-row" href="service-' + service.slug + '.html">' +
        '<span class="service-row__num">' + esc(service.no) + "</span>" +
        "<div><h3>" + esc(service.name) + '<span class="en-label">' + esc(service.en) + "</span></h3></div>" +
        "<p>" + esc(service.tagline) + "</p>" +
        '<span class="service-row__arrow">' + icon("arrow") + "</span>" +
      "</a>"
    );
  }

  function groupRow(key) {
    var group = OREC.groups[key];
    var names = group.services.map(function (service) { return service.name; }).join(" · ");
    var category = OREC.categories.filter(function (item) { return item.slug === OREC.groupCategory[key]; })[0];
    return (
      '<a class="service-row" href="' + (category ? category.page : "services.html") + '#group-' + key + '">' +
        '<span class="service-row__num">—</span>' +
        "<div><h3>" + esc(group.title) + '<span class="en-label">' + esc(group.en) + "</span></h3>" +
          '<span class="service-row__count">' + group.services.length + " خدمات ضمن مجموعة</span>" +
        "</div>" +
        "<p>" + esc(names) + "</p>" +
        '<span class="service-row__arrow">' + icon("arrow") + "</span>" +
      "</a>"
    );
  }

  /* ---------- Sections ---------- */

  var sections = OREC.categories.map(function (category, index) {
    var standalone = allStandalone
      .filter(function (service) { return service.category === category.slug; })
      .sort(function (a, b) { return Number(a.no) - Number(b.no); });
    var groups = Object.keys(OREC.groups).filter(function (key) {
      return OREC.groupCategory[key] === category.slug;
    });
    var count = standalone.length + groups.reduce(function (sum, key) { return sum + OREC.groups[key].services.length; }, 0);

    return (
      '<section class="section' + (index % 2 === 1 ? " section--ivory" : "") + '" id="cat-' + category.slug + '">' +
        '<div class="container">' +
          '<div class="cat-section__head">' +
            '<div><span class="eyebrow">' + esc(category.no) + " / " + esc(category.en.toUpperCase()) + "</span><h2>" + esc(category.name) + "</h2><span class=\"en-label\">" + esc(category.tagline) + "</span></div>" +
            '<div><p class="lead">' + esc(category.summary) + "</p>" +
              '<a class="link-arrow" href="' + category.page + '">صفحة القسم كاملة ' + icon("arrow") + "</a>" +
              '<p class="small muted" style="margin-top:14px">' + count + " خدمة في هذا التخصص</p>" +
            "</div>" +
          "</div>" +
          '<div class="services-index">' +
            standalone.map(standaloneRow).join("") +
            groups.map(groupRow).join("") +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }).join("");

  /* ---------- Note + CTA ---------- */

  var note =
    '<section class="section section--tight section--flush-top">' +
      '<div class="container">' +
        '<div class="services-note">' +
          '<div><span class="eyebrow">HOW TO READ</span><h3>صفحة مستقلة أو مجموعة؟</h3><p>الخدمات الأساسية لها صفحات تفصيلية تشمل التقنيات والحالات المرشحة وخطوات العلاج. الخدمات المرتبطة تُعرض داخل صفحة القسم ضمن قوائم قابلة للفتح، لأنها تُخطط غالباً مع الإجراء الأساسي.</p></div>' +
          '<div><a class="btn" href="contact.html">لم تجد ما تبحث عنه؟ <span class="btn__arrow">' + icon("arrow") + "</span></a></div>" +
        "</div>" +
      "</div>" +
    "</section>";

  root.innerHTML = hero + sections + note;

  document.title = "الخدمات — عيادة أوريك";
})();
