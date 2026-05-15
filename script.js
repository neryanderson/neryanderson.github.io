const assetPath = "assets/casa-cunera/";
const galleryImages = [
  "Casa Cunera (1) Zwembad & terras.jpg",
  "Casa Cunera (2) Zwembad & terras.jpg",
  "Casa Cunera (3) Zwembad & terras.jpg",
  "Casa Cunera (4) zwembad & terras.jpg",
  "Casa Cunera (5) Zwembad + huis.jpg",
  "Casa Cunera (6b) Terras uitzicht op huis.jpg",
  "Casa Cunera (6c) Terras uitzicht op zee.jpeg",
  "Casa Cunera (7) voordeur boven.jpg",
  "Casa Cunera (8) tafel in serre.jpg",
  "Casa Cunera (9) tafel serre met wijn.jpg",
  "Casa Cunera (10) uitzicht serre.jpg",
  "Casa Cunera (11) woonkamer.jpeg",
  "Casa Cunera (12) woonkamer.jpeg",
  "Casa Cunera (13) woonkamer.jpeg",
  "Casa Cunera (14) pelletkachel.jpeg",
  "Casa Cunera (15) woonkamer.jpeg",
  "Casa Cunera (17) slaapkamer 1.jpeg",
  "Casa Cunera (18) slaapkamer 2.jpg",
  "Casa Cunera (20) keuken.jpeg",
  "Casa Cunera (21) keuken.jpeg",
  "Casa Cunera (23 )keuken.jpeg",
  "Casa Cunera (24) keuken.jpeg",
  "Casa Cunera (25) keuken.jpeg",
  "Casa Cunera (30) badkamer beneden.jpg",
  "Casa Cunera (32) slaapkamer 4.jpeg",
  "Casa Cunera (33) keuken beneden.jpg",
  "Casa Cunera (34) Slaapkamer 3.jpg",
  "Casa Cunera (35) slaapkamer 3.jpg",
  "Casa Cunera (36) woonkamer beneden.jpeg",
  "Casa Cunera (37) woonkamer beneden.jpeg",
  "Casa Cunera (38) woonkamer beneden.jpeg",
  "Casa Cunera (39) woonkamer beneden.jpeg",
  "Casa Cunera (40) zonsopgang verticaal.jpg",
  "Casa Cunera (41)  straatkant.jpg",
  "Casa Cunera (42) oprit.jpeg",
  "Casa Cunera (43) oprit.jpeg",
  "Casa Cunera (44) uitzicht.jpg",
  "Casa Cunera (45) zonsopgang.jpeg",
  "Casa Cunera (45) Zwembad nieuw .jpg",
  "Casa Cunera (46) Uitzicht zwembad.jpg",
  "Casa Cunera (47) Zonsopgang met letters Casa Cunera.jpg",
  "Casa Cunera (48) uitzicht.jpg",
  "Casa Cunera (49) Terrastuin boven zwembad.jpg",
];

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox?.querySelector("img");
const closeButton = document.querySelector(".lightbox-close");
const bookingForm = document.querySelector(".booking-form");
const photoGallery = document.querySelector("[data-photo-gallery]");
const contactEmail = "info@casacunera.nl";
let activeGalleryIndex = 0;

const getImageSrc = (filename) => `${assetPath}${encodeURIComponent(filename)}`;

const getImageAlt = (filename) =>
  filename
    .replace(/\.[^.]+$/, "")
    .replace(/\s+/g, " ")
    .trim();

photoGallery?.replaceChildren(
  ...galleryImages.map((filename, index) => {
    const button = document.createElement("button");
    const image = document.createElement("img");

    button.type = "button";
    button.dataset.gallery = String(index);
    button.setAttribute("aria-label", `Open foto ${index + 1} van Casa Cunera`);

    image.src = getImageSrc(filename);
    image.alt = getImageAlt(filename);
    image.loading = "lazy";

    button.append(image);
    return button;
  })
);

const openGalleryImage = (index) => {
  if (!lightbox || !lightboxImage || !galleryImages.length) {
    return;
  }

  activeGalleryIndex = (index + galleryImages.length) % galleryImages.length;
  const filename = galleryImages[activeGalleryIndex];
  lightboxImage.src = getImageSrc(filename);
  lightboxImage.alt = getImageAlt(filename);

  if (!lightbox.open) {
    lightbox.showModal();
  }
};

const moveGallery = (step) => {
  if (!lightbox?.open) {
    return;
  }

  openGalleryImage(activeGalleryIndex + step);
};

document.querySelectorAll("[data-gallery]").forEach((button) => {
  button.addEventListener("click", () => {
    openGalleryImage(Number(button.dataset.gallery || 0));
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

document.addEventListener("keydown", (event) => {
  if (!lightbox?.open) {
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    moveGallery(1);
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveGallery(-1);
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
