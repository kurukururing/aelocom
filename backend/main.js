const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs"); // Import modul File System
const path = require("path");

app.use(cors());
app.use(express.json());

// Tentukan nama file penyimpanan
const DATA_FILE = path.join(__dirname, "messages.json");

// --- Helper: Fungsi Membaca Data ---
const readData = () => {
    // Jika file belum ada, kembalikan array kosong
    if (!fs.existsSync(DATA_FILE)) {
        return [];
    }
    const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
    if (!fileContent) return [];
    try {
        return JSON.parse(fileContent);
    } catch (e) {
        return [];
    }
};

// --- Helper: Fungsi Menulis Data ---
const writeData = (data) => {
    // Tulis array data ke dalam file JSON dengan format rapi (indentasi 2)
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// --- ROUTES ---

// GET: Ambil semua pesan
app.get("/api/v1/users", (req, res) => {
    const messages = readData();
    // Urutkan biar yang terbaru ada di atas (reverse)
    const sortedMessages = messages.reverse(); 
    
    res.json({
        success: true,
        data: sortedMessages
    });
});

// POST: Kirim pesan baru
app.post('/api/v1/users', (req, res) => {
    const { sender_message, message } = req.body;

    // Validasi sederhana
    if (!sender_message || !message) {
        return res.status(400).json({ error: "Nama dan pesan wajib diisi" });
    }

    const currentMessages = readData();

    // Cek Duplikat Nama (Manual tanpa Database)
    const isDuplicate = currentMessages.some(m => m.sender_message === sender_message);
    if (isDuplicate) {
        return res.status(409).json({ error: "Nama ini sudah mengirim pesan. Gunakan nama lain." });
    }

    // Buat objek pesan baru
    const newMessage = {
        _id: Date.now().toString(), // Kita buat ID manual pakai waktu
        sender_message,
        message,
        created_at: new Date()
    };

    // Tambahkan ke array dan simpan ke file
    // Kita push ke currentMessages (array asli sebelum di-reverse)
    currentMessages.push(newMessage);
    writeData(currentMessages);

    console.log(`Pesan baru disimpan dari: ${sender_message}`);
    res.json(newMessage);
});

// PENTING: Gunakan 0.0.0.0 agar bisa diakses HP/Device lain
app.listen(3001, "0.0.0.0", () => {
    console.log("Server Berjalan Tanpa Database!");
    console.log("Data disimpan di file: messages.json");
});