var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    CookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    jwt = require('express-jwt');
    config = require('dotenv').config(),


    port = process.env.PORT || 3000;

var userRoutes = require('./routes/users'),
    authRoutes = require('./routes/auth')

mongoose.Promise = global.Promise;
var local_db = process.env.DB_CONNECTION + "://" + process.env.DB_HOST + ":" + 
process.env.DB_PORT + "/" + process.env.DB_DATABASE;

var db = process.env.MONGODB_URI || local_db;
mongoose.connect(db, {
    useMongoClient: true,
}).then(
    () => {console.log("database connected")},
    err => { console.log(err) }
);


app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors());
//middleware for request
app.use(jwt({ secret: process.env.SECRET }).unless({path: ['/api/v1/login', '/api/v1/register']}));
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({msg: 'Token is Invalid'});
    }
});
//ends here
app.get('/', function(req, res) {
    res.json({msg: 'Welcome, api routes at \'/api/v1\''});
});
app.use('/api/v1', userRoutes, authRoutes);


app.listen(port, () => {
    console.log(`Local-server stated on port: ${port}`)
    console.log(local_db)
});