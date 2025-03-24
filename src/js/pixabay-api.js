import axios from "axios";

const API_KEY = "49355132-77de24cc11258b0936a6d4f49";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page: perPage,
      },
    });

    return {
      images: response.data.hits,
      total: response.data.totalHits,
    };
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}
