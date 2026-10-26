const http=require('http')
const url=require('url')

const port=7000

const Database = [{name:"Sayan",age:20,email:"sara@gmail.com"},
    {name:"Sara",age:20,email:"sayan@gmail.com"}
]


function createUser(user){
    Database.push(user);
}

// deletion ->email user={email:"sara@gmail.com"}

function deleteUser(user){
    //user.email

    let index=0

    for(let i=0;i<Database.length;i++){
        if(Database[i].email==user.email){
            // index=i;
            Database.splice(i,1);
            break;
        }
    }
}


//update -> user={email:"sara@gmail.com",age:21}
function patchUpdate(user){
for(let i=0;i<Database.length;i++){
    if(Database[i].email==user.email){

    }
}
}

const server=http.createServer((req,res)=>{
    // if(req.url=="/userInfo"){
    //     res.end(JSON.stringify(Database))
    // }else if(req.url=="/createUser"){
    //     Database.push({name:"Letter",age:5,email:"sayra@gmail.com"})
    //     res.end("User created")
    // }
    // else if(req.url=="/deleteUser"){
    //     Database.pop()
    //     res.end("User deleted")
    // }

    console.log(req.url) 
    const parsed = url.parse(req.url, true);
    const operation = parsed.pathname.slice(1);


    if(operation=="deleteUser"){
        DeleteUser(parsed.query);
        res.end("I have delete the user");
        return;
    }

   else if(operation == "createUser"){
        createUser(parsed.query);
        res.end("User is created");
        return;
   }

   else if(operation == "getUser"){
        res.end(JSON.stringify(Database));
        return;
   }

    res.end("I am available")

})


server.listen(port,()=>{
    console.log(`Server is listening at port ${port}`)
})
