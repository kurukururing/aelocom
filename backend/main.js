const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// --- PERBAIKAN URL DATABASE ---
// Saya menambahkan "aeloria_message" sebelum tanda tanya (?)
const mongoURI = "mongodb+srv://Jefferson:428375@cluster0.zis2fam.mongodb.net/aeloria_message?appName=Cluster0";

mongoose.connect(mongoURI)
    .then(() => console.log("Terhubung ke Database: aeloria_message"))
    .catch((err) => console.log("Gagal konek database:", err));

const MessageSchema = new mongoose.Schema({
    sender_message: { type: String, required: true, unique: true },
    message: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
}, {
    collection: 'msg' 
});

const Message = mongoose.model("Message", MessageSchema);

app.get("/api/v1/users", async (req, res) => {
    try {
        const messages = await Message.find().sort({ created_at: -1 });
        res.json({ success: true, data: messages });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/v1/users', async (req, res) => {
    const { sender_message, message } = req.body;
    try {
        const newMessage = new Message({ sender_message, message });
        await newMessage.save();
        res.json(newMessage);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ error: "Nama ini sudah mengirim pesan. Gunakan nama lain." });
        }
        res.status(500).json({ error: err.message });
    }
});

// PENTING: IP 0.0.0.0 agar bisa diakses device lain
app.listen(3001, "0.0.0.0", () => {
    console.log("Server berjalan di port 3001. Silakan cek IP Laptop Anda.");
});