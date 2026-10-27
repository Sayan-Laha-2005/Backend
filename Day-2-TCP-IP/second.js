const http=require('http')


const server= http.createServer((req,res)=>{
const path=req.url.split('/')

//path=["","add","num1","num2"]

const operation=path[1]
const num1=Number(path[2])
const num2=Number(path[3])

if(operation==="add"){
    res.end(JSON.stringify(num1+num2))
}
else if(operation==="sub"){
    res.end(JSON.stringify(num1-num2))
}
else if(operation==="mul"){
    res.end(JSON.stringify(num1*num2))
}
else if(operation==="div"){
    res.end(JSON.stringify(num1/num2))
}
else{
    res.end("Invalid Operation")
}
})

server.listen(9000,()=>{
    console.log(
        "server is listening at 9000 port"
    )
})