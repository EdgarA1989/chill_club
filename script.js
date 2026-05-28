/* ══════════════════════════════════════════
   CHILL CLUB — script.js
══════════════════════════════════════════ */

/* ── AGE GATE ── */
const ageGate  = document.getElementById('age-gate');
const btnEnter = document.getElementById('btn-enter');
const btnExit  = document.getElementById('btn-exit');

/**
 * Si el usuario ya confirmó su edad en esta sesión,
 * ocultar el age gate directamente.
 */
if (sessionStorage.getItem('age_verified') === '1') {
  ageGate.style.display = 'none';
}

/** El usuario confirma que tiene 18+ */
btnEnter.addEventListener('click', () => {
  sessionStorage.setItem('age_verified', '1');
  ageGate.style.opacity = '0';
  ageGate.style.pointerEvents = 'none';
  setTimeout(() => {
    ageGate.style.display = 'none';
  }, 500);
});

/** El usuario indica que es menor de edad */
btnExit.addEventListener('click', () => {
  document.body.innerHTML = `
    <div style="
      min-height: 100vh;
      background: #1A3A1A;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Nunito', sans-serif;
      text-align: center;
      padding: 2rem;
    ">
      <div>
        <div style="font-size: 5rem; margin-bottom: 1rem;">🍃</div>
        <h2 style="
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          color: #F4F0E6;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        ">Acceso restringido</h2>
        <p style="color: rgba(244,240,230,0.6); max-width: 360px; line-height: 1.6;">
          Este sitio es exclusivo para mayores de 18 años.<br>
          Volvé cuando seas mayor.
        </p>
      </div>
    </div>
  `;
});

/* ── SCROLL FADE-IN ── */
/**
 * Observa todos los elementos con clase .fade-in
 * y les agrega .visible al entrar en el viewport.
 */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target); // se dispara solo una vez
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-in').forEach((el) => {
  fadeObserver.observe(el);
});

/* ── NAVBAR: highlight de sección activa ── */
/**
 * Escucha el scroll y marca como activo el link
 * del nav correspondiente a la sección visible.
 */
const sections  = document.querySelectorAll('section[id], main section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let currentId = '';

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 90 && rect.bottom > 90) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle(
      'nav-active',
      href === `#${currentId}`
    );
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ── MOBILE NAV DRAWER ── */
const hamburger   = document.getElementById('nav-hamburger');
const navDrawer   = document.getElementById('nav-drawer');
const navOverlay  = document.getElementById('nav-overlay');
const drawerClose = document.getElementById('drawer-close');

function openDrawer() {
  navDrawer.classList.add('active');
  navOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  navDrawer.classList.remove('active');
  navOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
navOverlay.addEventListener('click', closeDrawer);

navDrawer.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', closeDrawer);
});

/* ── SMOOTH SCROLL para links internos ── */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = document.querySelector('nav').offsetHeight;
      const tickerHeight = document.querySelector('.ticker').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - tickerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
