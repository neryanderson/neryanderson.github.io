const galleryButtons = document.querySelectorAll("[data-gallery]");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox?.querySelector("img");
const closeButton = document.querySelector(".lightbox-close");
const bookingForm = document.querySelector(".booking-form");
const contactEmail = "info@casacunera.nl";

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");

    if (!lightbox || !lightboxImage || !image) {
      return;
    }

    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightbox.showModal();
  });
});

closeButton?.addEventListener("click", () => {
  lightbox?.close();
});

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const arrival = formData.get("arrival") || "gewenste aankomstdatum";
  const departure = formData.get("departure") || "gewenste vertrekdatum";
  const guests = formData.get("guests") || "aantal gasten";
  const subject = encodeURIComponent("Beschikbaarheid Casa Cunera");
  const body = encodeURIComponent(
    `Hallo Nery,\n\nIk wil graag de beschikbaarheid van Casa Cunera aanvragen.\n\nAankomst: ${arrival}\nVertrek: ${departure}\nGasten: ${guests}\n\nMet vriendelijke groet,`
  );

  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
});
