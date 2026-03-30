import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Пользователь не найден" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: 'Неверный пароль' })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "Пользователь уже существует" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Введите корректный email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Пароль должен быть минимум 8 символов" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            phone: phone || '',
            notifications: true
        })

        const user = await newUser.save()
        const token = createToken(user._id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId).select('-password');

        if (!user) {
            return res.json({ success: false, message: "Пользователь не найден" })
        }

        res.json({ success: true, user })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const { userId, name, phone, city, street, notifications } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "Пользователь не найден" })
        }

        if (name) user.name = name;
        if (phone !== undefined) user.phone = phone;
        if (city !== undefined) user.city = city;
        if (street !== undefined) user.street = street;
        if (notifications !== undefined) user.notifications = notifications;

        await user.save();

        res.json({ success: true, message: "Профиль обновлен" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Неверно введены данные" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile }