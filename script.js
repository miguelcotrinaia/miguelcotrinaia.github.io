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

  // Cursos: vienen de arkanyai.com/academy/cursos.json (un solo archivo para todas las webs).
  // Para agregar o agotar un curso se edita ese archivo; aquí no hay que tocar nada.
  window.pintarCursos = function () {
    var A = window.ArkCursos, lista = document.getElementById("cursosLista");
    if (!A || !lista) return;
    A.cargar().then(function (cursos) {
      cursos = cursos.slice(0, 4);
      document.getElementById("cursosVacio").hidden = cursos.length > 0;
      lista.hidden = cursos.length === 0;
      lista.innerHTML = cursos.map(function (c) {
        var e = A.esc, agotado = c.estado === "agotado";
        var accion = agotado
          ? '<a class="btn btn--accent" href="' + A.wa("Hola Miguel, quiero que me avises de la próxima edición del " + c.nombre + ".") + '" target="_blank" rel="noopener">Avísame de la próxima</a>'
          : '<a class="btn btn--accent" href="' + e(c.inscripcion) + '" target="_blank" rel="noopener">Inscribirme</a>';
        return '<article class="course' + (agotado ? " is-agotado" : "") + '">' +
          '<p class="course__who">' + e(A.para(c)) + (agotado ? ' <span class="course__state">Cupos agotados</span>' : "") + '</p>' +
          '<h3>' + e(c.nombre) + '</h3><p>' + e(c.resumen) + '</p>' +
          '<dl><div><dt>Fechas</dt><dd>' + e(c.fechas) + '</dd></div>' +
          '<div><dt>Duración</dt><dd>' + e(c.duracion) + '</dd></div>' +
          '<div><dt>Inversión</dt><dd class="price">' + e(c.precio) + '</dd></div></dl>' +
          '<div class="course__acts">' + accion +
          (c.temario ? '<a class="btn btn--line-light" href="' + e(c.temario) + '" target="_blank" rel="noopener">Ver temario</a>' : "") +
          '</div></article>';
      }).join("");
    }).catch(function () {});
  };
})();
