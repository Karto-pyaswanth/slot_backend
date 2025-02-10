const express = require('express');
const slotController = require('../controllers/slotController');

const router = express.Router();

router.post('/slots', slotController.createSlot);
router.get('/slots', slotController.getSlots);
router.get('/slots/:id', slotController.getSlotById);
router.delete('/slots/:id', slotController.deleteSlot);

module.exports = router;
