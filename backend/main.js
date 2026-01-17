const express = require("express");
const app = express();
const cors = require("cors");
// PERBAIKAN UTAMA: Wajib 'mysql2/promise' (bukan 'mysql')
const mysql = require("mysql2/promise"); 

app.use(cors());
app.use(express.json());

// --- KONFIGURASI DATABASE ---
const pool = mysql.createPool({
    host: 'f1sfr7.h.filess.io',
    user: 'aeloria_consonant',
    password: 'f4b9282c656f35564f9937c5d84c919cfd81ab3a',
    database: 'aeloria_consonant',
    port: 61002,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // SSL wajib untuk Filess.io
    ssl: {
        rejectUnauthorized: false
    }
});

// --- CEK KONEKSI SAAT SERVER START ---
(async () => {
    try {
        const conn = await pool.getConnection();
        console.log("✅ SUKSES: Terkoneksi ke Database Cloud (Filess.io)!");
        conn.release();
    } catch (err) {
        console.error("❌ ERROR: Gagal koneksi database.");
        console.error("Penyebab:", err.message);
    }
})();

// --- ROUTES ---

// GET: Ambil data dari Database
app.get("/api/v1/users", async (req, res) => {
    try {
        // Mengambil data dari tabel com_message
        const [rows] = await pool.query("SELECT * FROM com_message");
        
        // Debug di terminal
        console.log(`Mengambil ${rows.length} pesan dari database.`);

        // Reverse manual karena tabel tidak punya kolom tanggal (created_at)
        res.json({
            success: true,
            data: rows.reverse() 
        });
    } catch (error) {
        console.error("Error GET:", error);
        res.status(500).json({ error: "Gagal mengambil data database." });
    }
});

// POST: Masukkan data ke Database
app.post('/api/v1/users', async (req, res) => {
    const { sender_message, message } = req.body;

    if (!sender_message || !message) {
        return res.status(400).json({ error: "Nama dan pesan wajib diisi" });
    }

    try {
        // 1. Cek Duplikat (Query SQL)
        const [existingUser] = await pool.query(
            "SELECT * FROM com_message WHERE sender_message = ? LIMIT 1", 
            [sender_message]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({ error: "Nama ini sudah digunakan. Pakai nama lain." });
        }

        // 2. Insert ke Database (Bukan JSON lagi)
        await pool.query(
            "INSERT INTO com_message (sender_message, message) VALUES (?, ?)",
            [sender_message, message]
        );

        // 3. Response
        const newMessage = {
            sender_message,
            message,
            // ID fake untuk React key sementara (karena DB tidak punya ID auto-increment)
            id: Math.random().toString(36).substr(2, 9) 
        };

        console.log(`✅ Pesan baru tersimpan di DB dari: ${sender_message}`);
        res.json(newMessage);

    } catch (error) {
        console.error("Error POST:", error);
        res.status(500).json({ error: "Gagal menyimpan ke database." });
    }
});

