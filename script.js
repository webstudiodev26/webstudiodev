const themeButton = document.querySelector('.theme-button');
const languageButton = document.querySelector('.language-switcher');
const root = document.documentElement;

const translations = {
  sr: {
    navLabel: 'Glavna navigacija', languageLabel: 'Izaberi jezik', themeLabel: 'Prebaci na svetlu temu', navHome: 'Početna', navWork: 'Radovi', navAbout: 'O nama', contact: 'Kontakt', headlineFirst: 'Web sajtovi koji donose', headlineSecond: 'rezultate', heroCopy: 'Dizajniramo i razvijamo sajtove, od prve skice do lansiranja i dugoročnog održavanja.', startProject: 'Pokreni projekat', servicesLabel: 'Usluge', domain: 'Domena', webDesign: 'Web dizajn', webDevelopment: 'Izrada sajtova', uiDesign: 'UI/UX dizajn', promoPosts: 'Promo objave', domainRegistration: 'Registracija domena', belowEyebrow: 'OD IDEJE DO EKRANA', belowTitle: 'Digitalno prisustvo koje radi za vas.'
  },
  en: {
    navLabel: 'Main navigation', languageLabel: 'Choose language', themeLabel: 'Switch to dark theme', navHome: 'Home', navWork: 'Work', navAbout: 'About us', contact: 'Contact', headlineFirst: 'Websites that bring', headlineSecond: 'results', heroCopy: 'We design and develop websites, from the first sketch to launch and long-term support.', startProject: 'Start a project', servicesLabel: 'Services', domain: 'Domain', webDesign: 'Web design', webDevelopment: 'Web development', uiDesign: 'UI/UX design', promoPosts: 'Promo posts', domainRegistration: 'Domain registration', belowEyebrow: 'FROM IDEA TO SCREEN', belowTitle: 'A digital presence that works for you.'
  }
};

function setLanguage(language) {
  const copy = translations[language];
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = copy[element.dataset.i18n];
  });
  document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
    element.dataset.i18nAttr.split(',').forEach((attribute) => {
      const [name, key] = attribute.split(':');
      element.setAttribute(name, copy[key]);
    });
  });
  languageButton.querySelector('span').textContent = language.toUpperCase();
  root.lang = language;
  document.title = language === 'sr' ? 'Webstudio.dev | Web sajtovi koji donose rezultate' : 'Webstudio.dev | Websites that bring results';
  localStorage.setItem('webstudio-language', language);
}

function setTheme(isLight) {
  document.body.classList.toggle('light-mode', isLight);
  themeButton.querySelector('span').textContent = isLight ? '☾' : '☼';
  themeButton.setAttribute('aria-pressed', String(isLight));
  themeButton.setAttribute('aria-label', translations[root.lang].themeLabel);
  localStorage.setItem('webstudio-theme', isLight ? 'light' : 'dark');
}

setLanguage(localStorage.getItem('webstudio-language') || 'sr');
setTheme(localStorage.getItem('webstudio-theme') === 'light');

if (themeButton) {
  themeButton.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('light-mode'));
  });
}

if (languageButton) {
  languageButton.addEventListener('click', () => {
    setLanguage(root.lang === 'sr' ? 'en' : 'sr');
  });
}
