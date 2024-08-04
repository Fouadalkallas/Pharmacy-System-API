const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');

router.get('/', medicationController.getAllMedications);
router.get('/:id', medicationController.getMedicationById);
router.post('/', medicationController.createMedication);
router.put('/:id', medicationController.updateMedication);
router.delete('/:id', medicationController.deleteMedication);

module.exports = router;
