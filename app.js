const express = require('express'); 
const mongoose=require('mongoose');
const passport=require('passport');
const exphbs = require('express-handlebars');
const path=require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();



// Load Models
require('./models/User');

// Passport Config
require('./config/passport')(passport);

// Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const questions=require('./routes/questions');

// Load Keys
const keys = require('./config/keys');


// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose.connect(keys.mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// Handlebars Middleware
app.engine('handlebars', exphbs({
  /*helpers: {
    truncate: truncate,
    stripTags: stripTags,
    formatDate:formatDate,
    select:select,
    editIcon: editIcon
  },*/
  defaultLayout:'main'
}));
app.set('view engine', 'handlebars');


app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));


// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/', index);
app.use('/auth', auth);
 app.use('/questions', questions);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});