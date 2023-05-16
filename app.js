const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");

const app = express();

var nl2br = require('nl2br');

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static("public"));

app.use(express.static(__dirname + '/public'));

// For the login : Email Password
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser: true});

const userSchema = {
    email: String,
    password: String 
};

const User = new mongoose.model("User",userSchema);


// For the content to be store in the database

const blogSchema = {
    title: String, 
    content: String
};

const Post = new mongoose.model("Post",blogSchema);

var posts =[];

app.get("/",function(req,res){
    res.render("login");
});

app.get("/login",function(req,res){
    res.render("login");
});

app.get("/register",function(req,res){
    res.render("register");
});

app.post("/register",function(req, res){
    const newUser = new User({
        password: req.body.password,
        email: req.body.username
    });

    newUser.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.render("home");
        }
    });
});

var username1 ;
app.post("/login",function(req,res){
    username1 = req.body.username;
    const password = req.body.password;

    // Collection.findOne({condition} , {what to do with results})
    User.findOne({email: username1} , function(err,foundUser){
        if(err){
            console.log(err);
        }
        else{
            if(foundUser){
                if(foundUser.password === password){
                    res.render("home");
                }
            }
        }
    })


})



app.get("/home",function(req,res){
    // we have changed from home to start
    res.render("home");
});


app.get("/about",function(req,res){
    res.render("about");
});

app.get("/compose", function(req,res){
    res.render("compose");
});

app.get("/posts", function(req,res){
    // res.render("post", {postArr : posts});

    Post.find({}, function(err, posts){
        res.render("post", {
          postArr: posts
          });
      });


});

app.get("/posts/:postName" , function(req,res){
    var check = req.params.postName;
    var flag = false;
    var partic = [];
    

    Post.find({title : check}, function(err, posts){
        res.render("single", {
            partic: posts
        });
      });
    
    // posts.forEach(function(element){
    //     if(check == _.lowerCase(element.title)){
    //         var itm = {
    //             title: element.title ,
    //             content: element.content
    //         }
    //         partic.push(itm);
    //     }
    // });
    // res.render("single", {
    //     partic:partic
    // });

});

app.post("/compose",function(req, res){
    const newPost = new Post({
        title: req.body.postTitle ,
        content: req.body.postBody
    });

    newPost.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("posts");
        }
    });


    // posts.push(post);
    // res.redirect("/posts");
});



app.listen(3000, function(){
    console.log("Server started on port 3000");
});