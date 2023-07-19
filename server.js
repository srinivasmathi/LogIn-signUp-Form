const express = require('express');
const app = express();
const session = require('express-session');

const passport = require('passport');
require('./auth');

require('dotenv').config();
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

//creating session and making it persistent

app.use(session({
    secret : "dog",
    resave : false,
    saveUninitialized : false
}))
app.use(passport.initialize());
app.use(passport.session());

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

//------------------------google authentication routes----------------------------------------//
app.get("/auth/google",
    passport.authenticate('google',{scope : ['profile','email']})
);

app.get("/auth/google/res",

    passport.authenticate('google',{successRedirect : "/secrets"}),

    (req,res)=>{
        res.sendFile("views/login.html",{root : __dirname});
    }
);
//-----------------------------------------------------------------------------------------//

//---------------------facebook authentication routes--------------------------------------//

app.get("/auth/facebook",
    passport.authenticate('facebook')
)

app.get("/auth/facebook/res",
    passport.authenticate('facebook',{successRedirect : "/secrets" }),
    (req,res)=>{
        res.redirect("/");
    }
)



app.listen(process.env.PORT || 3000,()=>{
    console.log("server started to the port 3000");
})