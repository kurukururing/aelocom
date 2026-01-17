const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 3001;

// Izinkan Frontend mengakses Backend
app.use(cors());
app.use(express.json());

// --- KONFIGURASI DATABASE MONGODB ---
// URI Connection String
const MONGODB_URI = "mongodb+srv://Vercel-Admin-aeloria:OzUHZnw17VVPz9e7@aeloria.no80pvp.mongodb.net/aeloria?retryWrites=true&w=majority";

// Koneksi ke MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log("✅ DATABASE TERHUBUNG: MongoDB (aeloria)"))
    .catch((err) => console.error("❌ DATABASE GAGAL KONEK:", err));

// --- SCHEMA & MODEL (Pengganti Tabel) ---
// Kita buat struktur data agar mirip dengan tabel SQL sebelumnya
const messageSchema = new mongoose.Schema({
    sender_message: { 
        type: String, 
        required: true, 
        unique: true // Mencegah nama duplikat (seperti logika SQL sebelumnya)
    },
    message: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
}, { collection: 'com_message' }); // Paksa nama collection agar sama

const Message = mongoose.model('Message', messageSchema);

// --- ROUTES ---

// 1. Cek Server Nyala
app.get("/", (req, res) => {
    res.send("Backend Server MongoDB Berjalan Normal!");
});

// 2. GET Data Pesan
app.get("/api/v1/users", async (req, res) => {
    try {
        // Ambil semua data, urutkan dari yang terbaru (_id desc atau createdAt desc)
        const messages = await Message.find().sort({ createdAt: -1 }); 
        
        console.log(`📡 GET Request: Mengirim ${messages.length} pesan.`);
        res.json({ success: true, data: messages });
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
        // Buat object baru
        const newMessage = new Message({
            sender_message,
            message
        });

        // Simpan ke MongoDB
        const savedMessage = await newMessage.save();
        
        console.log(`📩 Pesan Baru dari ${sender_message}: ${message}`);
        
        // Kembalikan data yang sudah disimpan (termasuk _id dari Mongo)
        res.json(savedMessage); 

    } catch (error) {
        // Cek error duplikat (Code 11000 di MongoDB)
        if (error.code === 11000) {
            return res.status(409).json({ error: "Nama sudah dipakai!" });
        }
        console.error("Error POST:", error.message);
        res.status(500).json({ error: "Database error" });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});