const themeButton = document.querySelector('.theme-button');
const languageButton = document.querySelector('.language-switcher');
const root = document.documentElement;
const serviceItems = document.querySelectorAll('.service-item');
const serviceImage = document.querySelector('.service-image');
const revealSection = document.querySelector('.reveal-section');
const revealSticky = document.querySelector('.reveal-sticky');
const revealCards = document.querySelectorAll('.reveal-card');
const revealCopy = document.querySelector('.reveal-copy');
const revealScrim = document.querySelector('.reveal-scrim');
const contactForm = document.querySelector('#contact-form');
const serviceImages = [
  'web-dizajn-koda.png',
  'izrada-sajta.png',
  'ui-ux-photo.png',
  '5d9df304-896d-4976-973d-c39ada73743b.png',
  'ac8e5c94-06a0-4ea1-9934-2a1acd48bf3e.png'
];

function activateService(index) {
  serviceItems.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === index));
  if (serviceImage && serviceImage.src.endsWith(serviceImages[index])) return;
  if (serviceImage) {
    serviceImage.classList.remove('is-visible');
    window.setTimeout(() => {
      serviceImage.src = serviceImages[index];
      serviceImage.alt = serviceItems[index].querySelector('h3').textContent;
      serviceImage.classList.add('is-visible');
    }, 160);
  }
}

if (serviceItems.length && serviceImage && 'IntersectionObserver' in window) {
  activateService(0);
  const serviceObserver = new IntersectionObserver((entries) => {
    const visibleEntries = entries.filter((entry) => entry.isIntersecting);
    if (!visibleEntries.length) return;
    const closestEntry = visibleEntries.sort((first, second) => {
      const viewportCenter = window.innerHeight / 2;
      const firstDistance = Math.abs(first.boundingClientRect.top + first.boundingClientRect.height / 2 - viewportCenter);
      const secondDistance = Math.abs(second.boundingClientRect.top + second.boundingClientRect.height / 2 - viewportCenter);
      return firstDistance - secondDistance;
    })[0];
    activateService(Number(closestEntry.target.dataset.service));
  }, { threshold: 0.45, rootMargin: '-18% 0px -42% 0px' });
  serviceItems.forEach((item) => serviceObserver.observe(item));
}

const revealMotionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let revealTicking = false;

function updateReveal() {
  revealTicking = false;
  if (!revealSection || !revealSticky || revealMotionReduced) return;
  const sectionRect = revealSection.getBoundingClientRect();
  const progress = Math.min(Math.max((window.innerHeight - sectionRect.top) / (window.innerHeight * 0.8), 0), 1);
  const copyProgress = Math.min(Math.max((progress - 0.96) / 0.04, 0), 1);
  const cardWidth = revealCards[0]?.getBoundingClientRect().width || 260;
  const centerLeft = (window.innerWidth - cardWidth) / 2;
  const initialStep = cardWidth + 14;
  const initialOffsets = [-2, -1, 0, 1, 2].map((position) => position * initialStep);
  const leftPeekDelta = -cardWidth + 100 - centerLeft;
  const rightPeekDelta = window.innerWidth - 100 - centerLeft;

  revealCards.forEach((card, index) => {
    const translateX = index === 0 ? initialOffsets[index] + (leftPeekDelta - initialOffsets[index]) * progress : index === 4 ? initialOffsets[index] + (rightPeekDelta - initialOffsets[index]) * progress : initialOffsets[index];
    const rotation = index === 0 ? -8 * progress : index === 4 ? 8 * progress : 0;
    const middleProgress = Math.min(Math.max((progress - 0.75) / 0.25, 0), 1);
    const scale = index === 0 ? 1 + 0.05 * progress : index === 4 ? 1 + 0.15 * progress : 1 - 0.2 * middleProgress;
    const opacity = index === 0 || index === 4 ? 1 : 1 - middleProgress;
    card.style.transform = `translate3d(calc(-50% + ${translateX}px), -50%, 0) rotate(${rotation}deg) scale(${scale})`;
    card.style.opacity = opacity;
  });
  revealCopy.style.opacity = copyProgress;
  revealCopy.style.transform = `translate3d(-50%, ${18 - copyProgress * 18}px, 0)`;
  revealScrim.style.opacity = copyProgress;
}

function requestRevealUpdate() {
  if (!revealTicking) {
    revealTicking = true;
    window.requestAnimationFrame(updateReveal);
  }
}

if (revealSection && !revealMotionReduced) {
  window.addEventListener('scroll', requestRevealUpdate, { passive: true });
  window.addEventListener('resize', requestRevealUpdate);
  updateReveal();
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const subject = encodeURIComponent(`Novi projekat - ${formData.get('name')}`);
    const body = encodeURIComponent(`Email: ${formData.get('email')}\n\nO projektu:\n${formData.get('project')}`);
    window.location.href = `mailto:webstudiodev26@gmail.com?subject=${subject}&body=${body}`;
  });
}

const translations = {
  sr: {
    navLabel: 'Glavna navigacija', languageLabel: 'Izaberi jezik', themeLabel: 'Prebaci na svetlu temu', navHome: 'Početna', navWork: 'Radovi', navAbout: 'O nama', contact: 'Kontakt', headlineFirst: 'Web sajtovi koji donose', headlineSecond: 'rezultate', heroCopy: 'Dizajniramo i razvijamo sajtove, od prve skice do lansiranja i dugoročnog održavanja.', startProject: 'Pokreni projekat', servicesLabel: 'Usluge', domain: 'Domena', webDesign: 'Web dizajn', webDevelopment: 'Izrada sajtova', uiDesign: 'UI/UX dizajn', promoPosts: 'Promo objave', domainRegistration: 'Registracija domena', belowEyebrow: 'OD IDEJE DO EKRANA', belowTitle: 'Radovi', viewSite: 'Pogledaj sajt ↗', aboutLabel: 'O nama', aboutTitle: 'O nama', aboutLead: 'Webstudio.dev je tim za dizajn i razvoj sajtova. Radimo direktno sa vlasnicima, bez posrednika.', aboutCopy: 'Svaki projekat pratimo od prve prijave do lansiranja, tako da uvek imate jasnu tačku kontakta.', approachTitle: 'Kako pristupamo poslu', approachOneTitle: 'Razgovor', approachOneCopy: 'Prvo saslušamo šta vam treba i kako radite. Predlog dolazi tek posle toga.', approachTwoTitle: 'Fiksna cena i rok', approachTwoCopy: 'Dobijate jednu konačnu cenu i jasan datum isporuke, unapred, bez naplate po satu i bez skrivenih troškova kasnije.', approachThreeTitle: 'Bez šablona', approachThreeCopy: 'Ne kupujemo gotove teme. Dizajn nastaje na osnovu vašeg sadržaja i posla koji radite.', approachFourTitle: 'Sajt ostaje vaš', approachFourCopy: 'Domen, hosting i pristupi su na vaše ime. Možete otići kod bilo koga i nastaviti.', projectsLabel: 'Projekti', servicesTitle: 'Usluge', servicesSubtitle: 'Usluge kojima se bavimo, u kratkim crtama.', serviceOneTitle: 'Web dizajn', serviceOneCopy: 'Struktura stranica, tekstovi i vizuelni predlog pre nego što se napiše prva linija koda.', serviceOneTagOne: 'Istraživanje i struktura', serviceOneTagTwo: 'Vizuelni dizajn', serviceOneTagThree: 'Prototip za klik', serviceOneTagFour: 'Dizajn sistema', serviceTwoTitle: 'Izrada sajtova', serviceTwoCopy: 'Brz sajt prilagođen telefonu, koji možete sami da ažurirate, uz mesečno održavanje.', serviceTwoTagOne: 'Samostalan kod', serviceTwoTagTwo: 'Prilagođeno telefonima', serviceTwoTagThree: 'Bezbednosna ažuriranja', serviceThreeTitle: 'UI/UX dizajn', serviceThreeCopy: 'Dizajn korisničkog interfejsa i iskustva za sajtove i aplikacije, sa fokusom na jasnoću i konverziju.', serviceThreeTagOne: 'Wireframes', serviceThreeTagTwo: 'Interaktivni prototip', serviceThreeTagThree: 'Testiranje korisničkog iskustva', serviceFourTitle: 'Promo objave', serviceFourCopy: 'Dizajn objava za društvene mreže usklađen sa vizuelnim identitetom sajta.', serviceFourTagOne: 'Objave za Instagram i Facebook', serviceFourTagTwo: 'Objave za story', serviceFourTagThree: 'Vizuelni identitet', serviceFiveTitle: 'Registracija domena', serviceFiveCopy: 'Pomažemo u izboru i registraciji domena, i povezivanju sa hostingom.', serviceFiveTagOne: 'Provera dostupnosti', serviceFiveTagTwo: 'Registracija', serviceFiveTagThree: 'Povezivanje sa hostingom'
  },
  en: {
    navLabel: 'Main navigation', languageLabel: 'Choose language', themeLabel: 'Switch to dark theme', navHome: 'Home', navWork: 'Work', navAbout: 'About us', contact: 'Contact', headlineFirst: 'Websites that bring', headlineSecond: 'results', heroCopy: 'We design and develop websites, from the first sketch to launch and long-term support.', startProject: 'Start a project', servicesLabel: 'Services', domain: 'Domain', webDesign: 'Web design', webDevelopment: 'Web development', uiDesign: 'UI/UX design', promoPosts: 'Promo posts', domainRegistration: 'Domain registration', belowEyebrow: 'FROM IDEA TO SCREEN', belowTitle: 'Work', viewSite: 'View site ↗', aboutLabel: 'About us', aboutTitle: 'About us', aboutLead: 'Webstudio.dev is a web design and development team. We work directly with owners, without middlemen.', aboutCopy: 'We follow every project from the first inquiry to launch, so you always have a clear point of contact.', approachTitle: 'How we work', approachOneTitle: 'Conversation', approachOneCopy: 'First we listen to what you need and how you work. The proposal comes after that.', approachTwoTitle: 'Fixed price and deadline', approachTwoCopy: 'You get one final price and a clear delivery date upfront, with no hourly billing or hidden costs later.', approachThreeTitle: 'No templates', approachThreeCopy: 'We do not buy ready-made themes. The design grows from your content and the work you do.', approachFourTitle: 'The site stays yours', approachFourCopy: 'The domain, hosting and access are in your name. You can go to anyone you choose.', projectsLabel: 'Projects', servicesTitle: 'Services', servicesSubtitle: 'Services we provide, in brief.', serviceOneTitle: 'Web design', serviceOneCopy: 'Page structure, copy and visual direction before the first line of code is written.', serviceOneTagOne: 'Research and structure', serviceOneTagTwo: 'Visual design', serviceOneTagThree: 'Clickable prototype', serviceOneTagFour: 'Design system', serviceTwoTitle: 'Website development', serviceTwoCopy: 'A fast, mobile-ready website you can update yourself, with ongoing maintenance.', serviceTwoTagOne: 'Independent code', serviceTwoTagTwo: 'Mobile-ready', serviceTwoTagThree: 'Security updates', serviceThreeTitle: 'UI/UX design', serviceThreeCopy: 'Interface and experience design for websites and apps, focused on clarity and conversion.', serviceThreeTagOne: 'Wireframes', serviceThreeTagTwo: 'Interactive prototype', serviceThreeTagThree: 'User experience testing', serviceFourTitle: 'Promo posts', serviceFourCopy: 'Social media post design aligned with your website visual identity.', serviceFourTagOne: 'Instagram and Facebook posts', serviceFourTagTwo: 'Story posts', serviceFourTagThree: 'Visual identity', serviceFiveTitle: 'Domain registration', serviceFiveCopy: 'We help choose and register a domain, then connect it to hosting.', serviceFiveTagOne: 'Availability check', serviceFiveTagTwo: 'Registration', serviceFiveTagThree: 'Hosting connection'
  }
};

Object.assign(translations.sr, {
  ctaLabel: 'Poziv na akciju', ctaTitle: 'Imate projekat?', ctaText: 'Kratak opis projekta je dovoljan da procenimo obim, cenu i rok.', ctaButton: 'Zatraži ponudu', footerDescription: 'Dizajn i izrada sajtova', footerNavLabel: 'Footer navigacija',
  revealLabel: 'Projekti', revealEyebrow: 'WEBSTUDIO.DEV', revealTitlePrefix: 'Prvi utisak traje tri sekunde. Pobrinite se da vaš sajt ostavi ', revealTitleAccent: 'pravi.', revealText: 'Od prve skice do iskustva koje ljudi pamte.', revealPrimary: 'Pokreni projekat', revealSecondary: 'Radovi', testimonialsLabel: 'Šta kažu klijenti', testimonialsTitle: 'Šta kažu klijenti', testimonialOneText: 'Sajt izgleda profesionalno i radi besprekorno. Broj upita za projekte je porastao bez ikakvog dodatnog oglašavanja.', testimonialOneAuthor: 'Marija Stanković', testimonialTwoText: 'Rok su ispunili do dana. Komunikacija je bila jasna, bez tehničkog žargona.', testimonialTwoAuthor: 'Dušan Ilić', testimonialThreeText: 'Sajt radi osam meseci bez jednog ozbiljnog problema. Podrška odgovori istog dana.', testimonialThreeAuthor: 'Ivana Perić', contactLabel: 'Kontakt', contactTitle: 'Kontakt', contactLead: 'Napišite par redova o tome šta vam treba. Odgovaramo u roku od jednog radnog dana.', contactEmailLabel: 'EMAIL', contactNameLabel: 'IME I PREZIME', contactEmailFieldLabel: 'EMAIL', contactProjectLabel: 'O PROJEKTU', contactPrivacy: 'Slažem se sa obradom mojih ličnih podataka u skladu sa Politikom privatnosti', contactSubmit: 'Pošalji poruku'
});
Object.assign(translations.en, {
  ctaLabel: 'Call to action', ctaTitle: 'Have a project?', ctaText: 'A short project brief is enough for us to estimate scope, price and timing.', ctaButton: 'Request a quote', footerDescription: 'Web design and development', footerNavLabel: 'Footer navigation',
  revealLabel: 'Projects', revealEyebrow: 'WEBSTUDIO.DEV', revealTitlePrefix: 'First impressions last three seconds. Make sure your website leaves a ', revealTitleAccent: 'great one.', revealText: 'From the first sketch to experiences people remember.', revealPrimary: 'Start a project', revealSecondary: 'Work', testimonialsLabel: 'What clients say', testimonialsTitle: 'What clients say', testimonialOneText: 'The website looks professional and works flawlessly. Project inquiries grew without any additional advertising.', testimonialOneAuthor: 'Marija Stanković', testimonialTwoText: 'They delivered on time. Communication was clear, without technical jargon.', testimonialTwoAuthor: 'Dušan Ilić', testimonialThreeText: 'The website has run for eight months without a serious issue. Support responds the same day.', testimonialThreeAuthor: 'Ivana Perić', contactLabel: 'Contact', contactTitle: 'Contact', contactLead: 'Write a few lines about what you need. We reply within one business day.', contactEmailLabel: 'EMAIL', contactNameLabel: 'FULL NAME', contactEmailFieldLabel: 'EMAIL', contactProjectLabel: 'ABOUT THE PROJECT', contactPrivacy: 'I agree to the processing of my personal data according to the Privacy Policy', contactSubmit: 'Send message'
});

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
