import { createServer } from 'node:http';

const server = createServer(function (req, res) {
  console.log(req);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
})

server.listen(8000, "localhost", ()=>{
  console.log("sta");
});


