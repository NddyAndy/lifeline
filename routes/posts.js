var express = require("express");
var app = express();
var router = express.Router();
var JWT = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('dotenv').config();

var User = require("../model/users"),
    Post = require("../model/posts");


router.route('/posts').get(function(req, res) {
    Post.find(function(err, posts) {
        if(err) {
            console.log(err);
        } else {
            res.json(posts)
        }
    });
});

router.route('/posts/:id').get(function(req,res){
    var post_id = req.params.id;
    User.findById(post_id,function(err, post) {
        if(err) {
            res.json({msg: 'user not found'});
        }else {
            res.json(user);
        }
    });
});
router.route('/posts').post(function (req, res){
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
                    var post = new Post;
                    post.author = user._id;
                    post.title = req.body.title;
                    post.body = req.body.body;
                    post.image_url = req.body.image_url;
                
                    Post.save().then(post => {
                        res.json(post);
                    }).catch(err => {
                        res.json(err);
                    });
                }
            });
        }
        
      });
 

});


// // router.route('/users/:id').patch(function(req,res){

 
// // });

router.route('/posts/:id').delete(function(req,res){
    var post_id = req.params.id;
    Post.findByIdAndRemove({_id: post_id}, function(err, post) {
        if (err) {
            res.json(err);
        } else {
            res.json("Post Deleted successfully");
        }
    })
});

module.exports = router;