"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const controller_1 = __importDefault(require("./controller"));
const app = express_1.default();
app.use(cors_1.default());
const port = 8080; // default port to listen
app.use(express_1.default.json());
const router = express_1.default.Router();
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!!");
});
app.use('/', controller_1.default(router));
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map