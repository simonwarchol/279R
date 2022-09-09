// https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application
// Basic Express/EJX setup via the above tutorial
const express = require("express");
const mongoose = require("mongoose");

// from https://dev.to/alexmercedcoder/expressejsmongodb-zero-to-deploy-tutorial-4ap9
const {Schema, model} = mongoose

// creates a data model for todo items in the database holding just a text string
const todoSchema = new Schema({
    text: String
})
const Todo = model("Todo", todoSchema)

// https://dev.to/alexmercedcoder/expressejsmongodb-zero-to-deploy-tutorial-4ap9
// This loads the mongo url/username/password from the .env file
require("dotenv").config() // Load ENV Variables

// Connect to the database using mongoose
const app = express();
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

console.log(DATABASE_URL)
// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
    .on("open", () => console.log("Connected to Mongoose"))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.log(error))


app.set('view engine', 'ejs');
// Serve the entire static directory so i can put my css there
// Via https://expressjs.com/en/starter/static-files.html
app.use('/static', express.static('static'))

app.get('/', async function (req, res) {
    // Fetches all tasks from todo list
    const tasks = await Todo.find({})
    res.render('main', {tasks: tasks});
})

// via https://dev.to/alexmercedcoder/expressejsmongodb-zero-to-deploy-tutorial-4ap9
// This creates some todo items in the database
app.get("/seed", async (req, res) => {
    // clears the db
    await Todo.remove({})

    // add todos
    await Todo.create([{text: "Wake up"}, {text: "Get out of Bed"}, {text: "Drag a comb across my head"}])

    // redirect to main page
    res.redirect("/")
})
// via https://dev.to/alexmercedcoder/expressejsmongodb-zero-to-deploy-tutorial-4ap9
app.get("/delete/:id", async (req, res) => {
    // by labeling the thing after the slash as `id` i can now reference it by name
    const id = req.params.id
    // delete the task
    await Todo.findByIdAndDelete(id)
    // redirect to main page
    res.redirect("/")
})

app.get("/add", async (req, res) => {
    // the question mark is a way to check if the query parameter exists
    const text = req?.query?.new_item;
    if (text && text !== '') {
        console.log('text', text);
        await Todo.create([{text: text}])
    }
    res.redirect("/")


})


app.listen(7070);
