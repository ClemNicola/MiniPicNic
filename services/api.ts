const BASE_URL = "https://fakestoreapi.com/products";
const GIPHY_API_KEY = "BluxFAOfAHEf9xg0PdiHD1fqlEAEdlSu";
const GIPHY_BASE_URL = "https://api.giphy.com/v1/gifs";

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

  get: async <T>(endpoint: string, params: Record<string, any>): Promise<T> => {
    try {
      const queryParams = new URLSearchParams({
        api_key: GIPHY_API_KEY,
        ...params,
      }).toString();

      const response = await fetch(
        `${GIPHY_BASE_URL}/${endpoint}?${queryParams}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
