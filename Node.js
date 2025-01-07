// server.js
const express = require("express");
const bodyParser = require("body-parser");
const xlsx = require("xlsx");
const app = express();
const port = 4000;

app.use(bodyParser.json());

// Read the Excel file (assuming it's in the same directory)
const workbook = xlsx.readFile("users.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const users = xlsx.utils.sheet_to_json(sheet);

// Sign-Up Endpoint
app.post("/signup", (req, res) => {
    const { email, password } = req.body;

    // Check if email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).send("An account with this email already exists.");
    }

    // Add new user to the Excel file
    users.push({ email, password });

    // Write back to the Excel file
    const newSheet = xlsx.utils.json_to_sheet(users);
    workbook.Sheets[workbook.SheetNames[0]] = newSheet;
    xlsx.writeFile(workbook, "users.xlsx");

    res.send("Account created successfully!");
});

// Sign-In Endpoint
app.post("/signin", (req, res) => {
    const { email, password } = req.body;

    // Find the user by email and check password
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        res.send("Sign In successful!");
    } else {
        res.status(400).send("Invalid email or password.");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
