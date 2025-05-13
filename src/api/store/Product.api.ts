// Product.api.ts
import StoreInstance from "./Store.Instance";

const postsPerPage = 4;

export const fetchProducts = async ({ pageParam = 1 }) => {
  const skip = (pageParam - 1) * postsPerPage;

  const response = await StoreInstance.get(
    `/products?offset=${skip}&limit=${postsPerPage}`
  );

  return {
    products: response.data,
    nextPage: response.data.length < postsPerPage ? undefined : pageParam + 1,
  };
};