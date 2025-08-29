const express = require("express");
const app = express()
const port = 8080;
const path = require("path");
// This loads Node.js’s built-in path module.
const { v4: uuidv4 } = require('uuid');
// this loads the UUID package in the code which gives a universal unique ID 

const methodOverride = require('method-override')
app.use(methodOverride("_method"));
// this is used to override methods
app.use(express.urlencoded({ extended: true }));
//the above line allows your Express app to read form data (req.body) properly, and with extended: true, it can handle more complex/nested data structures.
app.use(express.json());

 


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// the above line tells Express where to look for view/template files (like .ejs, .pug, or .hbs).


app.use(express.static(path.join(__dirname, "public")));
// the above line tells Express where to serve static assets from. Static files include CSS, images, JavaScript, fonts, etc.

let posts = [
    {
        id: uuidv4(),
        username: "apna college ",
        content: "I love coding"
    },
    {
        id: uuidv4(),
        username: "shradha Khapra  ",
        content: "Hardwork is the road to success "
    },
    {
        id: uuidv4(),
        username: "varennya  ",
        content: "Keep reading "
    },

];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

//this line is to get the new post page (/posts/new)
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// this line is to send data (POST ) to the main page i.e (/post)
app.post("/post", (req, res) => {
    let { username, content } = req.body;
    // the above line destructs the object written by the req.body in 2 different variables  
    let id = uuidv4(); // creates the new Id for new posts 
    posts.push({ id , username, content });  // pushes the above data in the content array 
    res.redirect("/posts"); // redirect to the /posts path 
});

app.get("/posts/:id" , (req,res) => {
    
    let { id } = req.params ; 
    // console.log(id); 
    let post = posts.find((p) => id === p.id); // finds if the id given by user (i.e p here ) is present in the p.ar
    res.render("show.ejs" , {post});
});


// for editing the content of the form PATCH request is used
app.patch("/posts/:id" , (req,res) => {
    let {id } = req.params ; 
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post); 
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req , res) => {
    let {id } = req.params ; 
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs" , {post});
});

app.delete("/posts/:id" , (req,res) => {
    let {id } = req.params; 
     posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts")

});

app.listen(port, () => {
    console.log("Listening to port : 8080");
});