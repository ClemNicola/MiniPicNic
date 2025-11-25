const BASE_URL = "https://fakestoreapi.com/products";
const GIPHY_API_KEY = "BluxFAOfAHEf9xg0PdiHD1fqlEAEdlSu";

export const api = {
  getProducts: async () => {
    const response = await fetch(`${BASE_URL}`);
    const data = await response.json();
    return data;
  },

  getProductById: async (id: string) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();
    return data;
  },

  getProductsByCategory: async (category: string) => {
    const response = await fetch(`${BASE_URL}/category/${category}`);
    const data = await response.json();
    return data;
  },

  getRandomGif: async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&rating=g`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  getGifsBySearch: async (search: string, limit: number) => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${search}&limit=${limit}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};
