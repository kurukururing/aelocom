const express = require("express");
const app = express();
const cors = require("cors");
// PERBAIKAN 1: Wajib pakai 'mysql2/promise' agar fitur async/await berfungsi
const mysql = require("mysql"); 

app.use(cors());
app.use(express.json());

// --- KONFIGURASI DATABASE ---
// PERBAIKAN 2: Kita pecah URL menjadi object config agar bisa setting SSL
const pool = mysql.createPool({
    host: 'f1sfr7.h.filess.io',
    user: 'aeloria_consonant',
    password: 'f4b9282c656f35564f9937c5d84c919cfd81ab3a',
    database: 'aeloria_consonant',
    port: 61002,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // PENTING: SSL harus diset false agar koneksi cloud diterima
    ssl: {
        rejectUnauthorized: false
    }
});

// Cek Koneksi (Menggunakan Async function agar error tertangkap jelas)
(async () => {
    try {
        const conn = await pool.getConnection();
        console.log("✅ Terkoneksi ke Database: aeloria_consonant");
        conn.release(); // Lepas koneksi setelah cek berhasil
    } catch (err) {
        console.error("❌ Gagal koneksi database:", err.message);
    }
})();

// --- ROUTES ---

// GET: Ambil semua pesan
app.get("/api/v1/users", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM com_message");
        
        // DEBUG: Cek di terminal apakah data muncul
        console.log("Data fetched:", rows);

        res.json({
            success: true,
            data: rows.reverse() 
        });
    } catch (error) {
        console.error("Error GET:", error);
        res.status(500).json({ error: "Gagal mengambil data." });
    }
});

// POST: Kirim pesan baru
app.post('/api/v1/users', async (req, res) => {
    const { sender_message, message } = req.body;

    if (!sender_message || !message) {
        return res.status(400).json({ error: "Nama dan pesan wajib diisi" });
    }

    try {
        // 1. Cek Duplikat
        const [existingUser] = await pool.query(
            "SELECT * FROM com_message WHERE sender_message = ? LIMIT 1", 
            [sender_message]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({ error: "Nama ini sudah digunakan. Pakai nama lain." });
        }

        // 2. Simpan ke Database
        await pool.query(
            "INSERT INTO com_message (sender_message, message) VALUES (?, ?)",
            [sender_message, message]
        );

        // 3. Respon
        const newMessage = {
            sender_message,
            message,
            id: Math.random().toString(36).substr(2, 9) 
        };

        console.log(`Pesan baru dari: ${sender_message}`);
        res.json(newMessage);

    } catch (error) {
        console.error("Error POST:", error);
        res.status(500).json({ error: "Gagal menyimpan pesan." });
    }
});

app.listen(3001, "0.0.0.0", () => {
    console.log("Server berjalan di port 3001");
});