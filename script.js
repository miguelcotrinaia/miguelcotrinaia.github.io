(function () {
  "use strict";

  // Año en el pie
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menú en móvil
  var bar = document.getElementById("bar");
  var toggle = document.getElementById("navToggle");
  if (bar && toggle) {
    toggle.addEventListener("click", function () {
      var open = bar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    bar.querySelectorAll(".bar__nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        bar.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Botón de WhatsApp: aparece al bajar
  var wa = document.getElementById("floatingWa");
  if (wa) {
    var onScroll = function () { wa.classList.toggle("is-visible", window.scrollY > 520); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Cursos: oculta los que ya terminaron y cambia a precio regular al cerrar la preventa.
  // Fechas en hora de Lima (UTC-5). Para un curso nuevo, copia un <article class="course"> y cambia data-fin.
  function finDelDia(fecha) { return new Date(fecha + "T23:59:59-05:00"); }
  var ahora = new Date();
  var visibles = 0;
  document.querySelectorAll(".course[data-fin]").forEach(function (c) {
    if (ahora > finDelDia(c.getAttribute("data-fin"))) { c.hidden = true; } else { visibles++; }
  });
  document.querySelectorAll(".price[data-hasta]").forEach(function (p) {
    if (ahora > finDelDia(p.getAttribute("data-hasta"))) { p.textContent = p.getAttribute("data-reg"); }
  });
  var vacio = document.getElementById("cursosVacio");
  if (vacio && visibles === 0) vacio.hidden = false;
})();
