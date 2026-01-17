const express = require("express");
const mongoose = require("mongoose"); // Ganti mysql dengan mongoose
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// --- 1. KONEKSI KE MONGODB ATLAS (Cloud) ---
// Ganti string di bawah dengan Connection String dari MongoDB Atlas Anda
const mongoURI = "mongodb+srv://Jefferson:428375@cluster0.zis2fam.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoURI)
    .then(() => console.log("Database MongoDB Connected"))
    .catch((err) => console.log("Gagal konek database:", err));

// --- 2. MEMBUAT SCHEMA & MODEL ---
// Di MongoDB, kita mendefinisikan struktur data di kode, bukan di database tools
const MessageSchema = new mongoose.Schema({
    sender_message: {
        type: String,
        required: true,
        unique: true // Ini menggantikan logika cek duplikat manual
    },
    message: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Membuat Model (setara dengan Tabel di MySQL)
const Message = mongoose.model("com_message", MessageSchema);

// --- 3. ROUTES ---

// GET DATA
app.get("/api/v1/users", async (req, res) => {
    try {
        // Syntax MongoDB: .find() menggantikan SELECT *
        // .sort({ created_at: -1 }) agar pesan terbaru di atas
        const messages = await Message.find().sort({ created_at: -1 });
        
        res.json({
            success: true,
            message: "getting users data",
            data: messages,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST DATA
app.post('/api/v1/users', async (req, res) => {
    const { sender_message, message } = req.body;

    try {
        // Syntax MongoDB: Create new instance & save
        const newMessage = new Message({
            sender_message: sender_message,
            message: message
        });

        await newMessage.save(); // Simpan ke database

        res.json(newMessage);

    } catch (err) {
        // Error Code 11000 adalah error Duplicate Key di MongoDB
        if (err.code === 11000) {
            return res.status(409).json({ 
                error: "Nama ini sudah mengirim pesan. Gunakan nama lain." 
            });
        }
        res.status(500).json({ error: err.message });
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});