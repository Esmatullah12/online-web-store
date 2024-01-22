const http = require("http")
const fs = require('fs')

const server = http.createServer((req, res) =>{
    const url = req.url;
    const method = req.method;
    if (url === "/"){
        res.write("<html>")
        res.write("<head><title>Node</title></head>")
        res.write("<body><form method='POST' action='/message'><input type='text' name='message'><button>Send</button></form></body>")
        res.write("</html>")
    }else if(url === '/message' && method === "POST"){
        const body = []
        req.on('data', (chunk) => {
            body.push(chunk)
        })
        req.on('end', () =>{
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1]
            fs.writeFileSync('message.txt', message)
        })
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
    }
    // res.setHeader('Content-type', 'html/text')
    // res.write("<h1>your Message has been successfully send</h1>")
    // res.end
    
})

server.listen(2000)