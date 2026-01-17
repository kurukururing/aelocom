import React, { useState, useEffect } from 'react';

function Message() {
    // Pastikan URL ini sesuai dengan backend Anda
    const endpoint = "http://localhost:3001/api/v1/users"; 

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
            const result = await response.json();
            // Backend mengirim { success: true, data: [...] }
            setMessages(result.data || []);
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
                // Tambahkan pesan baru ke paling atas list
                setMessages([result, ...messages]);
                setMsgText(""); 
                // Opsional: Clear sender jika ingin user bisa ganti nama
                // setSender(""); 
            } else {
                alert(result.error || "Gagal mengirim pesan");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Gagal koneksi ke Backend.");
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
                        /* Perhatikan: MySQL biasanya me-return 'id', bukan '_id' */
                        <div key={msg.id || msg._id} className="message-card">
                            <div className="msg-header">
                                <span className="sender-name">{msg.sender_message}</span>
                                {/* Opsional: Tampilkan tanggal */}
                                <span className="msg-date" style={{fontSize: '0.8em', color: '#888', marginLeft: '10px'}}>
                                    {new Date(msg.created_at).toLocaleDateString()}
                                </span>
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