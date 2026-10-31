/* ==========================================================================
   OREC CLINIC — Service detail renderer
   ========================================================================== */

(function () {
  "use strict";

  var root = document.getElementById("service-root");
  var slug = document.body.getAttribute("data-service");
  var service = slug && window.OREC && OREC.services ? OREC.services[slug] : null;

  if (!root || !service) return;

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
      calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
      plus: '<path d="M12 5v14M5 12h14"/>'
    };
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (paths[name] || paths.arrow) + "</svg>";
  }

  var category = OREC.categories.filter(function (item) { return item.slug === service.category; })[0];
  var categoryName = category ? category.name : "الخدمات";
  var categoryPage = category ? category.page : "services.html";
  var art = "images/art/" + (service.art || "clinic") + ".svg";

  /* ---------- Head ---------- */

  document.title = service.name + " — عيادة أوريك";
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", service.metaDescription || service.lead);
  var ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", service.name + " — عيادة أوريك");
  var ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", service.metaDescription || service.lead);

  /* ---------- Blocks ---------- */

  function blockHead(block, index) {
    return (
      '<div class="block__head">' +
        '<span class="block__no">' + String(index + 1).padStart(2, "0") + "</span>" +
        (block.kicker ? '<span class="kicker">' + esc(block.kicker) + "</span>" : "") +
        "<h2>" + esc(block.title) + "</h2>" +
        (block.intro ? "<p>" + esc(block.intro) + "</p>" : "") +
      "</div>"
    );
  }

  function renderBlock(block, index) {
    var id = "block-" + (index + 1);
    var head = blockHead(block, index);
    var content = "";

    if (block.type === "cards") {
      content =
        '<div class="cards' + (block.items.length % 3 === 0 ? " cards--three" : "") + '">' +
          block.items.map(function (item, itemIndex) {
            return (
              '<article class="card">' +
                '<span class="card__no">' + String(itemIndex + 1).padStart(2, "0") + "</span>" +
                "<h3>" + esc(item.title) + "</h3>" +
                "<p>" + esc(item.text) + "</p>" +
              "</article>"
            );
          }).join("") +
        "</div>";
    } else if (block.type === "steps") {
      content =
        '<div class="timeline">' +
          block.items.map(function (item, itemIndex) {
            return (
              '<div class="timeline__item">' +
                '<span class="timeline__no">' + String(itemIndex + 1).padStart(2, "0") + "</span>" +
                "<div><h3>" + esc(item.title) + "</h3><p>" + esc(item.text) + "</p></div>" +
              "</div>"
            );
          }).join("") +
        "</div>";
    } else if (block.type === "notice") {
      var tone = block.tone === "blue" ? " notice--blue" : block.tone === "dark" ? " notice--dark" : "";
      content =
        '<div class="notice' + tone + '">' +
          "<h3>" + esc(block.title) + "</h3>" +
          (block.paragraphs || []).map(function (paragraph) { return "<p>" + esc(paragraph) + "</p>"; }).join("") +
          (block.items && block.items.length ? "<ul>" + block.items.map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("") + "</ul>" : "") +
          (block.note ? '<p class="notice__note">' + esc(block.note) + "</p>" : "") +
        "</div>";
    } else if (block.type === "checklist") {
      content =
        '<ul class="checklist">' +
          block.items.map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("") +
        "</ul>";
    } else {
      content =
        '<div class="block__text">' +
          (block.paragraphs || []).map(function (paragraph) { return "<p>" + esc(paragraph) + "</p>"; }).join("") +
          (block.list && block.list.length ? "<ul>" + block.list.map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("") + "</ul>" : "") +
        "</div>";
    }

    return '<section class="block" id="' + id + '">' + head + content + "</section>";
  }

  var blocks = service.blocks || [];

  /* ---------- TOC ---------- */

  var toc =
    '<aside class="toc" aria-label="محتويات الصفحة">' +
      '<p class="toc__title">في هذه الصفحة</p>' +
      '<nav class="toc__list">' +
        '<a class="toc__link is-active" href="#overview">نظرة عامة</a>' +
        blocks.map(function (block, index) {
          return '<a class="toc__link" href="#block-' + (index + 1) + '">' + esc(block.title) + "</a>";
        }).join("") +
      "</nav>" +
      '<a class="link-arrow toc__back" href="' + categoryPage + '">العودة إلى ' + esc(categoryName) + " " + icon("arrow") + "</a>" +
    "</aside>";

  /* ---------- Hero ---------- */

  var facts =
    '<div class="facts">' +
      (service.facts || []).map(function (fact) {
        return '<div class="fact"><span>' + esc(fact.label) + "</span><strong>" + esc(fact.value) + "</strong></div>";
      }).join("") +
    "</div>";

  var hero =
    '<section class="service-hero">' +
      '<div class="container">' +
        '<nav class="crumbs" aria-label="مسار التصفح">' +
          '<a href="index.html">الرئيسية</a><span class="sep">/</span>' +
          '<a href="services.html">الخدمات</a><span class="sep">/</span>' +
          '<a href="' + categoryPage + '">' + esc(categoryName) + "</a><span class=\"sep\">/</span>" +
          '<span aria-current="page">' + esc(service.name) + "</span>" +
        "</nav>" +
        '<div class="service-hero__grid">' +
          '<div class="service-hero__copy">' +
            '<span class="eyebrow">' + esc(service.en) + "</span>" +
            "<h1>" + esc(service.name) + "</h1>" +
            '<p class="lead">' + esc(service.lead) + "</p>" +
            facts +
          "</div>" +
          '<div class="service-hero__art reveal-img">' +
            '<img src="' + art + '" alt="" width="720" height="900">' +
            '<div class="service-hero__badge"><span class="num">' + esc(service.no) + "</span>" + (category ? esc(category.short) : "OREC") + "</div>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</section>";

  /* ---------- Article ---------- */

  var article =
    '<section class="section--flush-top">' +
      '<div class="container">' +
        '<div class="service-layout">' +
          toc +
          '<article class="prose" id="overview">' +
            '<p class="lead">' + esc(service.tagline) + "</p>" +
            (service.intro || []).map(function (paragraph) { return "<p>" + esc(paragraph) + "</p>"; }).join("") +
            blocks.map(renderBlock).join("") +
            '<p class="disclaimer">هذه المعلومات تعريفية ولا تُعد تشخيصاً أو خطة علاج. يختلف القرار الطبي من حالة إلى أخرى، ويُحدد بعد الفحص والاستشارة مع الطبيب المختص.</p>' +
          "</article>" +
        "</div>" +
      "</div>" +
    "</section>";

  /* ---------- Related ---------- */

  function resolveRelated(relatedSlug) {
    if (OREC.services[relatedSlug]) {
      var item = OREC.services[relatedSlug];
      var cat = OREC.categories.filter(function (categoryItem) { return categoryItem.slug === item.category; })[0];
      return {
        name: item.name,
        en: item.en,
        no: item.no,
        href: "service-" + item.slug + ".html",
        category: cat ? cat.short : ""
      };
    }
    if (OREC.groupedIndex && OREC.groupedIndex[relatedSlug]) {
      var grouped = OREC.groupedIndex[relatedSlug];
      var catPage = (OREC.categories.filter(function (categoryItem) { return categoryItem.slug === grouped.category; })[0] || {}).page || "services.html";
      return {
        name: grouped.name,
        en: grouped.en,
        no: "",
        href: catPage + "#" + grouped.anchor,
        category: ""
      };
    }
    return null;
  }

  var relatedItems = (service.related || []).map(resolveRelated).filter(Boolean);
  var related = "";
  if (relatedItems.length) {
    related =
      '<section class="section section--tight related">' +
        '<div class="container">' +
          '<div class="section-head">' +
            '<div class="section-head__title"><span class="eyebrow">RELATED CARE</span><h2>خدمات قد تهمك</h2></div>' +
            '<div class="section-head__aside"><p>استكشف الخدمات المرتبطة، أو تواصل معنا لاختيار المسار المناسب لحالتك.</p></div>' +
          "</div>" +
          '<div class="related__grid">' +
            relatedItems.map(function (item) {
              return (
                '<a class="related-card" href="' + item.href + '">' +
                  (item.no ? '<span class="num">' + esc(item.no) + "</span>" : '<span class="num">OREC</span>') +
                  "<h3>" + esc(item.name) + "</h3>" +
                  '<span class="en-label">' + esc(item.en) + "</span>" +
                  '<span class="link-arrow">اكتشف المزيد ' + icon("arrow") + "</span>" +
                "</a>"
              );
            }).join("") +
          "</div>" +
        "</div>" +
      "</section>";
  }

  /* ---------- CTA ---------- */

  var cta =
    '<section class="section section--tight">' +
      '<div class="container">' +
        '<div class="services-note">' +
          '<div><span class="eyebrow">NEXT STEP</span><h3>هل لديك سؤال عن ' + esc(service.name) + "؟</h3><p>فريق أوريك يجيب على استفساراتك ويوضح لك الخيارات المتاحة قبل اتخاذ أي قرار.</p></div>" +
          '<div><a class="btn" href="contact.html">تواصل مع العيادة <span class="btn__arrow">' + icon("arrow") + "</span></a></div>" +
        "</div>" +
      "</div>" +
    "</section>";

  root.innerHTML = hero + article + related + cta;

  /* ---------- TOC scrollspy ---------- */

  var tocLinks = Array.prototype.slice.call(root.querySelectorAll(".toc__link"));
  var sections = tocLinks.map(function (link) {
    var id = link.getAttribute("href").slice(1);
    return document.getElementById(id);
  }).filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        tocLinks.forEach(function (link) {
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });

    sections.forEach(function (section) { spy.observe(section); });
  }
})();
