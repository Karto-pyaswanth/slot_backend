const Slot = require('../models/slotModel');

exports.createSlot = async (req, res) => {
    try {
        console.log("🔹 Received Request:", req.body);  

        const { user_name, email, slot_date, slot_time } = req.body;
        if (!user_name || !email || !slot_date || !slot_time) {
            console.log("Missing fields in request!");
            return res.status(400).json({ error: "All fields are required" });
        }

        const slotId = await Slot.createSlot(user_name, email, slot_date, slot_time);
        
        console.log("✅ Slot Created with ID:", slotId);  
        res.status(201).json({ message: 'Slot created successfully', slotId });
    } catch (error) {
        console.error("❌ Error inserting slot:", error.message);
        res.status(500).json({ error: error.message });
    }
};  // 🔹 FIX: Closing the function properly

exports.getSlots = async (req, res) => {
    try {
        const slots = await Slot.getSlots();
        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSlotById = async (req, res) => {
    try {
        const slot = await Slot.getSlotById(req.params.id);
        if (!slot) {
            return res.status(404).json({ message: 'Slot not found' });
        }
        res.status(200).json(slot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSlot = async (req, res) => {
    try {
        const affectedRows = await Slot.deleteSlot(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Slot not found' });
        }
        res.status(200).json({ message: 'Slot deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
