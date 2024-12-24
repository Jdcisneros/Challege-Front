"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_openid_connect_1 = require("express-openid-connect");
const auth_1 = __importDefault(require("./config/auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const { auth } = require("express-openid-connect");
app.use(auth(auth_1.default));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
app.get('/profile', (0, express_openid_connect_1.requiresAuth)(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user, null, 2));
});
app.use("/api/todo", (0, express_openid_connect_1.requiresAuth)(), todoRoutes_1.default);
db_1.default.sync({ force: false });
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
