const db = require('../config/db');

class Slot {
    static async createSlot(user_name, email, slot_date, slot_time) {
        try {
            console.log("🔹 Inserting data:", user_name, email, slot_date, slot_time);
            
            const [result] = await db.query(
                'INSERT INTO slots (user_name, email, slot_date, slot_time) VALUES (?, ?, ?, ?)',
                [user_name, email, slot_date, slot_time]
            );

            console.log("✅ Insert successful, ID:", result.insertId);
            return result.insertId;
        } catch (error) {
            console.error("❌ Database Insert Error:", error);
            throw error;
        }
    }

    static async getSlots() {
        try {
            const [rows] = await db.query('SELECT * FROM slots ORDER BY slot_date ASC, slot_time ASC');
            return rows;
        } catch (error) {
            console.error('❌ Database Fetch Error:', error);
            throw new Error('Failed to fetch slots');
        }
    }

    static async getSlotById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM slots WHERE id = ?', [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('❌ Database Fetch Error:', error);
            throw new Error('Failed to fetch slot');
        }
    }

    static async deleteSlot(id) {
        try {
            const [result] = await db.query('DELETE FROM slots WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('❌ Database Delete Error:', error);
            throw new Error('Failed to delete slot');
        }
    }

    static async updateSlot(id, user_name, email, slot_date, slot_time) {
        try {
            console.log("🔹 Updating data for ID:", id, user_name, email, slot_date, slot_time);

            const [result] = await db.query(
                'UPDATE slots SET user_name = ?, email = ?, slot_date = ?, slot_time = ? WHERE id = ?',
                [user_name, email, slot_date, slot_time, id]
            );

            if (result.affectedRows === 0) {
                throw new Error('No record found with the specified ID');
            }

            console.log("✅ Update successful, ID:", id);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("❌ Database Update Error:", error);
            throw error;
        }
    }
}

module.exports = Slot;