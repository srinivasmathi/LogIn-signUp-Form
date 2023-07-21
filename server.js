const express = require('express');
const app = express();
const session = require('express-session');

app.set("view engine","ejs");

const passport = require('passport');

require('./auth');

const localAuthRouter = require("./local-auth");

require('dotenv').config();
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

//creating session and making it persistent

app.use(session({
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : false
}))
app.use(passport.initialize());
app.use(passport.session());

app.get("/",(req,res)=>{
    const errorMessage = req.query.error;
    res.render('login',{ errorMessage });
})

app.get("/register",(req,res)=>{
    res.render('register');
})

app.get("/secrets",(req,res)=>{
    if(req.isAuthenticated()){
        res.render('secrets');
    }else{
        res.render("login");
    }
})

app.use("/",localAuthRouter);

//------------------------google authentication routes----------------------------------------//
app.get("/auth/google",
    passport.authenticate('google',{scope : ['profile','email']})
);

app.get("/auth/google/res",

    passport.authenticate('google',{successRedirect : "/secrets"}),

    (req,res)=>{
        res.render("login");
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
        res.render("login");
    }
)


app.listen(process.env.PORT || 3000,()=>{
    console.log("server started to the port 3000");
})