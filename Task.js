const express = require("express")
const app = express()
const fs = require("fs")
const path = require("path")

const port = 1010
const folderPath = "./files"

if (!fs.existsSync(folderPath)){
    fs.mkdirSync(folderPath, {recursive: true})
}

app.get("/create-file",respondCreateFile);
app.get("/list-file",respondListFile);


function respondCreateFile(req, res){
    const now = new Date()
        const fileName = `${now.toISOString().replace(/:/g, "-")}.txt`
        const filepath = path.join(folderPath, fileName)

        fs.writeFile(filepath, now.toString(), (err)=>{
            if(err){
                res.writeHead(500);
                res.end("server error");
                return;
            }
            res.writeHead(200, {"Content-Type": "plain/text"})
            res.end(`file created: ${fileName}`)

        })
}

function respondListFile (req,res){
    fs.readdir(folderPath, (err, Files)=>{
        if(err){
            res.writeHead(500);
            res.end("server  error");
            return;
            
        }
       const txtFiles = Files.filter((file)=> path.extname(file) === ".txt")
       res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify(txtFiles))
    }) 
}

app.listen(port, ()=>{
    console.log(`port:${port}`)
})
