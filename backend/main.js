const express = require("express");
const app = express();
const cors = require("cors");
// Kita pakai mysql2 versi promise agar kodingnya lebih rapi (async/await)
const mysql = require("mysql2/promise"); 

app.use(cors());
app.use(express.json());

// --- KONFIGURASI DATABASE (LANGSUNG) ---
// Link koneksi lengkap dari yang Anda berikan
const DATABASE_URL = "mysql://aeloria_consonant:f4b9282c656f35564f9937c5d84c919cfd81ab3a@f1sfr7.h.filess.io:61002/aeloria_consonant";

// Membuat pool koneksi
const pool = mysql.createPool(DATABASE_URL);

// Cek koneksi saat server nyala (Hanya untuk memastikan)
pool.getConnection()
    .then(conn => {
        console.log("✅ Berhasil terkoneksi ke Database Filess.io!");
        conn.release();
    })
    .catch(err => {
        console.error("❌ Gagal koneksi database:", err.message);
    });

// --- ROUTES ---

// GET: Ambil semua pesan
app.get("/api/v1/users", async (req, res) => {
    try {
        // Query SQL: Ambil data dan urutkan dari yang terbaru (DESC)
        const [rows] = await pool.query("SELECT * FROM messages ORDER BY created_at DESC");
        
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error("Error GET:", error);
        res.status(500).json({ error: "Gagal mengambil data dari database" });
    }
});

// POST: Kirim pesan baru
app.post('/api/v1/users', async (req, res) => {
    const { sender_message, message } = req.body;

    // Validasi input
    if (!sender_message || !message) {
        return res.status(400).json({ error: "Nama dan pesan wajib diisi" });
    }

    try {
        // 1. Cek Duplikat Nama (Query SQL)
        // Kita cari apakah ada nama yang sama di tabel
        const [existingUser] = await pool.query(
            "SELECT id FROM messages WHERE sender_message = ? LIMIT 1", 
            [sender_message]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({ error: "Nama ini sudah mengirim pesan. Gunakan nama lain." });
        }

        // 2. Simpan ke Database
        const [result] = await pool.query(
            "INSERT INTO messages (sender_message, message) VALUES (?, ?)",
            [sender_message, message]
        );

        // 3. Siapkan respon sukses
        // Database MySQL mengembalikan 'insertId' sebagai ID baris baru
        const newMessage = {
            id: result.insertId, 
            sender_message,
            message,
            created_at: new Date()
        };

        console.log(`Pesan tersimpan di DB ID: ${result.insertId} oleh ${sender_message}`);
        res.json(newMessage);

    } catch (error) {
        console.error("Error POST:", error);
        res.status(500).json({ error: "Gagal menyimpan ke database" });
    }
});

// Jalankan Server
app.listen(3001, "0.0.0.0", () => {
    console.log("Server berjalan di port 3001");
});