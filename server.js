const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

// إنشاء التطبيق
const app = express();
app.use(cors());
app.use(bodyParser.json());

// الاتصال بقاعدة بيانات MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// مخطط المستخدم
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// مسار التسجيل (Sign Up)
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    // التحقق من وجود المستخدم بالفعل
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'المستخدم موجود بالفعل' });
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء مستخدم جديد
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // إنشاء توكن (JWT)
    const token = jwt.sign({ id: newUser._id }, 'secretkey', { expiresIn: '1h' });

    res.json({ message: 'تم إنشاء الحساب بنجاح', token });
});

// مسار تسجيل الدخول (Sign In)
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'بيانات الدخول غير صحيحة' });
    }

    // مقارنة كلمة المرور
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'بيانات الدخول غير صحيحة' });
    }

    // إنشاء توكن (JWT)
    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });

    res.json({ message: 'تم تسجيل الدخول بنجاح', token });
});

// بدء الخادم
app.listen(5000, () => {
    console.log('الخادم يعمل على http://localhost:5000');
});
