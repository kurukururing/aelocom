const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2/promise"); 

app.use(cors());
app.use(express.json());

// --- KONFIGURASI DATABASE ---
const DATABASE_URL = "mysql://aeloria_consonant:f4b9282c656f35564f9937c5d84c919cfd81ab3a@f1sfr7.h.filess.io:61002/aeloria_consonant";

const pool = mysql.createPool(DATABASE_URL);

pool.getConnection()
    .then(conn => {
        console.log("✅ Terkoneksi ke Database: aeloria_consonant");
        conn.release();
    })
    .catch(err => {
        console.error("❌ Gagal koneksi database:", err.message);
    });

// --- ROUTES ---

// GET: Ambil semua pesan
app.get("/api/v1/users", async (req, res) => {
    try {
        // PERBAIKAN: Menggunakan tabel 'com_message'
        // Karena tidak ada kolom tanggal, kita tidak pakai 'ORDER BY'
        const [rows] = await pool.query("SELECT * FROM com_message");
        
        // Kita balik urutannya secara manual (array reverse) agar pesan baru ada di atas
        // (Solusi sementara karena tidak ada kolom created_at)
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
        // 1. Cek Duplikat di tabel 'com_message'
        const [existingUser] = await pool.query(
            "SELECT * FROM com_message WHERE sender_message = ? LIMIT 1", 
            [sender_message]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({ error: "Nama ini sudah digunakan. Pakai nama lain." });
        }

        // 2. Simpan ke tabel 'com_message'
        await pool.query(
            "INSERT INTO com_message (sender_message, message) VALUES (?, ?)",
            [sender_message, message]
        );

        // 3. Respon
        // Karena tidak ada ID otomatis di database, kita kirim balik data yang dikirim user
        const newMessage = {
            sender_message,
            message,
            // Buat ID fake random untuk React key sementara
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