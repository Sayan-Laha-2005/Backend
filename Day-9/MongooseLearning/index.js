import express from "express"
import mongoose from "mongoose";
import Customer from "./buildSchema.js ";
import Users from "./data.js";

import dns from "node:dns";

dns.setServers(["192.168.0.1"]);

const app = express();

app.use(express.json()); // Important!

await mongoose.connect("mongodb+srv://sayanlahaclash_db_user:ACgsA5savFH14jRx@cluster0.irxjk7z.mongodb.net/Thunder")

//create a customer
app.post("/customer", async (req, res) => {
    const customer = await Customer.create(req.body)
    res.json({
        message: "user is created successfully",
        customer: customer
    })
})


//filter

app.get("/customer/filter", async (req, res) => {
    // const {city}=req.query;

    // req.query={city:"Bangalore",accountType:"current"}

    const customer = await Customer.find(req.query)
    res.json(customer)
})

//create customer in bulk
app.post("/customer/bulk", async (req, res) => {
    const customer = await Customer.insertMany(Users)
    res.json({
        message: "user is created successfully",
        customer: customer
    })
})


// get info of all customer
app.get("/customer", async (req, res) => {
    const customer = await Customer.find()
    res.json({
        message: "All user info is here",
        customer: customer
    })
})


// fetch particular customer info on basis of its accountNumber

app.get("/customer/:accountNumber", async (req, res) => {
    const accountNum = req.params.accountNumber;
    const customer = await Customer.findOne({ accountNumber: accountNum })
    if (!customer) {
        res.json({
            message: "customer does not exist",
            customer: customer
        })
    } else {

        res.json({
            message: "customer info is here",
            customer: customer
        })
    }
})


//delete on the basis of accountNumber
app.delete("/customer/:accountNumber", async (req, res) => {
    const accountNum = req.params.accountNumber;
    const customer = await Customer.findOneAndDelete({ accountNumber: accountNum })
    if (!customer) {
        res.json({
            message: "customer does not exist",
            customer: customer
        })
    } else {

        res.json({
            message: "customer deleted",
            customer: customer
        })
    }
})


//update the city of the user
app.patch("/customer/:accountNumber", async (req, res) => {

    const { city } = req.body;

    const user = await Customer.findOneAndUpdate({
        accountNumber: req.params.accountNumber,
    }, {
        city: city,
        age: 29
    }, {
        new: true
    })
    res.json(user)

})

// {filter->kis k basis pe,{update},{new:true}}


//balance ko deposite karna hai account mai
app.patch("/customer/deposit/:accountNumber", async (req, res) => {
    const { balance } = req.body;

    const user = await Customer.findOne({ accountNumber: req.params.accountNumber })

    user.balance += balance

    await user.save()
    res.json(user)
})


app.patch("/customer/withdraw/:accountNumber", async (req, res) => {
    const { balance } = req.body;

    const user = await Customer.findOne({ accountNumber: req.params.accountNumber })
    if (user.balance >= balance) {

        user.balance -= balance
        
        await user.save()
        res.json(user)
    }else{
        res.json({
            message:"Insufficient fund"
        })
    }
})



app.listen(3000, () => {
    console.log("Server is listening at port 3000")
})

