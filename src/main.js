import { fetchImages } from "./js/pixabay-api.js";
import { renderImages, clearGallery, showLoader, hideLoader } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = document.querySelector("input[name='search-text']");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      message: "Please enter a search query!",
      position: "topRight",
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const images = await fetchImages(query);

    if (!images || images.length === 0) {
      iziToast.error({
        message: "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
      });
      return;
    }

    renderImages(images);
  } catch (error) {
    iziToast.error({
      message: "Something went wrong. Please try again later.",
      position: "topRight",
    });
    console.error("Fetch error:", error);
  } finally {
    hideLoader();
    input.value = "";
  }
});
