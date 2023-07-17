const express = require('express');
const app = express();

require('dotenv').config();
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
// app.set("views engine","ejs");

app.get("/",(req,res)=>{
    res.sendFile('views/login.html',{root : __dirname});
})

app.get("/register",(req,res)=>{
    res.sendFile('views/register.html',{root : __dirname});
})

app.get("/secrets",(req,res)=>{
    res.sendFile('views/secrets.html',{root : __dirname});
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("server started to the port 3000");
})