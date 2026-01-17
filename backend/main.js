const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// --- PERUBAHAN 1: NAMA DATABASE ---
// Perhatikan bagian setelah ".net/". Saya ubah menjadi "aeloria_message"
// Ganti password dan username sesuai milik Anda
const mongoURI = "mongodb+srv://Jefferson:428375@cluster0.zis2fam.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoURI)
    .then(() => console.log("Terhubung ke Database: aeloria_message"))
    .catch((err) => console.log("Gagal konek database:", err));

// --- PERUBAHAN 2: NAMA COLLECTION (msg) ---
const MessageSchema = new mongoose.Schema({
    sender_message: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    // INI KUNCINYA: Memaksa Mongoose masuk ke collection 'msg'
    // Jika tidak ada ini, Mongoose akan membuat collection baru bernama 'messages'
    collection: 'msg' 
});

const Message = mongoose.model("Message", MessageSchema);

// --- ROUTES (Tidak ada perubahan logika, hanya target DB yang berubah) ---

app.get("/api/v1/users", async (req, res) => {
    try {
        const messages = await Message.find().sort({ created_at: -1 });
        res.json({
            success: true,
            data: messages,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/v1/users', async (req, res) => {
    const { sender_message, message } = req.body;
    try {
        const newMessage = new Message({
            sender_message: sender_message,
            message: message
        });

        await newMessage.save(); // Masuk ke collection 'msg'
        res.json(newMessage);

    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ 
                error: "Nama ini sudah mengirim pesan. Gunakan nama lain." 
            });
        }
        res.status(500).json({ error: err.message });
    }
});

app.listen(3001, () => {
    console.log("Server berjalan di port 3001");
});