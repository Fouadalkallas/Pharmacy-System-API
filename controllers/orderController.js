const Order = require('../models/order');
const Medication = require('../models/medication');

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer medications.medication');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('customer medications.medication');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  const { customer, medications } = req.body;
  let totalAmount = 0;

  try {
    // Calculate total amount
    for (let item of medications) {
      const medication = await Medication.findById(item.medication);
      if (!medication) {
        return res.status(404).json({ message: 'Medication not found' });
      }
      totalAmount += medication.price * item.quantity;
    }

    // Create and save the order
    const newOrder = new Order({ customer, medications, totalAmount });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    const order = await Order.findById(orderId).populate('medications.medication');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (status === 'Completed' && order.status !== 'Completed') {
      // Adjust medication stock
      for (let item of order.medications) {
        await Medication.findByIdAndUpdate(item.medication._id, { $inc: { stock: -item.quantity } });
      }
    }

    order.status = status;
    await order.save();
    res.json(order);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an order and restore the stock
exports.deleteOrder = async (req, res) => {
  try {
    // Find the order to delete and populate medication details
    const order = await Order.findById(req.params.id).populate('medications.medication');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Restore stock for each medication in the order
    for (let item of order.medications) {
      await Medication.findByIdAndUpdate(item.medication._id, {
        $inc: { stock: item.quantity }
      });
    }

    // Delete the order using deleteOne
    await order.deleteOne();

    res.json({ message: 'Order deleted and stock restored successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
