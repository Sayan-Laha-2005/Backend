import http from 'http'

const Database = [
    {name:"Rohini", age: 10, email:"rohini@gmail.com", amount: 90},
    {name:"Rohan", age: 30, email:"rohan@gmail.com", amount: 190},
    {name:"Sohan", age: 20, email:"Sohini@gmail.com", amount: 900}
];



const server=http.createServer((req,res)=>{
    // res.end("Hello Sara")

    //get post put patch delete


    if(req.method=="POST" && req.url=="/user"){

        //wait as it data  come in small packages
        let body=""
        req.on("data", (chunk)=>{
            body+=chunk;
            // second storage save kar do
        })
        req.on("end",()=>{
            const user = JSON.parse(body);
            Database.push(user);
            res.end("User is Created successfully");
            // js object mein convert ho paaye
        })
    }

    else if(req.method=="GET" && req.url=="/user"){
        res.end(JSON.stringify(Database,null,2))
    }
    else if(req.method=="PATCH" && req.url=="/user"){
        let body = "";
        req.on("data", (chunk)=>{
            body+=chunk;
            // second storage save kar do
        })
        req.on("end",()=>{
            const user = JSON.parse(body);
            const findUser=Database.find((e)=>e.email==user.email)

            Object.assign(findUser,user)
            res.end("Information updated successfully")
        })
    }
// {name:"Rohini", age: 10, email:"rohini@gmail.com", amount: 90}

    // if(req.method=="GET" && req.url=="/user"){
    //     res.end("Hello Sara ... I love you")
    // }
    // else if(req.method=="POST" && req.url=="/user"){
    //     res.end("User Data is posted successfully")
    // }
    // else if(req.method=="PATCH" && req.url=="/user"){
    //     res.end("User Data is patched successfully")
    // }
    // else if(req.method=="PUT" && req.url=="/user"){
    //     res.end("User Data is put successfully")
    // }
    // else if(req.method=="DELETE" && req.url=="/user"){
    //     res.end("User Data is deleted successfully")
    // }else(
    //     res.end("Invalid request")
    // )

})


server.listen(3000,()=>{
    console.log("Server is listening at port 3000")
})