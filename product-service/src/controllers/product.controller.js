export const getAll = async (req, res) => {
  try {
    const products = await req.prisma.product.findMany({
      select: { id: true, name: true, description: true, price: true, stock: true, imageUrl: true }
    });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const product = await req.prisma.product.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { name, description, price, stock, imageUrl } = req.body;
    const product = await req.prisma.product.create({
      data: { name, description, price: Number(price), stock: Number(stock), imageUrl }
    });
    res.status(201).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.price) data.price = Number(data.price);
    if (data.stock) data.stock = Number(data.stock);

    const product = await req.prisma.product.update({
      where: { id: Number(id) },
      data
    });
    res.json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await req.prisma.product.delete({
      where: { id: Number(req.params.id) }
    });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
