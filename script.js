// =============================================
// NAVBAR - Scroll effect
// =============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// =============================================
// HAMBURGER MENU
// =============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// =============================================
// TYPED TEXT ANIMATION
// =============================================
const phrases = [
  'Management',
  "Gestion de l'Information",
  'Communication d\'entreprise',
  'Analyse Organisationnelle',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 50 : 85;

  if (!isDeleting && charIndex === currentPhrase.length) {
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

type();

// =============================================
// INTERSECTION OBSERVER - Scroll animations
// =============================================
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
    }
  });
}, observerOptions);

document.querySelectorAll(
  '.timeline-item, .skill-card, .exp-card, .project-card, .asso-card'
).forEach(el => observer.observe(el));

// Language bars animation on scroll
const langObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.lang-fill').forEach(bar => {
        bar.style.width = bar.getAttribute('style').match(/width:([^%]+%)/)?.[1] || '0%';
      });
    }
  });
}, { threshold: 0.3 });

const langSection = document.querySelector('.languages-section');
if (langSection) langObserver.observe(langSection);

// Set initial width to 0 for animation
document.querySelectorAll('.lang-fill').forEach(bar => {
  const targetWidth = bar.style.width;
  bar.setAttribute('data-width', targetWidth);
  bar.style.width = '0%';
});

// Re-animate languages when visible
const langBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.lang-fill').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width');
      });
    }
  });
}, { threshold: 0.5 });

if (langSection) langBarObserver.observe(langSection);

// =============================================
// CONTACT FORM (Demo)
// =============================================
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('form-submit');
    btn.disabled = true;
    btn.innerHTML = '<span>Envoi en cours...</span>';

    setTimeout(() => {
      form.innerHTML = `
        <div class="form-success">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <span>Message envoyé avec succès ! Wafa vous répondra bientôt.</span>
        </div>
      `;
    }, 1500);
  });
}

// =============================================
// SMOOTH ACTIVE NAV LINK
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link:not(.btn-contact)');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--primary-light)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

// =============================================
// CARD TILT EFFECT (subtle)
// =============================================
document.querySelectorAll('.skill-card, .timeline-card, .asso-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
