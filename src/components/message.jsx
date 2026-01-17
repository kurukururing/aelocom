import React, { useState, useEffect } from 'react';

function Message() {
    // Pastikan portnya 3001
    const endpoint = "http://localhost:3001/api/v1/users"; 

    const [messages, setMessages] = useState([]);
    const [sender, setSender] = useState("");
    const [msgText, setMsgText] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // Ambil data saat pertama kali load
    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error("Gagal koneksi ke server");
            
            const result = await response.json();
            setMessages(result.data || []);
            setErrorMsg(""); // Hapus error jika berhasil
        } catch (error) {
            console.error("Error fetch:", error);
            setErrorMsg("Gagal mengambil data dari Backend. Pastikan 'node index.js' jalan.");
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!sender || !msgText) return alert("Isi nama dan pesan!");

        setLoading(true);
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sender_message: sender, message: msgText }),
            });

            const result = await response.json();

            if (response.ok) {
                // Update UI langsung
                setMessages([result, ...messages]);
                setMsgText("");
            } else {
                alert(result.error || "Gagal mengirim");
            }
        } catch (error) {
            alert("Tidak bisa menghubungi server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="message-section">
            <h2 className="section-title">Community Board</h2>
            
            {/* Tampilkan Pesan Error jika Backend Mati */}
            {errorMsg && <div style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{errorMsg}</div>}

            <div className="message-form-box">
                <form onSubmit={handleSendMessage}>
                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="Nama Anda" 
                            value={sender}
                            onChange={(e) => setSender(e.target.value)}
                            className="input-sender"
                        />
                    </div>
                    <div className="input-group">
                        <textarea 
                            placeholder="Tulis pesan..." 
                            value={msgText}
                            onChange={(e) => setMsgText(e.target.value)}
                            className="input-message"
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
                    messages.map((msg, index) => (
                        <div key={index} className="message-card">
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