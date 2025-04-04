const langButton = document.getElementById('current-lang');
const langOptions = document.getElementById('lang-options');
const langElements = document.querySelectorAll('[data-lang]');

const carousels = document.querySelectorAll(".carousel");

// Function to calculate translateZ based on screen size
const getTranslateZ = () => {
  if (window.innerWidth <= 480) return 40;
  if (window.innerWidth <= 639) return 50;
  if (window.innerWidth <= 768) return 70;
  return 130// Default for larger screens
};

// Apply rotation and translateZ dynamically to all carousels
const applyCarouselStyles = () => {
  const translateZ = getTranslateZ();
  carousels.forEach((carousel) => {
    const items = carousel.querySelectorAll(".carousel-item");
    const totalItems = items.length;
    const angleStep = 360 / totalItems;

    items.forEach((item, index) => {
      const rotateAngle = index * angleStep;
      item.style.setProperty("--rotate-angle", rotateAngle);
      item.style.transform = `rotateY(${rotateAngle}deg) translateZ(${translateZ}px)`;
    });
  });
};

// Initial application of styles
applyCarouselStyles();

// Reapply styles on window resize
window.addEventListener("resize", applyCarouselStyles);

// Toggle language options
langButton.addEventListener('click', () => {
  langOptions.style.display = langOptions.style.display === 'block' ? 'none' : 'block';
});

// Update language
langOptions.addEventListener('click', (e) => {
  const selectedOption = e.target.closest('li');
  if (!selectedOption) return;

  const lang = selectedOption.dataset.lang;
  const icon = selectedOption.dataset.icon;
  if (icon === 'icons/spanish.webp') {
    langButton.innerHTML = `<img src="icons/english.webp" alt="Inglés" class="lang-icon"> ${lang === 'en' ? 'English' : 'English'}`;
  } else {
    langButton.innerHTML = `<img src="icons/spanish.webp" alt="Español" class="lang-icon"> ${lang === 'en' ? 'Español' : 'Español'}`;
  }

  // Hide options
  langOptions.style.display = 'none';

  // Update content
  langElements.forEach((el) => {
    el.style.display = el.dataset.lang === lang ? 'none' : '';
  });
});

function sendEmail() {
  const templateParams = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  if (!templateParams.name || !templateParams.email || !templateParams.subject || !templateParams.message) {
    alert("Please fill all fields. | Por favor, complete todos los campos.");
    return;
  }

  emailjs
    .send('service_pu9624g', 'template_oykenlq', templateParams)
    .then(() => alert("Email sent successfully! | El correo electrónico se envió con éxito!"));
}

function scrollFunction() {
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
}