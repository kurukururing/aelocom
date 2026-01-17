import React, { useState, useEffect } from 'react';

function Message() {
    const endpoint = "http://localhost:3001/api/v1/users"; // Sesuaikan port backend
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
                setMessages([result, ...messages]);
                setMsgText(""); 
                // Opsional: Kosongkan nama juga agar user mengganti nama baru
                // setSender(""); 
            } else {
                // Menampilkan pesan error dari backend (misal: Nama sudah dipakai)
                alert(result.error || "Gagal mengirim pesan");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Terjadi kesalahan koneksi");
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
                        // UPDATE: Key sekarang menggunakan sender_message karena ID sudah tidak ada/tidak unik
                        <div key={msg.sender_message} className="message-card">
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