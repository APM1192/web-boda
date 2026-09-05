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

  var elNum = document.getElementById('cuenta-dias');
  var elTxt = document.getElementById('cuenta-txt');

  function pintarCuenta() {
    if (!elNum || !elTxt) return;

    var ms = BODA - new Date();

    if (ms <= 0) {
      var pasado = new Date() - BODA;
      // Durante las 12 horas siguientes seguimos "en" la boda
      if (pasado < 12 * 3600 * 1000) {
        elNum.textContent = '¡Hoy!';
        elTxt.textContent = 'nos casamos';
      } else {
        elNum.textContent = '';
        elTxt.textContent = 'Gracias por acompañarnos';
      }
      return;
    }

    var dias = Math.floor(ms / 86400000);

    if (dias > 1) {
      elNum.textContent = dias;
      elTxt.textContent = 'días por delante';
    } else if (dias === 1) {
      elNum.textContent = '1';
      elTxt.textContent = 'día por delante';
    } else {
      var horas = Math.floor(ms / 3600000);
      elNum.textContent = horas;
      elTxt.textContent = horas === 1 ? 'hora para vernos' : 'horas para vernos';
    }
  }

  pintarCuenta();
  setInterval(pintarCuenta, 60000);

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

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(valor).then(listo).catch(seleccionar);
      } else {
        seleccionar();
      }

      function seleccionar() {
        // Sin portapapeles: seleccionamos el texto para copiar a mano
        var code = document.getElementById('iban-txt');
        if (!code) return;
        var rango = document.createRange();
        rango.selectNodeContents(code);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(rango);
        btn.textContent = 'Selecciona y copia';
      }
    });
  }

  /* ── 3. Aparición suave al hacer scroll ─────────
     Respeta prefers-reduced-motion.               */

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
})();
