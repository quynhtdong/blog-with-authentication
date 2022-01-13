require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors')
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const saltRounds = 10;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true })

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    posts: [String]
});

const User = mongoose.model("User", userSchema);

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    users: [String]
})

const Post = mongoose.model("Post", postSchema);



app.get("/", function (req, res) {
    res.send("hello")

});

//LOGIN
const loginState = {}
app.get("/signin", function (req, res) {
    res.send(loginState)
})

app.post("/signin", function (req, res) {
    const username = req.body.username
    const password = req.body.password

    User.findOne({ username: username }, function (err, foundUser) {
        if (err) console.log("Username doesn't exist");
        else {
            const admin = 'admin'
            const user = 'user'
            loginState.id = foundUser._id
            loginState.username = foundUser.username
            if (foundUser.username === admin) {
                loginState.role = admin
            } else {
                loginState.role = user
            }
            if (foundUser) {
                bcrypt.compare(password, foundUser.password, function (err, result) {
                    if (result === true) {
                        loginState.loggedIn = true
                    } else loginState.loggedIn = false
                });
            }
        }
    })
})

let current = {};
app.post("/current", function (req, res) {
    current.id = req.body.id
    current.username = req.body.username
})

app.get("/current", function (req, res) {
    res.send(current)
})

//REGISTER
let registerState = true
app.post("/", function (req, res) {
    const username = req.body.username
    const password = req.body.password


    User.findOne({ username: username }, function (err, foundUser) {
        if (err) console.log("Error", err)
        else {
            if (foundUser !== null) {
                console.log("Username already exists");
                registerState = false
            } else console.log("valid username")


            if (registerState) {
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        // Store hash in your password DB.
                        const newUser = new User({
                            username: username,
                            password: hash
                        })

                        newUser.save(function (err) {
                            if (err) return console.log(err)
                        })
                    });
                });

            }
        }
    })

})

//USERS
let users;
app.get("/user", function (req, res) {
    User.find({}, function (err, user) {
        if (err) console.log(err)
        else {
            users = user.map(user => ({
                id: user._id,
                username: user.username
            }));
        }
    })
    setTimeout(function () {
        res.send(users)
    }, 1000);

})

//POSTS
let posts;
app.post("/postDB", function (req, res) {
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content
    })

    newPost.save(function (err) {
        if (err) return console.log(err)
    })

})


app.get("/post", function (req, res) {
    Post.find({}, function (err, post) {
        if (err) console.log(err)
        else {
            posts = post.map(post => ({
                id: post._id,
                title: post.title,
                content: post.content,
                users: post.users
            }));
        }
    })
    setTimeout(function () {
        res.send(posts)
    }, 1000);

})

//DELETE
app.delete("/delete", function (req, res) {
    Post.deleteMany({}).then(function () {
        console.log("Data deleted"); // Success 
    }).catch(function (error) {
        console.log(error); // Failure 
    });
})

app.post("/deleteOne", function (req, res) {
    const title = req.body.title
    Post.deleteOne({ title: title })
    .then(function () {
        Post.find({}, function (err, post) {
            if (err) console.log(err)
            else {
                posts = post.map(post => ({
                    id: post._id,
                    title: post.title,
                    content: post.content,
                    users: post.users
                }));
            }
        })
        // setTimeout(function () {
        //     res.send(posts)
        // }, 1000);
    })
})

//UPDATE

app.post("/update", function (req, res) {
    const id = req.body.id
    const title = req.body.title
    const content = req.body.content
    Post.updateOne(
        { _id: id },
        { $set: { title: title, content: content } },
        function (err, result) {
            if (!err) res.send("successfully updated")
            else res.send(err)
        })

})


//AUTH

app.post("/auth", function (req, res) {
    const username = req.body.username
    const post_id = req.body.post_id
    Post.updateOne(
        { _id: post_id },
        { $push: { users: username } },
        function (err, result) {
            if (!err) {
                res.send(result)
            } else res.send(err)
        })

})

app.post("/cancel", function (req, res) {
    const username = req.body.username
    const post_id = req.body.post_id
    Post.updateOne(
        { _id: post_id },
        { $pull: { users: username } },
        function (err, result) {
            if (!err) {
                res.send(result)
            } else res.send(err)
        })
       
})

app.get("/set", function(req, res){
    Post.find({}, function (err, post) {
        if (err) console.log(err)
        else {
            posts = post.map(post => ({
                id: post._id,
                title: post.title,
                content: post.content
            }));
        }
    })
    setTimeout(function () {
        res.send(posts)
    }, 1000);
})


//ONE POST
const message = 'You do not have access to view this post'
app.post("/single", function (req, res) {
    const user = req.body.user
    const post_id = req.body.post_id
    Post.findOne({ _id: post_id }, function (err, post) {
        if (err) console.log(err);
        else {
            if (post.users.includes(user)) {
                console.log(post);
                res.send(post)
            } else {
                console.log(message);
                res.send(message)
            }
        }
    })

})



app.listen(8000, function () {
    console.log("The server started on port 8000");
});