import express from "express"
import mongoose from "mongoose"
import User from "./userSchema.js"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import bcrypt from "bcrypt"

import dns from "node:dns";

dns.setServers(["192.168.0.1"]);


await mongoose.connect("mongodb+srv://sayanlahaclash_db_user:<password>@cluster0.irxjk7z.mongodb.net/LearningAuth")
const app=express()
app.use(cookieParser())
app.use(express.json())


app.post("/signup",async (req,res)=>{
    const {name,age,email,password}=req.body
    const hashPassword=await bcrypt.hash(password,12)
    const u=await User.create({
        name,age,email,password:hashPassword
    });


    //token creation 
    //payload , secret key ,optional field

    const token=jwt.sign({
        email:email,
        name:name
    },
    "Sara@454",
    {expiresIn:"1hr"}
    // expiresIn  --> when it was created and when it will expire
);

// cookie for taking to browser
res.cookie("token",token,{
    httpOnly:true,
    secure:false,
    maxAge: 60*60*1000 // created at ,expires
})

res.json({
    message: "User Profile is created"
})

})


app.get("/user", async (req,res)=>{
    //verify token 

    const {token} =req.cookies

    // we need to verify token

    const payload=jwt.verify(token,"Sara@454")

    const u=await User.findOne({
        email:payload.email
    })

    if(u){
        res.json({
            message:"User detail",
            data:u
        })
    }else{
        res.json({
            message:"User not found"
        })
    }


})


app.post("/login",async (req,res)=>{
    const {email,password}=req.body

    //verify user
    const u=await User.findOne({email:email})
    
    if(u){
        const isMatch=await bcrypt.compare(password,u.password)
        if(isMatch){
        // we assign token
        const token=jwt.sign({
            email:email,
            name:u.name
        },
        "Sara@454",
        {expiresIn:"1hr"}
    );

    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        maxAge:60*60*1000
    });
    res.json({
        message:"User login successful"
    })
    }else{
        res.json({
            messsage:"Invalid credentials"
        })
    }

    }else{
        res.json({
            messsage:"Invalid credentials"
        })
    }
    
})




app.listen(3000,()=>{
    console.log("Server is listening at port 3000")
})
