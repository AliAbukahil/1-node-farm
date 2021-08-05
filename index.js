const fs = require("fs");
// creating a Simple Web Server
const http = require("http");
// for Routing
const url = require("url");
////////////////////////////////////////////////////////////////////////
// Files
// How to write a file in Node {Blocking, Synchronous Way}
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we Know about the avocado: ${textIn}.\nCreated on ${Date.now()}`
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File Written");

// How to write a file in Node {Non-Blocking, Synchronous Way}
// in the readFile we don't have to specify the file encoding which is "utf-8"

//     fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//         // if(err) return console.log("ERORRRRRRR");
//         fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//             console.log(data2);
//                 fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//                     console.log(data3);
//                         fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", error => {
//                             console.log("your File has been written");
//                     });
//                 });
//             });
//         });

// console.log("Will read file");
////////////////////////////////////////////////////////////////////
// Server
// Creating a Simple Web Server 
// const server = http.createServer((req, res) => {
//     res.end("Hello from the Server!")
// });

// server.listen(8000, "127.0.0.1", () => {
//     console.log("listening to request on port 8000");
// })
////////////////////////////////////////////////////////

// Server with Routing url
// Creating a Simple Web Server 
// const server = http.createServer((req, res) => {
//     const pathName = req.url;
//     if(pathName === "/" || pathName === "/overview") {
//         res.end("This is the overview!")
//     } else if (pathName === "/product") {
//         res.end("This is the product!")
//     } else {
//         res.writeHead(404, {
//             "Content-type": "text/html",
//             "my-own-header": "Hello World"
//         });
//         res.end("<h1>page not found!</h1>")
//     }
// });
// server.listen(8000, "127.0.0.1", () => {
//     console.log("listening to request on port 8000");
// })
////////////////////////////////////////////////////////

// Building a (very) Simple API
    // SERVER
    const replaceTemplte = (temp, product) => {
        let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
        output = output.replace(/{%IMAGE%}/g, product.image);
        output = output.replace(/{%PRICE%}/g, product.price);
        output = output.replace(/{%FROM%}/g, product.from);
        output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
        output = output.replace(/{%QUANTITY}/g, product.quantity);
        output = output.replace(/{%DESCRIPTION%}/g, product.description);
        output = output.replace(/{%ID%}/g, product.id);

        if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
        return output;
    }

    const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
    const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
    const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");
    const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
    const dataObj = JSON.parse(data);

    const server = http.createServer((req, res) => {

    const {query, pathname} = (url.parse(req.url,true));


    //Overview page
    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200, {"Content-type": "text/html",});

        const cardsHtml = dataObj.map(el => replaceTemplte(tempCard, el)).join("");
        const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
        res.end(output)

    // Proudct page
    } else if (pathname === "/product") {
        res.writeHead(200, {"Content-type": "text/html",});
        const product = dataObj[query.id]
        res.end("This is the product!")

    // API
    } else if (pathname === "/api") {
        res.writeHead(200, {"Content-type": "application/json",})
        res.end(data);

    // NOT Found
    } else {
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-own-header": "Hello World"
        });
        res.end("<h1>page not found!</h1>")
    }
});
server.listen(8000, "127.0.0.1", () => {
    console.log("listening to request on port 8000");
})

////////////////////////////////////////////////////7
