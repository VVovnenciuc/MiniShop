import axios from 'axios';

const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://order-service:80';

export const getOrder = async (id) => {
  const response = await axios.get(`${ORDER_SERVICE_URL}/api/orders/${id}`);
  return response.data.order;
};

export const updateOrderStatus = async (id, status) => {
  await axios.put(`${ORDER_SERVICE_URL}/api/orders/${id}`, { status });
};