
(function () {
  var STORAGE_KEY = "webbook-reader-prefs-v1";
  var DEFAULTS = {"size": "m", "font": "original", "images": "on", "background": "auto"};
  var PORTABLE = false;

  function loadPrefs() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return Object.assign({}, DEFAULTS);
      return Object.assign({}, DEFAULTS, JSON.parse(raw));
    } catch (e) {
      return Object.assign({}, DEFAULTS);
    }
  }

  function savePrefs(prefs) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); }
    catch (e) { /* ignore (private browsing etc.) */ }
  }

  function applyReaderPrefs(prefs) {
    var html = document.documentElement;
    html.setAttribute("data-reader-size", prefs.size);
    html.setAttribute("data-reader-font", prefs.font);
    html.setAttribute("data-reader-images", prefs.images);
  }

  // Re-invokes the SAME background runtime backgrounds.py's own
  // init_script already called once on load, with the SAME identity --
  // a visitor's engine choice is a different look at the same page's
  // deterministic composition, not a different page. No-op (including
  // in the portable build, where the runtime was never loaded at all)
  // if the runtime or the target element isn't present -- see module
  // docstring on why the portable build never renders this group's UI
  // in the first place, so in practice this only ever runs in-library.
  //
  // Writes the result into --hs-reader-bg/--hs-reader-ink/--hs-outer-bg
  // (single-source-of-truth pass, 2026-09-04) instead of setting
  // .hs-content's inline style directly -- the SAME three properties
  // pipeline.backgrounds' own init_script and render_tokens()'s default
  // bake-in use, so .hs-content, the outer margin, AND the settings
  // panel (which now reads these same two colors directly -- see
  // webbook_nav_style()'s own docstring) all update from this one call,
  // with nothing separate left to keep in sync or re-run afterward.
  function applyBackgroundOverride(mode) {
    if (PORTABLE) return;
    if (!window.HomeScholarBackgrounds) return;
    var target = document.getElementById("hs-background");
    if (!target) return;
    var identity = target.dataset.identity;
    if (!identity) return;
    var effectiveMode = (mode === "auto") ? (target.dataset.mode || "library") : mode;
    var result;
    try {
      result = window.HomeScholarBackgrounds.render({
        target: target,
        mode: effectiveMode,
        identity: identity,
        date: new Date().toISOString().slice(0, 10)
      });
    } catch (e) { return; }
    if (result) {
      var root = document.documentElement.style;
      if (result.reader) {
        root.setProperty("--hs-reader-bg", result.reader);
        root.setProperty("--hs-outer-bg", result.reader);
      }
      if (result.ink) root.setProperty("--hs-reader-ink", result.ink);
    }
  }

  function syncActiveButtons(panel, prefs) {
    panel.querySelectorAll("[data-pref]").forEach(function (btn) {
      var key = btn.getAttribute("data-pref");
      var val = btn.getAttribute("data-value");
      btn.classList.toggle("active", prefs[key] === val);
    });
  }

  function buildPanel() {
    var panel = document.createElement("div");
    panel.className = "reader-settings-panel";
    panel.innerHTML =
      '<button type="button" class="reader-settings-close" aria-label="Close settings">\u00d7</button>' +
      '<h3>Text Size</h3>' +
      '<div class="reader-settings-group reader-settings-row">' +
        '<button data-pref="size" data-value="m">A</button>' +
        '<button data-pref="size" data-value="l">A</button>' +
        '<button data-pref="size" data-value="xl">A</button>' +
        '<button data-pref="size" data-value="xxl">A</button>' +
      '</div>' +
      "<h3>Background</h3><div class=\"reader-settings-group reader-settings-row\"><button data-pref=\"background\" data-value=\"library\">Library</button><button data-pref=\"background\" data-value=\"dark\">Dark mode</button><button data-pref=\"background\" data-value=\"deep-sky\">Deep Sky</button><button data-pref=\"background\" data-value=\"starfield\">Starfield</button><button data-pref=\"background\" data-value=\"solar-system\">Solar System</button></div>" +
      '<h3>Font</h3>' +
      '<div class="reader-settings-group reader-settings-row font-row">' +
        '<button data-pref="font" data-value="original">Original (book default)</button>' +
        '<button data-pref="font" data-value="times">Times New Roman</button>' +
        '<button data-pref="font" data-value="georgia">Georgia</button>' +
        '<button data-pref="font" data-value="garamond">Garamond</button>' +
        '<button data-pref="font" data-value="sans">Sans-serif</button>' +
        '<button data-pref="font" data-value="dyslexic">Dyslexia-friendly</button>' +
      '</div>' +
      '<h3>Images</h3>' +
      '<div class="reader-settings-group reader-settings-row">' +
        '<button data-pref="images" data-value="on">Show</button>' +
        '<button data-pref="images" data-value="off">Hide</button>' +
      '</div>';
    return panel;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var prefs = loadPrefs();
    applyReaderPrefs(prefs);
    if (prefs.background && prefs.background !== "auto") applyBackgroundOverride(prefs.background);

    // TWO entry points to the same panel (design decision, 2026-09-04):
    // the edge tab alone was easy to miss entirely (small, viewport-fixed,
    // no label), so a second toggle lives in .book-nav's own settings-slot
    // -- the one place a reader's eye already goes to turn pages. Both
    // toggles drive the exact same openPanel()/closePanel() pair below and
    // stay in sync (see setExpanded()); only their OPEN mechanisms differ.
    //
    // Edge tab: viewport-fixed (not inside .book-nav), reachable regardless
    // of scroll position; supports hover-open (see hoverCapable below) as
    // a quick-access affordance for anyone who's found it.
    var edgeToggle = document.createElement("button");
    edgeToggle.type = "button";
    edgeToggle.className = "reader-settings-toggle";
    edgeToggle.setAttribute("aria-label", "Reading settings");
    edgeToggle.setAttribute("aria-expanded", "false");
    edgeToggle.textContent = "\u2699";
    document.body.appendChild(edgeToggle);

    // Nav-bar tab: lives in .settings-slot (render_book_nav()'s markup) if
    // this page has a .book-nav at all -- click-only, deliberately no
    // hover-open. Reasoning: it sits among ordinary nav-bar links a reader
    // is already clicking to turn pages, where a hover-triggered popup
    // would be an unpleasant surprise (hovering "Next" to read the label
    // shouldn't risk brushing this one open too) -- unlike the edge tab,
    // which has nothing else near it to accidentally hover over.
    var navSlot = document.querySelector(".book-nav .settings-slot");
    var navToggle = null;
    if (navSlot) {
      navToggle = document.createElement("button");
      navToggle.type = "button";
      navToggle.className = "book-nav-settings-toggle";
      navToggle.setAttribute("aria-label", "Reading settings");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "\u2699";
      navSlot.appendChild(navToggle);
    }
    var toggles = navToggle ? [edgeToggle, navToggle] : [edgeToggle];

    var panel = buildPanel();
    syncActiveButtons(panel, prefs);
    document.body.appendChild(panel);

    var closeBtn = panel.querySelector(".reader-settings-close");
    var hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    var closeTimer = null;
    var lastOpener = edgeToggle;

    function setExpanded(open) {
      toggles.forEach(function (t) { t.setAttribute("aria-expanded", open ? "true" : "false"); });
    }
    function openPanel(opener) {
      clearTimeout(closeTimer);
      lastOpener = opener || lastOpener;
      panel.classList.add("open");
      setExpanded(true);
    }
    function closePanel() {
      panel.classList.remove("open");
      setExpanded(false);
    }
    function scheduleClose() {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(closePanel, 300);
    }

    // Click/tap is the primary, always-available control on BOTH toggles
    // -- the only one touch, keyboard, and switch-access users get at all.
    // Toggling (not only-open) means a click also closes it, so a mouse
    // user is never dependent on hover just to dismiss it.
    toggles.forEach(function (t) {
      t.addEventListener("click", function (e) {
        e.stopPropagation();
        if (panel.classList.contains("open")) closePanel(); else openPanel(t);
      });
    });

    // Hover-open/hover-out-close layered on top of the EDGE TAB ONLY (see
    // navToggle's own comment above for why the nav-bar one skips this),
    // gated to pointers that actually have hover -- wiring it
    // unconditionally would leave the panel effectively stuck (no
    // mouseleave ever fires) or unreachable on a touchscreen.
    // scheduleClose()'s delay is "hover intent": it survives the pointer
    // briefly crossing the gap between the tab and the panel, or a
    // momentary flick outside either element, instead of slamming the
    // panel shut on the first pixel of separation.
    if (hoverCapable) {
      edgeToggle.addEventListener("mouseenter", function () { openPanel(edgeToggle); });
      edgeToggle.addEventListener("mouseleave", scheduleClose);
      panel.addEventListener("mouseenter", function () { clearTimeout(closeTimer); });
      panel.addEventListener("mouseleave", scheduleClose);
    }

    // Explicit close (X) -- the conventional "I'm done" control, and the
    // only in-panel dismissal a touch or screen-reader user can rely on
    // (hover-out doesn't apply to them at all). Kept alongside hover-out
    // and click-outside rather than instead of either. Focus returns to
    // WHICHEVER toggle opened the panel, not always the edge tab, so
    // keyboard focus lands back where the visitor's attention already was.
    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      closePanel();
      lastOpener.focus();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("open")) {
        closePanel();
        lastOpener.focus();
      }
    });

    panel.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-pref]");
      if (!btn) return;
      var key = btn.getAttribute("data-pref");
      var val = btn.getAttribute("data-value");
      prefs[key] = val;
      applyReaderPrefs(prefs);
      if (key === "background") {
        applyBackgroundOverride(val);
        // Keep data-bg-override in sync with a live in-panel change too.
        // Nothing on THIS page still depends on the attribute for color
        // (applyBackgroundOverride() above already wrote the resolved
        // colors straight into --hs-reader-bg/--hs-reader-ink/
        // --hs-outer-bg) -- this is for the NEXT page load, where
        // preapply_script() reads localStorage fresh regardless, so it's
        // truly just keeping the DOM's own reflection of "what's
        // currently active" honest (e.g. for pipeline.backgrounds' own
        // init_script, if this page were ever reloaded without a full
        // navigation) rather than leaving a stale value from a prior
        // choice sitting in the attribute.
        if (val === "auto") document.documentElement.removeAttribute("data-bg-override");
        else document.documentElement.setAttribute("data-bg-override", val);
      }
      savePrefs(prefs);
      syncActiveButtons(panel, prefs);
    });

    document.addEventListener("click", function (e) {
      if (panel.contains(e.target)) return;
      if (toggles.indexOf(e.target) !== -1) return;
      closePanel();
    });
  });
})();
