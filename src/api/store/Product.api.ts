import StoreInstance from "./Store.Instance";

let page = 1;
const postsPerPage = 4;

export const fetchProducts = async () => {
  const skip = (page - 1) * postsPerPage;

  const response = await StoreInstance.get(`/products?offset=${skip}&limit=${postsPerPage}`);
  return response.data;
};