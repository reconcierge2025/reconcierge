const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const langToggle = document.getElementById('lang-toggle');
const elementsToTranslate = document.querySelectorAll('[data-en], [data-he]');

let currentLang = localStorage.getItem('lang') || 'en';

// פונקציה שמעדכנת את כל התוכן לפי השפה הנוכחית
function updateLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  langToggle.textContent = lang === 'he' ? 'English' : 'עברית';

  // הוסף גם כאן!
  document.body.classList.remove('rtl', 'ltr');
  document.body.classList.add(lang === 'he' ? 'rtl' : 'ltr');

  elementsToTranslate.forEach(el => {
    const newText = el.getAttribute(`data-${lang}`);
    if (newText) el.textContent = newText;
  });

  const menuLabel = menuToggle.getAttribute(`data-${lang}-label`);
  if (menuLabel) {
    menuToggle.setAttribute('aria-label', menuLabel);
  }
}

// שינוי שפה בלחיצה
langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'he' : 'en';
  localStorage.setItem('lang', currentLang);
  updateLanguage(currentLang);
});

// פתיחה/סגירה של התפריט
menuToggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// סגירה בלחיצה מחוץ לתפריט
document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
    menu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// סגירה בלחיצה על Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    menu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// פונקציית גלילה עם פיצוי על גובה ה-header וסגירת תפריט
function scrollWithOffsetToAnchor(event) {
  const href = event.currentTarget.getAttribute('href');
  if (!href.startsWith('#')) return;

  const id = href.substring(1); // מסיר את ה-#
  const target = document.getElementById(id);
  if (!target) return;

  event.preventDefault();

  const offset = 100; // גובה ה-header שלך
  const y = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: y,
    behavior: 'smooth'
  });

  // סגירת תפריט נפתח במובייל
  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

// קריאה ראשונית בטעינת הדף והוספת מאזיני אירועים לקישורים בתפריט
document.addEventListener('DOMContentLoaded', () => {
  updateLanguage(currentLang); // זה כבר מעדכן את dir="..." על ה-HTML

  // הוסף את כיוון השפה ישר גם ל-body!
  document.body.classList.add(currentLang === 'he' ? 'rtl' : 'ltr');

  // חיבור לכל קישורי העוגן שבתפריט
  const navLinks = document.querySelectorAll('#menu a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', scrollWithOffsetToAnchor);
  });
});
  const music = document.getElementById("bg-music");
  const button = document.getElementById("play-music-btn");

  button.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      button.textContent = "⏸";
    } else {
      music.pause();
      button.textContent = "⏯";
    }
  });
// מעקב אחרי גלילה - כדי להזיז את הלוגו לפינה
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const htmlDir = document.documentElement.getAttribute("dir"); // 'rtl' או 'ltr'

  if (scrollTop > 50) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }

  // עדכון class לפי כיוון השפה
  document.body.classList.remove('rtl', 'ltr');
  document.body.classList.add(htmlDir === 'rtl' ? 'rtl' : 'ltr');
   if (button) {
      if (scrollTop > 20) {
        button.style.opacity = '0';
        button.style.visibility = 'hidden';
        button.style.pointerEvents = 'none';
      } else {
        button.style.opacity = '1';
        button.style.visibility = 'visible';
        button.style.pointerEvents = 'auto';
      }
    }
});

