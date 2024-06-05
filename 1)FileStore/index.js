const exp = require("constants");
const express = require("express");
const app = express();
const fs = require("fs")


app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",function(req,res){
    fs.readdir("./files",function(err,files){
       
        res.render("Home",{files: files})
    })


});


app.post("/create",function(req,res){
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.description, function(err){
        res.redirect("/")
    } )
})

app.get("/files/:filename",function(req,res){
    fs.readFile(`./files/${req.params.filename}`,'utf-8',function(err,filedata){
        res.render("show",{filename:req.params.filename, filedata:filedata})
    })
})

app.get("/edit/:filename",function(req,res){
    res.render("edit",{oldName: req.params.filename})
})

app.post("/update",function(req,res){
    fs.rename(`./files/${req.body.oldFileName}`, `./files/${req.body.newFileName.split(" ").join("")}.txt`, function(err){
        res.redirect("/")
    })
})

app.get("/delete/:filename",function(req,res){
    fs.unlink(`./files/${req.params.filename}`,function(err){
        res.redirect("/")
    })
})




app.listen(5000,()=>console.log("5000 is running..."))