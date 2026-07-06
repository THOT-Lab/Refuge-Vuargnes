const photos = [
  ["assets/images/photo-11.jpg", "Façade du chalet dans les fleurs de montagne"],
  ["assets/images/photo-20.jpg", "Le chalet et son grand terrain"],
  ["assets/images/photo-03.jpg", "Vue dégagée sur les reliefs"],
  ["assets/images/photo-30.jpg", "Salon chaleureux avec poutres apparentes"],
  ["assets/images/photo-31.jpg", "Salle à manger pour les repas de groupe"],
  ["assets/images/photo-15.jpg", "Panorama depuis le hameau"],
  ["assets/images/photo-04.jpg", "Façade au soleil couchant"],
  ["assets/images/photo-14.jpg", "Cuisine équipée"],
  ["assets/images/photo-28.jpg", "Salle de bain rénovée avec douche"],
  ["assets/images/photo-18.jpg", "Chambre double"],
  ["assets/images/photo-19.jpg", "Chambre partagée"],
  ["assets/images/photo-24.jpg", "Chambre avec deux lits simples"],
  ["assets/images/photo-22.jpg", "Chambre lumineuse"],
  ["assets/images/photo-23.jpg", "Vue au crépuscule"],
  ["assets/images/photo-10.jpg", "Espace cuisine et rangement"],
  ["assets/images/photo-01.jpg", "Entrée du chalet"],
  ["assets/images/photo-02.jpg", "Chambre avec lit simple"],
  ["assets/images/photo-05.jpg", "Arbre et vue de montagne"],
  ["assets/images/photo-06.jpg", "Rangements de cuisine"],
  ["assets/images/photo-07.jpg", "Salle de bain"],
  ["assets/images/photo-08.jpg", "Façade côté parking"],
  ["assets/images/photo-09.jpg", "Façade principale"],
  ["assets/images/photo-12.jpg", "Porte-fenêtre vers l'extérieur"],
  ["assets/images/photo-13.jpg", "Lit simple dans une chambre"],
  ["assets/images/photo-16.jpg", "Chambre au parquet bois"],
  ["assets/images/photo-17.jpg", "Vue le long du chalet"],
  ["assets/images/photo-21.jpg", "Chambre avec lit double"],
  ["assets/images/photo-25.jpg", "Vue intérieure et couloir"],
  ["assets/images/photo-26.jpg", "Salle d'eau avec douche"],
  ["assets/images/photo-27.jpg", "Passage entre les chambres"],
  ["assets/images/photo-29.jpg", "Salle de bain lumineuse"]
];

const gallery = document.querySelector("[data-gallery]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-img]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const closeButton = document.querySelector("[data-close]");

function resetScrollOnFreshVisit() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
}

function renderGallery() {
  const fragment = document.createDocumentFragment();

  photos.forEach(([src, caption], index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Agrandir la photo: ${caption}`);

    const image = document.createElement("img");
    image.src = src;
    image.alt = caption;
    image.loading = index < 6 ? "eager" : "lazy";

    button.appendChild(image);
    button.addEventListener("click", () => openLightbox(src, caption));
    fragment.appendChild(button);
  });

  gallery.appendChild(fragment);
}

function openLightbox(src, caption) {
  lightboxImage.src = src;
  lightboxImage.alt = caption;
  lightboxCaption.textContent = caption;
  lightbox.showModal();
}

function closeLightbox() {
  lightbox.close();
  lightboxImage.src = "";
}

resetScrollOnFreshVisit();
renderGallery();

window.addEventListener("pageshow", resetScrollOnFreshVisit);
closeButton.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.open) {
    closeLightbox();
  }
});
