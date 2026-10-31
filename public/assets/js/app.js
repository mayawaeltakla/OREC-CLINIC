/* ==========================================================================
   OREC CLINIC — Interface behaviour
   Navigation, drawer, accordions, reveal, contact form and anchor handling.
   ========================================================================== */

(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var megaToggle = document.getElementById("megaToggle");
  var megaItem = megaToggle ? megaToggle.closest(".nav__item") : null;
  var mega = document.getElementById("mega-services");
  var drawer = document.getElementById("mobileDrawer");
  var burger = document.querySelector(".burger");
  var drawerClose = drawer ? drawer.querySelector(".drawer__close") : null;
  var lastFocus = null;
  var megaTimer = null;

  /* ---------- Official contact data (single source: data.js) ---------- */

  var contact = OREC.contact || {};
  var contactHrefs = {
    phone: contact.phone ? "tel:" + contact.phone : "",
    whatsapp: contact.whatsapp || "",
    email: contact.email ? "mailto:" + contact.email : "",
    maps: contact.maps || ""
  };
  var contactMarkup = {
    phone: contact.phoneDisplay ? '<a href="tel:' + contact.phone + '" dir="ltr">' + contact.phoneDisplay + "</a>" : "",
    whatsapp: contact.phoneDisplay ? '<a href="' + contact.whatsapp + '" target="_blank" rel="noopener noreferrer" dir="ltr">' + contact.phoneDisplay + "</a>" : "",
    email: contact.email ? '<a href="mailto:' + contact.email + '">' + contact.email + "</a>" : "",
    address: contact.address ? '<a class="contact-address-link" href="' + contact.maps + '" target="_blank" rel="noopener noreferrer">' + contact.address + "</a>" : "",
    hours: (contact.hours || "متاحون 24/7") + (contact.hoursEn ? ' <span class="en-label">' + contact.hoursEn + "</span>" : "")
  };

  Array.prototype.forEach.call(document.querySelectorAll("[data-contact-value]"), function (mount) {
    var key = mount.getAttribute("data-contact-value");
    if (contactMarkup[key]) mount.innerHTML = contactMarkup[key];
  });

  Array.prototype.forEach.call(document.querySelectorAll("[data-contact-link]"), function (link) {
    var key = link.getAttribute("data-contact-link");
    if (contactHrefs[key]) link.setAttribute("href", contactHrefs[key]);
  });

  /* ---------- Sticky header state ---------- */

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mega menu ---------- */

  function openMega() {
    if (!megaToggle || !megaItem) return;
    window.clearTimeout(megaTimer);
    megaItem.classList.add("is-open");
    megaToggle.setAttribute("aria-expanded", "true");
    if (mega) mega.setAttribute("aria-hidden", "false");
  }

  function closeMega(returnFocus) {
    if (!megaToggle || !megaItem) return;
    megaItem.classList.remove("is-open");
    megaToggle.setAttribute("aria-expanded", "false");
    if (mega) mega.setAttribute("aria-hidden", "true");
    if (returnFocus) megaToggle.focus();
  }

  if (megaToggle && megaItem && mega) {
    megaToggle.addEventListener("click", function () {
      if (megaItem.classList.contains("is-open")) closeMega(false);
      else openMega();
    });

    var hoverQuery = window.matchMedia("(min-width: 1081px) and (hover: hover)");
    megaItem.addEventListener("mouseenter", function () {
      if (hoverQuery.matches) openMega();
    });
    megaItem.addEventListener("mouseleave", function () {
      if (hoverQuery.matches) {
        megaTimer = window.setTimeout(function () { closeMega(false); }, 160);
      }
    });

    megaItem.addEventListener("focusout", function (event) {
      if (!megaItem.contains(event.relatedTarget)) closeMega(false);
    });

    document.addEventListener("click", function (event) {
      if (!megaItem.contains(event.target)) closeMega(false);
    });
  }

  /* ---------- Mobile drawer ---------- */

  function focusableInDrawer() {
    if (!drawer) return [];
    return Array.prototype.slice.call(
      drawer.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) {
      return el.offsetParent !== null;
    });
  }

  function openDrawer() {
    if (!drawer) return;
    lastFocus = document.activeElement;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    if (burger) burger.setAttribute("aria-expanded", "true");
    window.setTimeout(function () {
      if (drawerClose) drawerClose.focus();
    }, 40);
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    if (burger) burger.setAttribute("aria-expanded", "false");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  if (burger && drawer) {
    burger.addEventListener("click", function () {
      if (drawer.classList.contains("is-open")) closeDrawer();
      else openDrawer();
    });
  }
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);

  if (drawer) {
    drawer.addEventListener("click", function (event) {
      var link = event.target.closest("a");
      if (link && link.getAttribute("href") && link.getAttribute("href") !== "#") closeDrawer();
    });

    drawer.addEventListener("keydown", function (event) {
      if (event.key !== "Tab") return;
      var items = focusableInDrawer();
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    if (drawer && drawer.classList.contains("is-open")) {
      closeDrawer();
      return;
    }
    if (megaItem && megaItem.classList.contains("is-open")) closeMega(true);
  });

  /* ---------- Drawer accordions ---------- */

  Array.prototype.forEach.call(document.querySelectorAll(".drawer__group > button"), function (button) {
    var group = button.parentElement;
    var panel = group.querySelector(".drawer__sub");

    button.addEventListener("click", function () {
      var willOpen = !group.classList.contains("is-open");
      group.classList.toggle("is-open", willOpen);
      button.setAttribute("aria-expanded", String(willOpen));
      if (panel) {
        panel.style.maxHeight = willOpen ? panel.scrollHeight + "px" : "0px";
      }
    });
  });

  /* ---------- Reveal on scroll ---------- */

  var revealItems = document.querySelectorAll(".reveal, .reveal-img");
  if ("IntersectionObserver" in window && revealItems.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

    Array.prototype.forEach.call(revealItems, function (item) { observer.observe(item); });
  } else {
    Array.prototype.forEach.call(revealItems, function (item) { item.classList.add("is-in"); });
  }

  /* ---------- Anchor targets inside accordions ---------- */

  function openHashTarget() {
    if (!location.hash) return;
    var target;
    try {
      target = document.querySelector(location.hash);
    } catch (error) {
      return;
    }
    if (!target) return;
    if (target.tagName === "DETAILS") target.open = true;
    var parent = target.closest("details");
    if (parent) parent.open = true;
    window.setTimeout(function () {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  }

  window.addEventListener("load", openHashTarget);
  window.addEventListener("hashchange", openHashTarget);

  /* ---------- Contact form (static preview) ---------- */

  var form = document.getElementById("contactForm");
  if (form) {
    var status = document.getElementById("formStatus");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (status) {
        status.textContent = "شكراً لك. هذه نسخة تعريفية من الموقع ولا ترسل البيانات بعد. سيتم ربط النموذج بالقناة الرسمية للعيادة فور اعتماد بيانات التواصل.";
        status.classList.add("is-visible");
        status.setAttribute("role", "status");
        status.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  /* ---------- Year ---------- */

  var year = document.getElementById("footerYear");
  if (year) year.textContent = String(new Date().getFullYear());
})();
