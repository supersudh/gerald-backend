import express from "express";
import cors from "cors";

import routes from "./controller";

const app = express();
app.use(cors());
const port = process.env.PORT || 8080; // default port to listen

app.use(express.json());

const router = express.Router();

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!!");
});

app.use('/', routes(router));

// start the Express server
app.listen( port, () => {
  // tslint:disable-next-line:no-console
  console.log( `server started at http://localhost:${ port }` );
} );
