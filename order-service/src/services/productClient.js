import axios from 'axios';

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://product-service:80';

export const getProduct = async (id) => {
  const response = await axios.get(`${PRODUCT_SERVICE_URL}/api/products/${id}`);
  return response.data.product;
};

export const updateProductStock = async (id, stockChange) => {
  const response = await axios.get(`${PRODUCT_SERVICE_URL}/api/products/${id}`);
  const product = response.data.product;
  const newStock = product.stock + stockChange; // stockChange va fi negativ
  if (newStock < 0) throw new Error('Insufficient stock');

  await axios.put(`${PRODUCT_SERVICE_URL}/api/products/${id}`, { stock: newStock });
  return { ...product, stock: newStock };
};