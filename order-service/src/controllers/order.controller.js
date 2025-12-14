import { getProduct, updateProductStock } from '../services/productClient.js';
import { validateUser } from '../services/userClient.js';

export const createOrder = async (req, res) => {
  try {
    const { items } = req.body; // [{ productId, quantity }]
    if (!items || items.length === 0) return res.status(400).json({ error: 'No items' });

    // Validează user din JWT
    const token = req.headers.authorization?.split(' ')[1];
    const user = await validateUser(token);

    let totalPrice = 0;
    const processedItems = [];

    for (const item of items) {
      const product = await getProduct(item.productId);
      if (!product) return res.status(404).json({ error: `Product ${item.productId} not found` });

      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
      }

      // Actualizează stocul
      await updateProductStock(item.productId, -item.quantity);

      processedItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price
      });

      totalPrice += product.price * item.quantity;
    }

    // Creează comanda
    const order = await req.prisma.order.create({
      data: {
        userId: user.id,
        totalPrice,
        status: 'processed',
        items: {
          create: processedItems.map(i => ({
            productId: i.productId,
            quantity: i.quantity,
            price: i.price
          }))
        }
      },
      include: { items: true }
    });

    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const user = await validateUser(token);

    const orders = await req.prisma.order.findMany({
      where: { userId: user.id },
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await req.prisma.order.findUnique({
      where: { id: Number(req.params.id) },
      include: { items: true }
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};