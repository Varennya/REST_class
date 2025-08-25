const express = require("express");
const app = express()
const port = 8080;
const path = require("path");

app.use(express.urlencoded({ extended: true }));
//the above line allows your Express app to read form data (req.body) properly, and with extended: true, it can handle more complex/nested data structures.


app.set("view engine ", "ejs");
app.set("views", path.join(__dirname, "views"));
// the above line tells Express where to look for view/template files (like .ejs, .pug, or .hbs).


app.use(express.static(path.join(__dirname, "public")));
// the above line tells Express where to serve static assets from. Static files include CSS, images, JavaScript, fonts, etc.

let posts = [
    {
        id: "1a",
        username: "apna college ",
        content: "I love coding "
    },
    {
        id: "2b",
        username: "shradha Khapra  ",
        content: "Hardwork is the road to success "
    },
    {
        id: "3c",
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
    posts.push({ username, content });  // pushes the above data in the content array 
    res.redirect("/posts"); // redirect to the /posts path 
});

app.get("/posts/:id" , (req,res) => {
    let { id } = req.params ; 
    let post = posts.find((id) => id === path.id);
    res.send("request working")
})

app.listen(port, () => {
    console.log("Listening to port : 8080");
});