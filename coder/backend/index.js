const http = require('http')


const gitHub = []

const port = 9000

const server = http.createServer((req, res) => {
    // res.end("Hello Coders")

    // const str=req.url
    // let str1=""

    // for(let i=1;i<str.length;i++){
    //     str1+=str[i]
    // }

    // let number=Number(str1)

    const number = Number(req.url.slice(1))

    if (isNaN(number) || number <= 0) {
        res.end("Invalid")
        return
    }
    if (number > 100) {
        res.end("You can not fetch more than 100 user")
        return
    }


    const arr = []

    for (let i = 0; i < number; i++) {
        arr.push(gitHub[i])
    }

    res.end(JSON.stringify(arr))

});


server.listen(port, () => {
    console.log("I am listening at port 3000")
})

