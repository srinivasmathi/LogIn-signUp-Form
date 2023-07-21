const passport = require('passport');

const googleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require('passport-local-mongoose');

async function main(){
    await mongoose.connect(process.env.CONNECTION_STRING);
}
main().catch(err=>console.log(err));

const userSchema = new mongoose.Schema({
    googleID : {type:String},
    facebookID : {type:String},
    username : {type:String},
    password : {type:String},
    email    : {type:String, unique : true,sparse : true}
});

userSchema.plugin(findOrCreate);

//for local authentication (username password hashing and salting)
userSchema.plugin(passportLocalMongoose,{usernameField : 'email'});

const User = mongoose.model('Users',userSchema);

passport.use(new googleStrategy({

    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : "http://localhost:3000/auth/google/res"

    },
    async function(accessToken,refeshToken,profile,done){
        try{
            const user = await User.findOrCreate({googleID: profile.id,username : profile.displayName,email : profile.emails[0].value});
            return done(null,user)
        }catch(err){
            return done(err,null);
        }
    }
));

const facebookStrategy = require('passport-facebook').Strategy;

passport.use(new facebookStrategy({

    clientID : process.env.FACEBOOK_APP_ID,
    clientSecret : process.env.FACEBOOK_APP_SECRET,
    callbackURL : "http://localhost:3000/auth/facebook/res",
    profileFields : ['id','displayName']

    },

    async function(accessToken,refreshToken,profile,done){
        try{
            console.log(profile);
            const user = User.findOrCreate({facebookID : profile.id,username : profile.displayName});
            return done(null,user);
        }catch(err){
            return done(err,null);
        }
    }

))

passport.serializeUser(function(user,done){
    return done(null,user);
})

passport.deserializeUser(function(user,done){
    return done(null,user);
})

//-----------------------local authentication----------------------------//

module.exports = User;



