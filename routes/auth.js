var express = require("express");
var app = express();
var router = express.Router();
var JWT = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('dotenv').config();

var User = require("../model/users");

router.route('/register').post(function (req, res){
    var hash = bcrypt.hashSync(req.body.password, 10);

    var user = new User;
    user.name = req.body.name;
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.password = hash;
    user.address = req.body.address;
    user.location = req.body.location;

    user.save().then(user => {
        res.json(user);
    }).catch(err => {
        res.json(err);
    });

});

router.route('/login').post(function(req, res){
    var email = req.body.email,
        password = req.body.password;

    User.findOne({email: email}, function(err, user) {
        if(err) throw err;

        if (!user) {
            res.status(404).json({success: false, message: 'User not found'});
        }else if (user) {
            if(!bcrypt.compareSync(password, user.password)) {
                res.status(400).json({success: false, message: "Wrong password"});
            }
            const payload = {
                id: user._id
            }
            var token = JWT.sign({
                data: payload
              }, process.env.SECRET, { expiresIn: 60 * 60 });

            res.status(200).json({
                success: true,
                message: 'have your token',
                token: token
            });
        }

    });
});

router.route('/profile').get(function(req,res){
    
    var token = req.body.token || req.query.token || req.headers.authorization;
    
    if(token == req.headers.authorization) {
        token = token.split(" ");
        token = token[1];
    }
    JWT.verify(token, process.env.SECRET, function(err, decoded) {

        if (err) {
            res.status(400).json(err);
        }else {
            User.findById(decoded.data.id,function(err, user) {
                if(err) {
                    res.status(400).json({msg: 'user not found'});
                }else {
                    res.status(400).json(user);
                }
            });
        }
        
      });

});

module.exports = router;