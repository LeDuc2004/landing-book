$(function () {
  $(".top_hero").slick({
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 3000,
  });

  const scrollers = document.querySelectorAll(".scroller");
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
  }

  function addAnimation() {
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", true);

      const scrollerInner = scroller.querySelector(".scroller_inner");
      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }
});

// Landing page helpers
document.addEventListener("DOMContentLoaded", function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  // Smooth scroll for internal nav links (fallback in case CSS not supported)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Mobile nav toggle
  const toggle = document.querySelector('.bookui__nav-toggle');
  const links = document.querySelector('.bookui__nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function(){
      links.classList.toggle('show');
    });
  }

  // Reviews slider
  if ($ && $('.bookui__reviews-slider').length) {
    $('.bookui__reviews-slider').slick({
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 4000,
      adaptiveHeight: true
    });
  }

  // Counters animation
  const counters = document.querySelectorAll('.counter span[data-count]');
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const end = parseInt(el.getAttribute('data-count') || '0', 10);
      let current = 0;
      const step = Math.max(1, Math.floor(end / 120));
      const int = setInterval(() => {
        current += step;
        if (current >= end) { current = end; clearInterval(int); }
        el.textContent = current.toLocaleString();
      }, 16);
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => obs.observe(c));

  // Modal open/close
  document.querySelectorAll('[data-modal]').forEach(link => {
    link.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.getAttribute('data-modal');
      const dlg = document.getElementById(id);
      if (dlg && dlg.showModal) dlg.showModal();
    });
  });

  // Chapters details: close others when one opens (accordion behavior)
  const chapterDetails = document.querySelectorAll('.chapters__list details');
  chapterDetails.forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open) {
        chapterDetails.forEach(o => { if (o !== d) o.open = false; });
      }
    });
  });
});