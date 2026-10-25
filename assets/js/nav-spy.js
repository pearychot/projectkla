// Marks the nav link for the section currently on screen (data-active) and,
// when the nav is a swipeable row (phones), slides that link into view.
(function () {
  var current = null;

  function links() {
    var nav = document.querySelector('[data-m="navlinks"]');
    if (!nav) return null;
    var list = [];
    nav.querySelectorAll('a[href^="#"]').forEach(function (a) {
      var section = document.getElementById(a.getAttribute('href').slice(1));
      if (section) list.push({ a: a, section: section });
    });
    return { nav: nav, list: list };
  }

  function update() {
    var found = links();
    if (!found) return;
    var nav = found.nav, list = found.list;
    var line = nav.getBoundingClientRect().bottom + 40;
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    var active = null;
    list.forEach(function (item) {
      var top = item.section.getBoundingClientRect().top;
      if (top <= line || (atBottom && top < window.innerHeight)) {
        if (!active || top >= active.section.getBoundingClientRect().top) active = item;
      }
    });
    var a = active ? active.a : null;
    if (a === current) return;
    if (current) current.removeAttribute('data-active');
    current = a;
    if (!a) return;
    a.setAttribute('data-active', '');
    if (nav.scrollWidth > nav.clientWidth) {
      nav.scrollTo({ left: a.offsetLeft - nav.offsetLeft - (nav.clientWidth - a.offsetWidth) / 2, behavior: 'smooth' });
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  window.addEventListener('load', update);
})();
