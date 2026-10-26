import express from 'express'


const app=express()

const Database = [];

app.use(express.json());  

app.get("/",(req,res)=>{
    res.send("Welcome home Sara ")
})

app.get("/user",(req,res)=>{
    res.send("Hello Sara")
})

app.post("/user",(req,res)=>{
    console.log(req.body)
    res.send("Post created");
})

app.delete("/user",(req,res)=>{
    res.send("I have deleted");
})

app.listen(3000,()=>{
    console.log("I am listening at port 3000")
})
