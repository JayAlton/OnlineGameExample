const http = require("http");
const app = require("express")();
app.get("/", (req,res)=> res.sendFile(__dirname + "/index.html"))
app.listen(9091, ()=>console.log("Listening on port 9091"));
const websocketServer = require("websocket").server
const httpServer = http.createServer();
httpServer.listen(9090, () => console.log("Listening on 9090"))
//hashmap
const clients = {};

const wsServer = new websocketServer({
    "httpServer": httpServer
})
wsServer.on("request", request => {
    //connect
    const connection = request.accept(null, request.origin);
    connection.on("open", () => console.log("Connection Opened"))
    connection.on("close", () => console/log("Connection Closed"))
    connection.on("message", message => {
        const result = JSON.parse(message.utf8Data)
        //Received Msg from client
        console.log(result)
    })

    //generate a new clientID
    const clientID = guid();
    clients[clientID] = {
        "connection" : connection
    }
    
    const payLoad = {
        "method": "connect",
        "clientID": clientID
    }
    // send back the client connect
    connection.send(JSON.stringify(payLoad))
})



function S4() {
    return(((1+Math.random())*0x10000)|0).toString(16).substring(1)
}

const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substring(1))