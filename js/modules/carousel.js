/* Carrusel del hero: autoplay con fundido, controles, dots, teclado,
   swipe táctil y pausa en hover/foco/pestaña oculta. */
(function () {
  'use strict';

  function initCarousel() {
    var root = document.querySelector('[data-carousel]');
    if (!root) {
      return;
    }

    var slides = Array.prototype.slice.call(root.querySelectorAll('.carousel__slide'));
    var prevBtn = root.querySelector('.carousel__control--prev');
    var nextBtn = root.querySelector('.carousel__control--next');
    var dots = Array.prototype.slice.call(root.querySelectorAll('.carousel__dot'));
    var liveRegion = root.querySelector('.carousel__live');

    if (!slides.length) {
      return;
    }

    var AUTOPLAY_DELAY = 5000;
    var SWIPE_THRESHOLD = 50;
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var currentIndex = 0;
    var autoplayTimer = null;
    var pointerStartX = null;

    function goTo(index, manual) {
      var total = slides.length;
      currentIndex = (index + total) % total;

      slides.forEach(function (slide, i) {
        var isActive = i === currentIndex;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
      });

      dots.forEach(function (dot, i) {
        var isActive = i === currentIndex;
        dot.classList.toggle('is-active', isActive);
        if (isActive) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });

      if (liveRegion) {
        liveRegion.setAttribute('aria-live', manual ? 'polite' : 'off');
        if (manual) {
          liveRegion.textContent = 'Diapositiva ' + (currentIndex + 1) + ' de ' + total;
        }
      }
    }

    function next(manual) {
      goTo(currentIndex + 1, !!manual);
    }

    function prev(manual) {
      goTo(currentIndex - 1, !!manual);
    }

    function startAutoplay() {
      if (prefersReducedMotion) {
        return;
      }
      stopAutoplay();
      autoplayTimer = window.setInterval(function () {
        next(false);
      }, AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prev(true);
        startAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        next(true);
        startAutoplay();
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goTo(i, true);
        startAutoplay();
      });
    });

    root.addEventListener('mouseenter', stopAutoplay);
    root.addEventListener('mouseleave', startAutoplay);
    root.addEventListener('focusin', stopAutoplay);
    root.addEventListener('focusout', startAutoplay);

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    root.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        prev(true);
        startAutoplay();
      } else if (event.key === 'ArrowRight') {
        next(true);
        startAutoplay();
      }
    });

    root.addEventListener('pointerdown', function (event) {
      pointerStartX = event.clientX;
    });

    root.addEventListener('pointerup', function (event) {
      if (pointerStartX === null) {
        return;
      }
      var deltaX = event.clientX - pointerStartX;
      pointerStartX = null;
      if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
        return;
      }
      if (deltaX < 0) {
        next(true);
      } else {
        prev(true);
      }
      startAutoplay();
    });

    goTo(0, false);
    startAutoplay();
  }

  window.RenacerApp = window.RenacerApp || {};
  window.RenacerApp.initCarousel = initCarousel;
})();
