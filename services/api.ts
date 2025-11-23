const BASE_URL = "https://fakestoreapi.com/products";

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

  getProductByCategory: async (category: string) => {
    const response = await fetch(`${BASE_URL}/category/${category}`);
    const data = await response.json();
    return data;
  },
};
