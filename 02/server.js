const express = require("express");
const connectDB = require("./db");
const User = require("./models/user_model");

// const { login, getProfile, transferMoney, register } = require("./api_local");
const { login, getProfile, transferMoney, register } = require("./apis")

async function startServer() {
    await connectDB();

    const users = await User.find();
    console.log("Users from DB:", users);

    const app = express();
    app.use(express.json());

    app.use((req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        console.log("Body:", req.body);
        next();
    });

    app.post("/register", async (req, res) => {
        try {
            console.log("Register attempt:", req.body.email);

            const { name,
                email,
                password,
                role } = req.body;
            const user = await register(name,
                email,
                password,
                role);

            console.log("Register success:", user.id);
            res.json({ success: true, user });

        } catch (err) {
            console.log("Register failed:", err);
            res.status(400).json({ success: false, message: err });
        }
    });


    app.post("/login", async (req, res) => {
        try {
            console.log("Login attempt:", req.body.email);

            const { email, password } = req.body;
            const user = await login(email, password);

            console.log("Login success:", user.id);
            res.json({ success: true, user });

        } catch (err) {
            console.log("Login failed:", err);
            res.status(400).json({ success: false, message: err });
        }
    });

    app.get("/profile/:id", async (req, res) => {
        try {
            const user = await getProfile(Number(req.params.id));
            res.json({ success: true, user });
        } catch (err) {
            res.status(404).json({ success: false, message: err });
        }
    });

    app.post("/transfer", async (req, res) => {
        try {
            const { from, to, amount } = req.body;
            const result = await transferMoney(from, to, amount);
            res.json(result);
        } catch (err) {
            res.status(400).json({ success: false, message: err });
        }
    });

    app.listen(3000, () => {
        console.log("Server running on http://localhost:3000");
    });
}


startServer()