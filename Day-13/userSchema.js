import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 20,
        trim: true,
        required: true,
    },
    age: {
        type: Number,
        min: 18,
        max: 100
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type:String
    }
    

},{Timestamp:true})

const User=mongoose.model("User",userSchema)

export default User;

// index , unique ,sparse ->index create kore in B+ tree


// index : true 
// unique : true  ---> i will allow unique value and create index around it even if it is null it will get created
//sparse : true ---> if user has entered value then only it will create index around it


// email : unique : true ,required : true: email is compulsory and unique for all and index is created accordingly

// Phone number :  sparse : true unique : true : phone number is not mandatory but if given index is created around it 
