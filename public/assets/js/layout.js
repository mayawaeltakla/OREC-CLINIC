/* ==========================================================================
   OREC CLINIC — Shared layout
   Builds the top bar, header, mega menu, mobile drawer and footer.
   ========================================================================== */

(function () {
  "use strict";

  var page = document.body.getAttribute("data-page") || "home";
  var contact = OREC.contact || {};

  /* ---------- Inline icon set ---------- */

  var ICONS = {
    arrow: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    arrowUp: '<path d="M7 17 17 7M8 7h9v9"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    whatsapp: '<path d="M20.5 11.6a8.4 8.4 0 0 1-12.3 7.5L3 21l1.9-5.1a8.4 8.4 0 1 1 15.6-4.3Z"/><path d="M8.4 7.7c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.2-.2.3 0 .6.4.7 1 1.3 1.7 1.7.3.2.5.1.6 0l.6-.6c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.4.8-.4.3-.9.5-1.4.5-1.2 0-2.9-.7-4.4-2.1-1.4-1.4-2.1-3.1-2.1-4.3 0-.5.2-1 .5-1.4Z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/>',
    facebook: '<path d="M14 22v-8h3l.5-3H14V9.2c0-.9.3-1.5 1.6-1.5H18V5.1A20 20 0 0 0 15.7 5C13.4 5 12 6.4 12 8.9V11H9v3h3v8"/>',
    tiktok: '<path d="M14 3v11.2a4.3 4.3 0 1 1-3.7-4.2"/><path d="M14 3c.4 2.5 2 4.1 4.5 4.4"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9 5 3-5 3V9Z"/>',
    x: '<path d="m4 4 16 16M20 4 4 20"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
    tooth: '<path d="M12 5.5c-1.6-1.6-4.6-2-6.2-.2C4.1 7.2 4.6 9.7 5 11.4c.5 2 .5 3.6 1 6 .3 1.5 1 3.6 2.2 3.6 1.4 0 1.3-2.6 1.7-4.4.2-1 .7-1.8 2.1-1.8s1.9.8 2.1 1.8c.4 1.8.3 4.4 1.7 4.4 1.2 0 1.9-2.1 2.2-3.6.5-2.4.5-4 1-6 .4-1.7.9-4.2-.8-6.1-1.6-1.8-4.6-1.4-6.2.2Z"/>',
    face: '<path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="M8.5 10h.01M15.5 10h.01M8.5 15c1 1 2.1 1.5 3.5 1.5s2.5-.5 3.5-1.5"/>',
    hair: '<path d="M5 20c0-7 2-12 7-12s7 5 7 12"/><path d="M8 20c0-5 1-9 4-9s4 4 4 9M3 20h18"/>',
    body: '<path d="M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM9 8h6l1 6-2 7M9 8 8 14l2 7M9 11h6"/>',
    scalpel: '<path d="m14 4 6 6-8.5 8.5a4 4 0 0 1-2.8 1.2H4v-4.7a4 4 0 0 1 1.2-2.8L14 4Z"/><path d="m12 6 6 6"/>',
    leaf: '<path d="M20 4c-8 0-14 4-14 10a6 6 0 0 0 6 6c6 0 8-8 8-16Z"/><path d="M4 21c2-5 5-8 10-11"/>'
  };

  function icon(name, className) {
    var body = ICONS[name] || ICONS.sparkle;
    return '<svg class="' + (className || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + "</svg>";
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function servicesByCategory(categorySlug) {
    return Object.keys(OREC.services)
      .map(function (key) { return OREC.services[key]; })
      .filter(function (service) { return service.category === categorySlug; })
      .sort(function (a, b) { return Number(a.no) - Number(b.no); });
  }

  function serviceHref(service) {
    return "service-" + service.slug + ".html";
  }

  /* ---------- Navigation state ---------- */

  var isServicesSection = page === "services" || page === "category" || page === "service";
  var isDental = page === "category" && document.body.getAttribute("data-category") === "dental";

  function navLink(href, label, active, extra) {
    return '<a class="nav__link" href="' + href + '"' + (active ? ' aria-current="page"' : "") + (extra || "") + ">" + label + "</a>";
  }

  /* ---------- Mega menu ---------- */

  function megaColumn(category, limit) {
    var list = servicesByCategory(category.slug);
    if (limit) list = list.slice(0, limit);
    return (
      '<div class="mega__col">' +
        '<div class="mega__title"><a href="' + category.page + '">' + esc(category.name) + '</a><span class="en-label">' + esc(category.en) + "</span></div>" +
        '<ul class="mega__list">' +
          list.map(function (service) {
            return '<li><a class="mega__link" href="' + serviceHref(service) + '">' + esc(service.name) + "</a></li>";
          }).join("") +
        "</ul>" +
        '<a class="mega__all" href="' + category.page + '">كل خدمات ' + esc(category.short) + " " + icon("arrow") + "</a>" +
      "</div>"
    );
  }

  var dental = OREC.categories[0];
  var cosmetic = OREC.categories[1];
  var hair = OREC.categories[2];
  var bariatric = OREC.categories[3];

  var mega =
    '<div class="mega" id="mega-services" aria-label="قائمة الخدمات" aria-hidden="true">' +
      '<div class="container"><div class="mega__inner">' +
        megaColumn(dental) +
        megaColumn(cosmetic, 6) +
        megaColumn(hair) +
        megaColumn(bariatric) +
        '<a class="mega__feature" href="dental.html">' +
          '<img src="images/art/dental.svg" alt="" width="640" height="800" loading="lazy">' +
          '<span class="eyebrow">SIGNATURE</span>' +
          "<h3>قسم الأسنان</h3>" +
          "<p>زراعة، ابتسامة هوليوود، ترميم وتبييض ضمن رؤية واحدة.</p>" +
        "</a>" +
      "</div></div>" +
    "</div>";

  /* ---------- Header ---------- */

  var header =
    '<div class="topbar">' +
      '<div class="container topbar__inner">' +
        '<div class="topbar__group topbar__group--left">' +
          "<span>إسطنبول، تركيا</span><span class=\"topbar__dot\"></span><span>منذ 2015</span>" +
        "</div>" +
        '<div class="topbar__group">' +
          '<span class="topbar__note">رعاية طبية بمعايير عالمية</span>' +
          '<span class="topbar__dot"></span>' +
          '<a href="contact.html">تواصل معنا</a>' +
          '<div class="topbar__lang"><span class="is-current">العربية</span><span class="is-muted" title="النسخة الإنجليزية قيد الإعداد">EN</span></div>' +
        "</div>" +
      "</div>" +
    "</div>" +
    '<header class="header" id="siteHeader">' +
      '<div class="container header__inner">' +
        '<a class="brand" href="index.html" aria-label="عيادة أوريك — الصفحة الرئيسية">' +
          '<img class="brand__img" src="images/brand/orec-logo-transparent.png" alt="شعار عيادة أوريك" width="208" height="74">' +
        "</a>" +
        '<nav class="nav" aria-label="التنقل الرئيسي">' +
          '<div class="nav__item">' + navLink("index.html", "الرئيسية", page === "home") + "</div>" +
          '<div class="nav__item">' + navLink("about.html", "عن العيادة", page === "about") + "</div>" +
          '<div class="nav__item nav__item--mega">' +
            '<button class="nav__link" type="button" aria-expanded="false" aria-controls="mega-services" aria-haspopup="true" id="megaToggle">الخدمات <span class="nav__caret" aria-hidden="true"></span></button>' +
            mega +
          "</div>" +
          '<div class="nav__item">' + navLink("dental.html", "الأسنان", isDental, "") + "</div>" +
          '<div class="nav__item">' + navLink("contact.html", "تواصل معنا", page === "contact") + "</div>" +
        "</nav>" +
        '<div class="header__actions">' +
          '<a class="header__phone" href="tel:' + esc(contact.phone) + '">' + icon("phone") + '<span dir="ltr">' + esc(contact.phoneDisplay) + "</span></a>" +
          '<a class="btn btn--sm" href="' + esc(contact.whatsapp) + '" target="_blank" rel="noopener noreferrer">احجز استشارة <span class="btn__arrow">' + icon("arrow") + "</span></a>" +
          '<button class="burger" type="button" aria-expanded="false" aria-controls="mobileDrawer" aria-label="فتح القائمة"><span></span></button>' +
        "</div>" +
      "</div>" +
    "</header>";

  /* ---------- Drawer ---------- */

  function drawerCategory(category, extra) {
    var list = servicesByCategory(category.slug);
    var groupLinks = "";
    if (extra === "cosmetic-surgery") {
      groupLinks =
        OREC.groups.face.services.map(function (s) {
          return '<a href="cosmetic-surgery.html#' + s.slug + '">' + esc(s.name) + '<span class="en-label">' + esc(s.en) + "</span></a>";
        }).join("") +
        OREC.groups.body.services.map(function (s) {
          return '<a href="cosmetic-surgery.html#' + s.slug + '">' + esc(s.name) + '<span class="en-label">' + esc(s.en) + "</span></a>";
        }).join("") +
        OREC.groups.intimate.services.map(function (s) {
          return '<a href="cosmetic-surgery.html#' + s.slug + '">' + esc(s.name) + '<span class="en-label">' + esc(s.en) + "</span></a>";
        }).join("");
    } else if (extra === "bariatric-surgery") {
      groupLinks = OREC.groups.bariatric.services.map(function (s) {
        return '<a href="bariatric-surgery.html#' + s.slug + '">' + esc(s.name) + '<span class="en-label">' + esc(s.en) + "</span></a>";
      }).join("");
    }

    return (
      '<div class="drawer__group">' +
        '<button type="button" aria-expanded="false">' + esc(category.name) + icon("plus") + "</button>" +
        '<div class="drawer__sub">' +
          '<a href="' + category.page + '"><strong>نظرة عامة على القسم</strong><span class="en-label">' + esc(category.en) + "</span></a>" +
          list.map(function (service) {
            return '<a href="' + serviceHref(service) + '">' + esc(service.name) + '<span class="en-label">' + esc(service.en) + "</span></a>";
          }).join("") +
          groupLinks +
        "</div>" +
      "</div>"
    );
  }

  var drawer =
    '<div class="drawer" id="mobileDrawer" role="dialog" aria-modal="true" aria-label="قائمة التنقل" aria-hidden="true">' +
      '<div class="drawer__top">' +
        '<a href="index.html" aria-label="عيادة أوريك — الصفحة الرئيسية"><img class="drawer__logo" src="images/brand/orec-logo-transparent.png" alt="شعار عيادة أوريك" width="160" height="58"></a>' +
        '<button class="drawer__close" type="button" aria-label="إغلاق القائمة">' + icon("close") + "</button>" +
      "</div>" +
      '<div class="drawer__body">' +
        '<a class="drawer__link" href="index.html">الرئيسية <span>Home</span></a>' +
        '<a class="drawer__link" href="about.html">عن العيادة <span>About</span></a>' +
        drawerCategory(dental) +
        drawerCategory(cosmetic, "cosmetic-surgery") +
        drawerCategory(hair) +
        drawerCategory(bariatric, "bariatric-surgery") +
        '<a class="drawer__link" href="services.html">جميع الخدمات <span>All Services</span></a>' +
        '<a class="drawer__link" href="contact.html">تواصل معنا <span>Contact</span></a>' +
        '<div class="drawer__cta">' +
          '<a class="btn btn--block" href="' + esc(contact.whatsapp) + '" target="_blank" rel="noopener noreferrer">اطلب استشارة <span class="btn__arrow">' + icon("arrow") + "</span></a>" +
          '<a class="btn btn--ghost btn--block" href="tel:' + esc(contact.phone) + '">' + icon("phone") + ' <span dir="ltr">' + esc(contact.phoneDisplay) + "</span></a>" +
        "</div>" +
        '<p class="drawer__meta">إسطنبول، تركيا<br>الموقع التعريفي الرسمي لعيادة أوريك.</p>' +
      "</div>" +
    "</div>";

  /* ---------- Footer ---------- */

  function footerContactRow(label, value, pending) {
    return "<div><dt>" + label + "</dt><dd>" + value + (pending ? ' <span class="footer__pending">— يُعلن قريباً</span>' : "") + "</dd></div>";
  }

  var addressValue = contact.address
    ? '<a href="' + esc(contact.maps) + '" target="_blank" rel="noopener noreferrer" title="' + esc(contact.address) + '">' + esc(contact.addressShort) + "</a>"
    : "إسطنبول، تركيا";
  var phoneValue = contact.phoneDisplay ? '<a href="tel:' + esc(contact.phone) + '" dir="ltr">' + esc(contact.phoneDisplay) + "</a>" : "الهاتف الرسمي";
  var emailValue = contact.email ? '<a href="mailto:' + esc(contact.email) + '">' + esc(contact.email) + "</a>" : "البريد الإلكتروني";

  var SOCIAL_LABELS = {
    facebook: "فيسبوك",
    instagram: "إنستغرام",
    youtube: "يوتيوب",
    tiktok: "تيك توك",
    x: "إكس",
    linkedin: "لينكدإن"
  };

  function socialLinks() {
    return Object.keys(SOCIAL_LABELS).map(function (key) {
      var url = contact.social && contact.social[key];
      if (!url) return "";
      return '<a class="social" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(SOCIAL_LABELS[key]) + '">' + icon(key) + "</a>";
    }).join("");
  }

  var socials = socialLinks();

  var footer =
    '<footer class="footer">' +
      '<div class="container footer__main">' +
        '<div class="footer__col footer__col--brand footer__brand">' +
          '<span class="footer__brand-plate"><img class="footer__logo" src="images/brand/orec-logo-transparent.png" alt="شعار عيادة أوريك" width="176" height="62" loading="lazy"></span>' +
          "<p>عيادة أوريك — عائلتك الطبية في رحلة استعادة الثقة. رعاية تجمع بين دقة الطب ودفء التجربة الإنسانية، منذ 2015.</p>" +
          '<div class="footer__social" aria-label="حسابات التواصل الرسمية">' + socials + "</div>" +
        "</div>" +
        '<div class="footer__col">' +
          '<h2 class="footer__title">استكشف</h2>' +
          '<ul class="footer__list">' +
            '<li><a href="index.html">الرئيسية</a></li>' +
            '<li><a href="about.html">عن العيادة</a></li>' +
            '<li><a href="services.html">جميع الخدمات</a></li>' +
            '<li><a href="contact.html">تواصل معنا</a></li>' +
          "</ul>" +
        "</div>" +
        '<div class="footer__col">' +
          '<h2 class="footer__title">التخصصات</h2>' +
          '<ul class="footer__list">' +
            OREC.categories.map(function (category) {
              return '<li><a href="' + category.page + '">' + esc(category.name) + "</a></li>";
            }).join("") +
          "</ul>" +
        "</div>" +
        '<div class="footer__col footer__col--contact">' +
          '<h2 class="footer__title">التواصل</h2>' +
          '<dl class="footer__contact">' +
            footerContactRow("العنوان", addressValue, !contact.address) +
            footerContactRow("الهاتف", phoneValue, !contact.phoneDisplay) +
            footerContactRow("البريد", emailValue, !contact.email) +
            footerContactRow("ساعات العمل", contact.hours ? esc(contact.hours) + (contact.hoursEn ? ' · <span class="en-label">' + esc(contact.hoursEn) + "</span>" : "") : "متاحون 24/7", false) +
          "</dl>" +
        "</div>" +
      "</div>" +
      '<div class="container footer__bottom">' +
        "<span>© <span id=\"footerYear\">2026</span> عيادة أوريك. جميع الحقوق محفوظة.</span>" +
        '<div class="footer__legal"><span>إسطنبول، تركيا</span><span>الموقع التعريفي</span><span>لا يغني عن الاستشارة الطبية</span></div>' +
        '<span class="footer__wordmark">Orec Clinic</span>' +
      "</div>" +
    "</footer>";

  /* ---------- Floating CTA ---------- */

  var floating =
    '<a class="floating" href="' + esc(contact.whatsapp) + '" target="_blank" rel="noopener noreferrer" aria-label="تواصل عبر واتساب">' +
      '<span class="floating__icon">' + icon("whatsapp") + "</span><span>واتساب</span>" +
    "</a>";

  /* ---------- Mount ---------- */

  var headerMount = document.getElementById("site-header");
  var footerMount = document.getElementById("site-footer");

  if (headerMount) headerMount.innerHTML = header + drawer;
  if (footerMount) footerMount.innerHTML = footer + floating;

  Array.prototype.forEach.call(document.querySelectorAll("[data-social-links]"), function (mount) {
    mount.innerHTML = socialLinks();
  });

  var year = document.getElementById("footerYear");
  if (year) year.textContent = String(new Date().getFullYear());

  /* Mark the active mega parent for styling. */
  var megaToggle = document.getElementById("megaToggle");
  if (megaToggle && isServicesSection) megaToggle.setAttribute("aria-current", "page");
})();
