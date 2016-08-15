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

app.get('/login', (req, res) => {
	res.render('login');
});

app.get('/login/google', passport.authenticate('google'));

app.listen(8888);