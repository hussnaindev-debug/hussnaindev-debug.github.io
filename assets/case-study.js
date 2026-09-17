/* Shared behavior for project case-study pages.
   - sticky nav shadow
   - reveal-on-scroll
   - sub-nav scroll spy + smooth scroll
   - gallery lightbox (keyboard, prev/next, Esc, backdrop click) */
(function () {
    'use strict';

    // Sticky nav shadow
    var nav = document.getElementById('nav');
    if (nav) {
        var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Reveal on scroll
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('in'); });
    }

    // Sub-nav scroll spy
    var subnav = document.querySelector('.cs-subnav');
    if (subnav) {
        var links = Array.prototype.slice.call(subnav.querySelectorAll('a[href^="#"]'));
        var sections = links.map(function (a) {
            var id = a.getAttribute('href').slice(1);
            return document.getElementById(id);
        });
        if ('IntersectionObserver' in window) {
            var spy = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                    if (e.isIntersecting) {
                        var id = e.target.id;
                        links.forEach(function (a) {
                            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
                        });
                    }
                });
            }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
            sections.forEach(function (s) { if (s) spy.observe(s); });
        }
    }

    // Lightbox
    var figures = Array.prototype.slice.call(document.querySelectorAll('.cs-gallery figure[data-full]'));
    var lb = document.getElementById('lightbox');
    if (figures.length && lb) {
        var lbImg = lb.querySelector('img');
        var lbCap = lb.querySelector('.lb-cap');
        var current = 0;

        var items = figures.map(function (f) {
            return { src: f.getAttribute('data-full'), cap: (f.querySelector('figcaption') || {}).textContent || '' };
        });

        function show(i) {
            current = (i + items.length) % items.length;
            lbImg.src = items[current].src;
            lbImg.alt = items[current].cap;
            lbCap.textContent = items[current].cap;
        }
        function open(i) {
            show(i);
            lb.classList.add('open');
            document.body.style.overflow = 'hidden';
            lb.querySelector('.lb-close').focus();
        }
        function close() {
            lb.classList.remove('open');
            document.body.style.overflow = '';
            lbImg.src = '';
        }

        figures.forEach(function (f, i) {
            f.setAttribute('tabindex', '0');
            f.setAttribute('role', 'button');
            f.addEventListener('click', function () { open(i); });
            f.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
            });
        });

        lb.querySelector('.lb-close').addEventListener('click', close);
        lb.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
        lb.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
        lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
        document.addEventListener('keydown', function (e) {
            if (!lb.classList.contains('open')) return;
            if (e.key === 'Escape') close();
            else if (e.key === 'ArrowLeft') show(current - 1);
            else if (e.key === 'ArrowRight') show(current + 1);
        });

        // Basic swipe support
        var startX = null;
        lb.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
        lb.addEventListener('touchend', function (e) {
            if (startX === null) return;
            var dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
            startX = null;
        }, { passive: true });
    }
})();
