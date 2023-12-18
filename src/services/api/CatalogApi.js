import axios from "axios";

/**
 * Retrieves catalogs from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of catalogs.
 */
export const getCatalogs = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/catalog`
  );
  return data;
};

/**
 * Retrieves the catalog categories for a given catalog ID.
 *
 * @param {string} catalogId - The ID of the catalog.
 * @returns {Promise<any>} - A promise that resolves to the catalog categories data.
 */
export const getCatalogCategories = async (catalogId) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/catalog/categories/${catalogId}`
  );
  return data;
};

/**
 * Retrieves items from the catalog based on the provided catalog ID.
 *
 * @param {string} catalogId - The ID of the catalog.
 * @returns {Promise<any>} - A promise that resolves to the retrieved data.
 */
export const getItems = async (catalogId) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/catalog/items/${catalogId}`
  );
  return data;
};
