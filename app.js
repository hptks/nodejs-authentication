let express=require('express');
let passport=require('passport');
let GoogleStrategy=require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
		clientID: '596105178384-brv0tor05dore21e1d04m51gbmqgn1sv.apps.googleusercontent.com',
		clientSecret: 'fN7kFN7UJ5ahDC057GvOuZN1',
		callbackURL: 'http://localhost:8888/auth/google/callback'		
	}, (accessToken, refreshToken, profile, cb) => {
		User.findOrCreate({ googleId: profile.id }, (err, user) => {
			return cb(err, user);
		});
	}	
));

passport.serializeuser((user, cb) => {
	cb(null, user);
});

passport.deserializeUser((obj, cb) => {
	cb(null, obj);
});