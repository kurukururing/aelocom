import React, { useState, useEffect } from 'react';

function Message() {
    // --- PERBAIKAN DI SINI ---
    // Ganti 192.168.1.XX dengan IP Laptop Anda (Cek di CMD -> ipconfig)
    // Contoh: "http://192.168.1.15:3001/api/v1/users"
    const endpoint = "http://192.168.1.XX:3001/api/v1/users"; 

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
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
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

            // Cek jika response bukan JSON (misal HTML error page)
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Respon server bukan JSON. Cek IP Address.");
            }

            const result = await response.json();

            if (response.ok) {
                setMessages([result, ...messages]);
                setMsgText(""); 
            } else {
                alert(result.error || "Gagal mengirim pesan");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            // Pesan error ini muncul jika IP Salah atau Firewall aktif
            alert("Gagal Terhubung! Cek: 1. IP Address benar? 2. Backend jalan? 3. Firewall Laptop mati?");
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