const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const filePath = path.join(__dirname, "data", "account.txt");

// Ensure the data folder exists
if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath));
}

// Sign Up Endpoint
app.post("/signup", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Email and password are required.");
    }

    // Read accounts from the file
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err && err.code !== "ENOENT") {
            console.error(err);
            return res.status(500).send("Error reading account file.");
        }

        const accounts = data ? data.split("\n").filter(Boolean).map(line => JSON.parse(line)) : [];

        // Check if email already exists
        if (accounts.some(account => account.email === email)) {
            return res.status(400).send("Account already exists with this email.");
        }

        // Append new account to file
        const newAccount = { email, password };
        fs.appendFile(filePath, JSON.stringify(newAccount) + "\n", err => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error saving account.");
            }
            res.status(201).send("Account created successfully!");
        });
    });
});

// Sign In Endpoint
app.post("/signin", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Email and password are required.");
    }

    // Read accounts from the file
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err && err.code !== "ENOENT") {
            console.error(err);
            return res.status(500).send("Error reading account file.");
        }

        const accounts = data ? data.split("\n").filter(Boolean).map(line => JSON.parse(line)) : [];

        // Validate credentials
        const account = accounts.find(acc => acc.email === email && acc.password === password);
        if (account) {
            res.status(200).send("Sign In successful!");
        } else {
            res.status(401).send("Invalid email or password.");
        }
    });
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


