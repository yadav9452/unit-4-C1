const express= require("express");

const app=express();

app.use(logger);
app.get("/books",(req,res)=>{
    return res.send({route:"/books"});
});

app.use(checkPermission);

app.get("/libraries",(req,res)=>{
    return res.send({ route: "/libraries", permission: req.permission});
});


app.get("/authors", (req,res)=>{
    return res.send({ route: "/authors", permission: req.permission});
});

function logger(req,res,next){
    console.log("before route handler");
    next();
    console.log("after route handler");
}

function checkPermission(req,res,next){
    if(req.path=="/authors"){
        console.log("checkPermission author");
        req.permission="True";
    }
    else if(req.path=="/libraries"){
        console.log("checkPermission librarian");
        req.permission="True";
    } 
    next();    
}

app.listen(5000,()=>{
    console.log("Listen on port 5000");
})