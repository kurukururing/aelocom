require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise"); // Kita pakai versi promise agar bisa async/await

const app = express();
app.use(cors());
app.use(express.json());

// --- Konfigurasi Koneksi Database ---
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

// Fungsi helper untuk koneksi
const pool = mysql.createPool(dbConfig);

// Cek koneksi saat server start
pool.getConnection()
    .then(conn => {
        console.log("✅ Terkoneksi ke Database Cloud Berhasil!");
        conn.release();
    })
    .catch(err => {
        console.error("❌ Gagal koneksi ke Database:", err.message);
    });

// --- ROUTES ---

// GET: Ambil semua pesan
app.get("/api/v1/users", async (req, res) => {
    try {
        // Query database: ambil semua pesan diurutkan dari yang terbaru
        const [rows] = await pool.query("SELECT * FROM messages ORDER BY created_at DESC");
        
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Terjadi kesalahan server saat mengambil data." });
    }
});

// POST: Kirim pesan baru
app.post('/api/v1/users', async (req, res) => {
    const { sender_message, message } = req.body;

    if (!sender_message || !message) {
        return res.status(400).json({ error: "Nama dan pesan wajib diisi" });
    }

    try {
        // 1. Cek Duplikat Nama (Query ke DB)
        const [existingUser] = await pool.query(
            "SELECT id FROM messages WHERE sender_message = ? LIMIT 1", 
            [sender_message]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({ error: "Nama ini sudah mengirim pesan. Gunakan nama lain." });
        }

        // 2. Simpan Pesan Baru
        const [result] = await pool.query(
            "INSERT INTO messages (sender_message, message) VALUES (?, ?)",
            [sender_message, message]
        );

        // 3. Kembalikan data yang baru disimpan ke Frontend
        const newMessage = {
            id: result.insertId, // ID dari database
            sender_message,
            message,
            created_at: new Date()
        };

        console.log(`Pesan baru disimpan dari: ${sender_message}`);
        res.json(newMessage);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Gagal menyimpan pesan ke database." });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server Berjalan di port ${PORT}`);
});