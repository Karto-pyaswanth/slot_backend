const db = require('../config/db');

class Slot {
    static async createSlot(user_name, email, slot_date, slot_time) {
        try {
            console.log("🔹 Inserting data into DB:", user_name, email, slot_date, slot_time); 
            
            const [result] = await db.promise().query( 
                'INSERT INTO slots (user_name, email, slot_date, slot_time) VALUES (?, ?, ?, ?)',
                [user_name, email, slot_date, slot_time]
            );
            console.log("✅ Insert successful, ID:", result.insertId); 
            return result.insertId;
        } catch (error) {
            console.error("Database Insert Error:", error);
            throw error;
        }
    }

    static async getSlots() {
        try {
            const [rows] = await db.query('SELECT * FROM slots');
            return rows;
        } catch (error) {
            console.error('Database Error:', error);
            throw new Error('Failed to fetch slots');
        }
    }

    static async getSlotById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM slots WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Database Error:', error);
            throw new Error('Failed to fetch slot');
        }
    }

    static async deleteSlot(id) {
        try {
            const [result] = await db.query('DELETE FROM slots WHERE id = ?', [id]);
            return result.affectedRows;
        } catch (error) {
            console.error('Database Error:', error);
            throw new Error('Failed to delete slot');
        }
    }
}

module.exports = Slot;
