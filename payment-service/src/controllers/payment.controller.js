import { getOrder, updateOrderStatus } from '../services/orderClient.js';
import { validateUser } from '../services/userClient.js';

export const createPayment = async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    if (!orderId || !amount) return res.status(400).json({ error: 'orderId and amount required' });

    // Validează user
    const token = req.headers.authorization?.split(' ')[1];
    const user = await validateUser(token);

    // Validează comanda
    const order = await getOrder(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.userId !== user.id) return res.status(403).json({ error: 'Not your order' });
    if (order.totalPrice !== amount) return res.status(400).json({ error: 'Amount mismatch' });

    // Simulează plată (80% succes)
    const isSuccess = Math.random() < 0.8;
    const status = isSuccess ? 'success' : 'failed';

    // Crează plată în DB
    const payment = await req.prisma.payment.create({
      data: {
        orderId,
        userId: user.id,
        amount,
        status
      }
    });

    // Dacă succes, actualizează status comanda
    if (isSuccess) {
      await updateOrderStatus(orderId, 'processed');
    }

    res.status(201).json({ payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await req.prisma.payment.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.json({ payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};