const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise"); // WAJIB mysql2/promise

const app = express();
const PORT = 3001;

// Izinkan Frontend mengakses Backend
app.use(cors());
app.use(express.json());

// --- KONFIGURASI DATABASE ---
const dbConfig = {
    host: 'f1sfr7.h.filess.io',
    user: 'aeloria_consonant',
    password: 'f4b9282c656f35564f9937c5d84c919cfd81ab3a',
    database: 'aeloria_consonant',
    port: 61002,
    waitForConnections: true,
    connectionLimit: 10,
    ssl: { rejectUnauthorized: false } // Wajib untuk Filess.io
};

const pool = mysql.createPool(dbConfig);

// Cek Koneksi Database saat Server Start
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ DATABASE TERHUBUNG: aeloria_consonant");
        connection.release();
    } catch (error) {
        console.error("❌ DATABASE GAGAL KONEK:", error.message);
    }
})();

// --- ROUTES ---

// 1. Cek Server Nyala (Buka http://localhost:3001 di browser)
app.get("/", (req, res) => {
    res.send("Backend Server Berjalan Normal!");
});

// 2. GET Data Pesan
app.get("/api/v1/users", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM com_message");
        console.log(`📡 GET Request: Mengirim ${rows.length} pesan.`);
        res.json({ success: true, data: rows.reverse() });
    } catch (error) {
        console.error("Error GET:", error.message);
        res.status(500).json({ error: "Gagal ambil data" });
    }
});

// 3. POST Pesan Baru
app.post('/api/v1/users', async (req, res) => {
    const { sender_message, message } = req.body;

    if (!sender_message || !message) {
        return res.status(400).json({ error: "Nama dan pesan wajib diisi" });
    }

    try {
        // Cek Duplikat
        const [existing] = await pool.query("SELECT * FROM com_message WHERE sender_message = ?", [sender_message]);
        if (existing.length > 0) return res.status(409).json({ error: "Nama sudah dipakai!" });

        // Simpan
        await pool.query("INSERT INTO com_message (sender_message, message) VALUES (?, ?)", [sender_message, message]);
        
        console.log(`📩 Pesan Baru: ${sender_message}`);
        res.json({ sender_message, message, id: Math.random() }); // ID sementara

    } catch (error) {
        console.error("Error POST:", error.message);
        res.status(500).json({ error: "Database error" });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});