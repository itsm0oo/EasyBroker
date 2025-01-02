const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");

const app = express();
const SECRET_KEY = "your_secret_key"; // استخدم مفتاح سري قوي
const mongoUri = "mongodb+srv://easybroker:H3JPNcG03K4T3MLd@cluster0.mongodb.net/easybroker?retryWrites=true&w=majority";
 // رابط قاعدة البيانات

app.use(cors());
app.use(bodyParser.json());

let db;
MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    db = client.db("easybroker"); // اسم قاعدة البيانات
    console.log("Connected to database");
  })
  .catch((err) => console.error(err));

// تسجيل المستخدم
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.collection("users")
    .insertOne({ email, password: hashedPassword })
    .then(() => res.status(201).send({ message: "User registered successfully!" }))
    .catch((err) => res.status(500).send({ error: "Error registering user", details: err }));
});

// تسجيل الدخول
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.collection("users").findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  res.send({ message: "Sign-in successful", token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
