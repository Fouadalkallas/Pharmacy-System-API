const Medication = require('../models/medication');

// Get all medications
exports.getAllMedications = async (req, res) => {
  try {
    const medications = await Medication.find();
    res.json(medications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single medication
exports.getMedicationById = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);
    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    res.json(medication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new medication
exports.createMedication = async (req, res) => {
  const { name, description, price, stock } = req.body;
  try {
    const newMedication = new Medication({ name, description, price, stock });
    const savedMedication = await newMedication.save();
    res.status(201).json(savedMedication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a medication
exports.updateMedication = async (req, res) => {
  try {
    const updatedMedication = await Medication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMedication) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    res.json(updatedMedication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a medication
exports.deleteMedication = async (req, res) => {
  try {
    const deletedMedication = await Medication.findByIdAndDelete(req.params.id);
    if (!deletedMedication) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    res.json({ message: 'Medication deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
