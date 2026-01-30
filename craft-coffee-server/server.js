const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

server.use(middlewares);

// Custom ID generator - integer IDs
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    const db = router.db;
    const collection = req.path.slice(1); // remove leading slash

    if (db.get(collection).value()) {
      const items = db.get(collection).value();
      const maxId = items.length > 0 ? Math.max(...items.map((item) => item.id || 0)) : 0;
      req.body.id = maxId + 1;
    }
  }
  next();
});

server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running on http://localhost:3001");
  console.log("Endpoints:");
  console.log("  GET    http://localhost:3001/ingredients");
  console.log("  GET    http://localhost:3001/coffees");
  console.log("  POST   http://localhost:3001/ingredients");
  console.log("  POST   http://localhost:3001/coffees");
});

// const jsonServer = require("json-server");
// const server = jsonServer.create();
// const router = jsonServer.router("db.json");
// const middlewares = jsonServer.defaults();

// // CORS-ის გასააქტიურებლად
// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Accept");

//   // Preflight მოთხოვნების სწრაფი პასუხი
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(204);
//   }

//   next();
// });

// server.use(middlewares);

// // Custom ID generator - integer IDs
// server.use(jsonServer.bodyParser);
// server.use((req, res, next) => {
//   if (req.method === "POST") {
//     const db = router.db;
//     const collection = req.path.slice(1); // remove leading slash

//     if (db.get(collection).value()) {
//       const items = db.get(collection).value();
//       const maxId = items.length > 0 ? Math.max(...items.map((item) => item.id || 0)) : 0;
//       req.body.id = maxId + 1;
//     }
//   }
//   next();
// });

// server.use(router);

// server.listen(3001, () => {
//   console.log("JSON Server is running on http://localhost:3001");
//   console.log("Endpoints:");
//   console.log("  GET    http://localhost:3001/ingredients");
//   console.log("  GET    http://localhost:3001/coffees");
//   console.log("  POST   http://localhost:3001/ingredients");
//   console.log("  POST   http://localhost:3001/coffees");
// });
