var express = require("express");
var app = express();
var router = express.Router();

var User = require("../model/users");


router.route('/users').get(function(req, res) {
    User.find(function(err, users) {
        if(err) {
            console.log(err);
        } else {
            res.json(users)
        }
    });
});

router.route('/users/:id').get(function(req,res){
    var user_id = req.params.id;
    User.findById(user_id,function(err, user) {
        if(err) {
            res.json({msg: 'user not found'});
        }else {
            res.json(user);
        }
    });
});

router.route('/users/:id').patch(function(req,res){

 
});

router.route('/users/:id').delete(function(req,res){
    var user_id = req.params.id;
    User.findByIdAndRemove({_id: user_id}, function(err, user) {
        if (err) {
            res.json(err);
        } else {
            res.json("Account Deleted successfully");
        }
    })
});

module.exports = router;