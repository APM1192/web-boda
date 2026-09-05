/* ════════════════════════════════════════════════
   Álvaro & Rocío · 30 de abril de 2027
   Sin librerías. Todo nativo.
   ════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. Cuenta atrás ───────────────────────────
     TODO: ajustar la hora cuando la finca confirme
     el horario definitivo de la ceremonia.        */

  var BODA = new Date('2027-04-30T18:00:00+02:00');

  var caja = document.getElementById('cuenta');
  var eD = document.getElementById('cd-d');
  var eH = document.getElementById('cd-h');
  var eM = document.getElementById('cd-m');
  var eS = document.getElementById('cd-s');

  function dos(n) { return n < 10 ? '0' + n : String(n); }

  function pintar() {
    if (!eD) return;

    var ms = BODA - new Date();

    if (ms <= 0) {
      if (caja && !caja.classList.contains('cd--fin')) {
        caja.classList.add('cd--fin');
        var p = document.createElement('p');
        p.className = 'cd__fin';
        p.textContent = (new Date() - BODA) < 43200000
          ? 'Hoy nos casamos'
          : 'Gracias por acompañarnos';
        caja.appendChild(p);
      }
      return;
    }

    var seg = Math.floor(ms / 1000);
    eD.textContent = Math.floor(seg / 86400);
    eH.textContent = dos(Math.floor(seg / 3600) % 24);
    eM.textContent = dos(Math.floor(seg / 60) % 60);
    eS.textContent = dos(seg % 60);
  }

  pintar();
  setInterval(pintar, 1000);

  /* ── 2. Copiar el número de cuenta ───────────── */

  var btn = document.getElementById('iban-btn');
  var ok = document.getElementById('iban-ok');

  if (btn) {
    btn.addEventListener('click', function () {
      var valor = btn.getAttribute('data-copy') || '';

      var listo = function () {
        btn.textContent = 'Número copiado';
        if (ok) ok.hidden = false;
        setTimeout(function () {
          btn.textContent = 'Copiar número de cuenta';
          if (ok) ok.hidden = true;
        }, 2600);
      };

      var seleccionar = function () {
        var code = document.getElementById('iban-txt');
        if (!code) return;
        var rango = document.createRange();
        rango.selectNodeContents(code);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(rango);
        btn.textContent = 'Selecciona y copia';
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(valor).then(listo).catch(seleccionar);
      } else {
        seleccionar();
      }
    });
  }

  /* ── 3. Aparición suave al hacer scroll ───────── */

  var quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!quieto && 'IntersectionObserver' in window) {
    var objetivos = document.querySelectorAll('.s .wrap');
    objetivos.forEach(function (el) { el.classList.add('reveal'); });

    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          obs.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.06 });

    objetivos.forEach(function (el) { obs.observe(el); });
  }

  /* ── 4. Sombra de la barra al despegarse ──────── */

  var nav = document.getElementById('nav');
  var centinela = document.getElementById('inicio');

  if (nav && centinela && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      nav.classList.toggle('is-stuck', !e[0].isIntersecting);
    }, { rootMargin: '-70px 0px 0px 0px' }).observe(centinela);
  }

  /* ── 4b. La señal de bajar solo vive en la portada ── */

  var senal = document.querySelector('.scroll');

  if (senal) {
    var revisaSenal = function () {
      senal.classList.toggle('is-oculto', (window.scrollY || window.pageYOffset) > 40);
    };
    window.addEventListener('scroll', revisaSenal, { passive: true });
    revisaSenal();
  }

  /* ── 5. Telón: fundido entre las dos fotos y salida a color liso ── */

  var telon = document.getElementById('telon');

  if (telon) {
    var capaA = telon.querySelector('.telon__capa--a');
    var capaB = telon.querySelector('.telon__capa--b');
    var pedido = false;

    var recorta = function (n) { return n < 0 ? 0 : (n > 1 ? 1 : n); };

    var pinta = function () {
      pedido = false;
      var alto = window.innerHeight;
      var y = window.scrollY || window.pageYOffset;

      // Tramo 1 (0 → 1 pantalla): la costa da paso al Teide
      var t1 = recorta(y / alto);
      // Tramo 2 (1 → 2 pantallas): el Teide se apaga hasta el color liso
      var t2 = recorta((y - alto) / alto);

      capaA.style.opacity = String(1 - t1);
      capaB.style.opacity = String(t1 * (1 - t2));
    };

    var alScroll = function () {
      if (!pedido) { pedido = true; requestAnimationFrame(pinta); }
    };

    if (!quieto) {
      window.addEventListener('scroll', alScroll, { passive: true });
      window.addEventListener('resize', alScroll, { passive: true });
      pinta();
    }
  }
})();
