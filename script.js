const siteConfig = {
  name: 'Dr. Roberto Daniel García',
  shortName: 'Dr. Roberto D. García',
  profession: 'Abogado',
  location: 'Bovril, Entre Ríos, Argentina',
  address: 'Doctor Miguel Tomé 251, Bovril, Entre Ríos, Argentina',
  phoneDisplay: '3438 451920',
  phoneInternational: '5493438451920',
  whatsappMessage: 'Hola, Dr. García. Quisiera realizar una consulta.',
  instagramHandle: 'garciarobertoabogado',
  email: 'garciarobertoabogado@gmail.com',
  registration: 'Matrícula N.º 11233, F.º 4, T.º II',
  college: 'Colegio de Abogados de Entre Ríos',
  siteUrl: '',
};

const whatsappUrl = `https://wa.me/${siteConfig.phoneInternational}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;
const instagramUrl = `https://www.instagram.com/${siteConfig.instagramHandle}/`;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`;

document.querySelectorAll('[data-whatsapp]').forEach((link) => { link.href = whatsappUrl; link.target = '_blank'; link.rel = 'noopener'; });
document.querySelectorAll('[data-instagram]').forEach((link) => { link.href = instagramUrl; link.target = '_blank'; link.rel = 'noopener'; });
document.querySelectorAll('[data-email]').forEach((link) => { link.href = `mailto:${siteConfig.email}`; });
document.querySelectorAll('[data-maps]').forEach((link) => { link.href = mapsUrl; link.target = '_blank'; link.rel = 'noopener'; });

document.querySelectorAll('[data-contact="displayPhone"]').forEach((element) => { element.textContent = siteConfig.phoneDisplay; });
document.querySelectorAll('[data-contact="email"]').forEach((element) => { element.textContent = siteConfig.email; });
document.querySelectorAll('[data-contact="instagram"]').forEach((element) => { element.textContent = `@${siteConfig.instagramHandle}`; });
document.querySelectorAll('[data-contact="address"]').forEach((element) => { element.innerHTML = 'Doctor Miguel Tomé 251<br>Bovril, Entre Ríos'; });
document.querySelector('[data-current-year]').textContent = new Date().getFullYear();

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');

function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('.sr-only').textContent = 'Abrir menú';
}

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.querySelector('.sr-only').textContent = isOpen ? 'Cerrar menú' : 'Abrir menú';
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
window.matchMedia('(min-width: 821px)').addEventListener('change', (event) => {
  if (event.matches) closeMenu();
});

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: siteConfig.name,
  description: 'Asesoramiento legal personalizado en Bovril y toda la provincia de Entre Ríos.',
  areaServed: 'Entre Ríos, Argentina',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Doctor Miguel Tomé 251',
    addressLocality: 'Bovril',
    addressRegion: 'Entre Ríos',
    addressCountry: 'AR',
  },
  telephone: `+${siteConfig.phoneInternational}`,
  email: siteConfig.email,
  sameAs: [instagramUrl],
};
if (siteConfig.siteUrl) structuredData.url = siteConfig.siteUrl;
document.querySelector('#legal-service-schema').textContent = JSON.stringify(structuredData);
