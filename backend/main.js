const express = require ("express")
const mysql = require("mysql");
const app = express()
const cors = require("cors");

app.use(cors());
app.use(express.json());

const database = mysql.createConnection({
    host : "localhost",
    user:"root",
    password:"428375",
    "database":"aeloria"
})

database.connect((err)=>{
    if(err) throw err;
    console.log("Database Connected");
});


app.get("/api/v1/users",(req,res)=>{
    console.log("GET API USER DI REQUEST OI");
    database.query("Select*from com_message", (err,rows)=>{
        if(err) throw err;
        res.json({
            success:true,
            message:"getting users data",
            data:rows,
        })
    })
});
app.post('/api/v1/users', (req, res) => {
    const { sender_message, message } = req.body;
    
    const sql = "INSERT INTO com_message (sender_message, message) VALUES (?, ?)";
    
    database.query(sql, [sender_message, message], (err, result) => {
        if (err) {
            // Cek error khusus: ER_DUP_ENTRY (Nama sudah ada)
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ 
                    error: "Nama ini sudah mengirim pesan. Gunakan nama lain." 
                });
            }
            return res.status(500).json(err);
        }
        
        // Berhasil
        res.json({ 
            sender_message, 
            message,
            created_at: new Date() 
        });
    });
});
app.listen(3001,()=>{
    console.log("Server is running on port 3001");
});