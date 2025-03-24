import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");

if (!loader) {
  console.error("Error: '.loader' element not found!");
}

let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function showLoader(underButton = false) {
  if (!loader) return;

  if (underButton) {
    loader.classList.add("loader--under-button");
  } else {
    loader.classList.remove("loader--under-button");
  }

  loader.style.display = "block";
}

export function hideLoader() {
  if (!loader) return;
  loader.style.display = "none";
}

export function clearGallery() {
  gallery.innerHTML = "";
}

export function renderImages(images) {
  if (!images || images.length === 0) {
    iziToast.error({
      message: "Sorry, there are no images matching your search query. Please try again!",
      position: "topRight",
    });
    return;
  }

  const markup = images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      const truncatedTags = tags.split(", ").slice(0, 3).join(", ");

      return `
        <li class="gallery-item">
          <a href="${largeImageURL}" class="gallery-link" data-caption="${truncatedTags}">
            <img src="${webformatURL}" alt="${truncatedTags}" loading="lazy" class="gallery-image">
          </a>
          <div class="info">
            <p><b>Likes</b> ${likes}</p>
            <p><b>Views</b> ${views}</p>
            <p><b>Comments</b> ${comments}</p>
            <p><b>Downloads</b> ${downloads}</p>
          </div>
        </li>`;
    })
    .join("");

  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}
