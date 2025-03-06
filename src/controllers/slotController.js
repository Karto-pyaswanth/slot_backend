const Slot = require('../models/slotModel');

exports.createSlot = async (req, res) => {
    try {
        const { user_name, email, slot_date, slot_time } = req.body;
        
        // Validate required fields
        if (!user_name || !email || !slot_date || !slot_time) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Insert the slot into the database
        const insertId = await Slot.createSlot(user_name, email, slot_date, slot_time);
        console.log(insertId);
        
        res.status(201).json({ message: "Slot created successfully", id: insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create slot" });
    }
};

exports.getSlots = async (req, res) => {
    try {
        const slots = await Slot.getSlots();
        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch slots" });
    }
};

exports.getSlotById = async (req, res) => {
    try {
        const { id } = req.params;
        const slot = await Slot.getSlotById(id);
        if (!slot) {
            return res.status(404).json({ error: "Slot not found" });
        }
        res.status(200).json(slot);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch slot" });
    }
};

exports.deleteSlot = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Slot.deleteSlot(id);
        if (!deleted) {
            return res.status(404).json({ error: "Slot not found" });
        }
        res.status(200).json({ message: "Slot deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete slot" });
    }
};

exports.updateSlot = async (req, res) => {
    console.log("Testing update");
    try {
        const { id } = req.params;
        const { user_name, email, slot_date, slot_time } = req.body;

        // Validate required fields
        if (!user_name || !email || !slot_date || !slot_time) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Update the slot in the database
        const updated = await Slot.updateSlot(id, user_name, email, slot_date, slot_time);

        if (!updated) {
            return res.status(404).json({ error: "Slot not found" });
        }

        res.status(200).json({ message: "Slot updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update slot" });
    }
};