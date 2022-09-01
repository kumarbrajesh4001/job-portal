const express = require('express');
const fs = require('fs').promises;
const server = express();

const PORT = 4000;

server.get("/*", (req, res) => {
    console.log("request: "+JSON.stringify(req.params));
    console.log(req.url);
    handler(req, res);
});

async function handler(req, res){
    var data = await readAndSendJson(req, res);
    // res.json({message: "treeJson"});
    // console.log("data: "+ data);
    if(data)
    res.json(JSON.parse(data));
}

async function readAndSendJson(req, res){
    var jsonData;
    jsonData = await fs.readFile(__dirname + "/" + "resources" + req.url + ".json", (err, data) => {
        if (err) {
            console.error("Error in reading json file...");
            throw err;
        }
        console.log("data read - why it is not printed? : "+data);
        // return data;
    }).catch(error => {
        res.status(400).send();
        res.end();
    });
    console.log("returning from readAndSendJson function...");
    return jsonData;
}

server.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
 });

 server.listen(PORT, "localhost", () => {
     console.log(`Server listening on port ${PORT}`);
 })