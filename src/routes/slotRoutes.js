const express = require('express');
const slotController = require('../controllers/slotController');

const router = express.Router();

// Define routes
router.post('/add/slots', slotController.createSlot); // Create a new slot
router.get('/slots', slotController.getSlots); // Get all slots
router.get('/slots/:id', slotController.getSlotById); // Get a slot by ID
router.delete('/slots/:id', slotController.deleteSlot); // Delete a slot by ID
router.put('/slots/:id', slotController.updateSlot); // Update a slot by ID

module.exports = router;