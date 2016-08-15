let express=require('express');
let passport=require('passport');
let GoogleStrategy=require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
		clientID: '596105178384-brv0tor05dore21e1d04m51gbmqgn1sv.apps.googleusercontent.com',
		clientSecret: 'fN7kFN7UJ5ahDC057GvOuZN1',
		callbackURL: 'http://localhost:8888/auth/google/callback'		
	}, (accessToken, refreshToken, profile, cb) => {
		return cb(null, profile);
	}	
));

passport.serializeUser((user, cb) => {
	cb(null, user);
});

passport.deserializeUser((obj, cb) => {
	cb(null, obj);
});

let app=express();

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
	res.render('home', { user: req.user });
});

app.get('/auth', (req, res) => {
	res.render('login');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
	passport.authenticate('google', { failureRedirect: '/auth' }),
	(req, res) => {
		res.redirect('/');
	}
);

app.listen(8888);