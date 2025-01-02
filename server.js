const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// مسار ملف الحسابات
const accountsFilePath = "./accounts.txt";

// دالة للتحقق من الحساب
function validateAccount(email, password) {
  try {
    const accounts = fs.readFileSync(accountsFilePath, "utf8").split("\n");
    for (let account of accounts) {
      const [storedEmail, storedPassword] = account.trim().split(",");
      if (storedEmail === email && storedPassword === password) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error reading accounts file:", error);
    return false;
  }
}

// تسجيل الدخول
app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (validateAccount(email, password)) {
    res.status(200).send({ message: "Sign In successful!" });
  } else {
    res.status(401).send({ message: "Invalid email or password." });
  }
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
