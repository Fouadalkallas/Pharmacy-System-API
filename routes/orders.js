const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.put('/status', orderController.updateOrderStatus);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
