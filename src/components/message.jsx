import React, { useState, useEffect } from 'react';

function Message() {
    // PENTING:
    // 1. Jika tes di laptop sendiri: "http://localhost:3001/api/v1/users"
    // 2. Jika tes dari HP (satu WiFi): "http://192.168.x.x:3001/api/v1/users" (Ganti x sesuai IP laptop)
    // 3. Jika sudah deploy (Render/Vercel): "https://nama-backend-anda.onrender.com/api/v1/users"

    const [messages, setMessages] = useState([]);
    const [sender, setSender] = useState("");
    const [msgText, setMsgText] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            // Backend MongoDB tadi mengirim struktur: { success: true, data: [...] }
            setMessages(data.data || []);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!sender || !msgText) return alert("Nama dan Pesan harus diisi!");

        setLoading(true);

        const newMessageData = {
            sender_message: sender,
            message: msgText
        };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessageData),
            });

            const result = await response.json();

            if (response.ok) {
                // Berhasil
                // Result dari MongoDB backend sudah berisi objek pesan lengkap termasuk _id
                setMessages([result, ...messages]);
                setMsgText(""); 
                // setSender(""); // Uncomment jika ingin nama dikosongkan setiap kirim
            } else {
                // Menangani error duplikat nama dari Backend
                alert(result.error || "Gagal mengirim pesan");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Terjadi kesalahan koneksi. Pastikan Backend berjalan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="message-section">
            <h2 className="section-title">Community Board</h2>
            
            <div className="message-form-box">
                <form onSubmit={handleSendMessage}>
                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="Nama Anda (Harus Unik)" 
                            value={sender}
                            onChange={(e) => setSender(e.target.value)}
                            className="input-sender"
                            maxLength={20}
                        />
                    </div>
                    <div className="input-group">
                        <textarea 
                            placeholder="Tulis pesan..." 
                            value={msgText}
                            onChange={(e) => setMsgText(e.target.value)}
                            className="input-message"
                            rows="3"
                        ></textarea>
                    </div>
                    <button type="submit" disabled={loading} className="btn-send">
                        {loading ? "Mengirim..." : "Kirim Pesan"}
                    </button>
                </form>
            </div>

            <div className="message-list-container">
                {messages.length === 0 ? (
                    <p className="no-msg">Belum ada pesan.</p>
                ) : (
                    messages.map((msg) => (
                        // UPDATE: Menggunakan _id dari MongoDB sebagai key (Paling Aman)
                        <div key={msg._id} className="message-card">
                            <div className="msg-header">
                                <span className="sender-name">{msg.sender_message}</span>
                            </div>
                            <p className="msg-body">{msg.message}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Message;