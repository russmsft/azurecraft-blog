// AzureCraft site behaviour: mobile nav, reading progress, footer year.
// Intentionally dependency-free and safe to include on every page.
(function () {
  "use strict";

  // Current year in any element marked with data-year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Mobile navigation toggle
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".site-nav__links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Newsletter subscribe form.
  // Provider-ready: set data-endpoint on the form to your email provider's
  // POST URL (Mailchimp, Buttondown, ConvertKit, an Azure Function, etc.).
  // With no endpoint configured it validates and shows a friendly message
  // instead of failing silently.
  document.querySelectorAll(".cta-form").forEach(function (form) {
    var input = form.querySelector('input[type="email"]');
    var status = form.parentElement.querySelector(".cta-status");
    if (!status) {
      status = document.createElement("p");
      status.className = "cta-status";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      form.insertAdjacentElement("afterend", status);
    }

    var setStatus = function (msg, kind) {
      status.textContent = msg;
      status.dataset.kind = kind || "info";
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = (input && input.value || "").trim();
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!valid) {
        setStatus("Please enter a valid email address.", "error");
        if (input) input.focus();
        return;
      }

      var endpoint = form.getAttribute("data-endpoint");
      if (!endpoint) {
        // No provider wired up yet — acknowledge gracefully.
        setStatus("Thanks! Subscriptions aren’t live yet — check back soon.", "info");
        form.reset();
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      setStatus("Subscribing…", "info");

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email })
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          setStatus("You’re subscribed — thank you!", "success");
          form.reset();
        })
        .catch(function () {
          setStatus("Something went wrong. Please try again later.", "error");
        })
        .finally(function () {
          if (btn) btn.disabled = false;
        });
    });
  });

  // Reading progress bar (only on pages that opt in with .reading-progress)
  var bar = document.querySelector(".reading-progress");
  if (bar) {
    var update = function () {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - doc.clientHeight;
      var pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
      bar.style.width = pct + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  // Diagram tabs (accessible tablist toggling image panels)
  document.querySelectorAll(".diagram-tabs").forEach(function (group) {
    var tabs = Array.prototype.slice.call(
      group.querySelectorAll(".diagram-tabs__btn")
    );
    var activate = function (tab) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.classList.toggle("is-active", selected);
        t.setAttribute("aria-selected", String(selected));
        t.setAttribute("tabindex", selected ? "0" : "-1");
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !selected;
      });
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        activate(tab);
      });
      tab.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          var dir = e.key === "ArrowRight" ? 1 : -1;
          var next = tabs[(i + dir + tabs.length) % tabs.length];
          activate(next);
          next.focus();
        }
      });
    });
  });
})();
