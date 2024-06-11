let express = require("express")
let app = express()
let path = require("path")
let userModel = require("./models/users")
const { model } = require("mongoose")

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))

app.get("/",function(req,res){
    res.render("home")
})

// cReate 
app.post("/create",async function(req,res){
    let {name,email,image} = req.body;
    await userModel.create({name,email,image})
    res.redirect("/users")
})

app.get("/users", async function(req,res){
    let user = await userModel.find()
    res.render("user",{user})
})

app.get("/delete/:id",async function(req,res){
     await userModel.findOneAndDelete({_id: req.params.id})
    res.redirect("/users")
})

app.get("/edit/:id", async function(req,res){
    let user = await userModel.findOne({_id: req.params.id})
    res.render("edit",{user})
})

app.post("/update/:id",async function(req,res){
    let {name,email,image} = req.body;
     await userModel.findOneAndUpdate({_id: req.params.id},{name,email,image},{new:true})
    res.redirect("/users")
})

app.listen(5000,()=>console.log("port 5000 is running ...."))