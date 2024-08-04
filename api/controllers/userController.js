const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.register_user = async (req, res) => {
    try {
        const { email, password, name } = req.body
        if (email in await User.find({})) {
            return res.status(400).send('User already exists')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await new User({ email, password: hashedPassword, name, role: 'user' })
        await user.save()
        res.send(user)
    } catch (err) {
        res.send(err)
    }
}

exports.login_user = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).send('User not found')
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).send('Wrong password')
        }

        const token = jwt.sign({userId: user._id,email: user.email, role: user.role}, 'secretKey')
        res.send({token, userId: user._id, role: user.role, name: user.name})
    } catch (err) {
        res.send(err)
    }
}


exports.get_all_users = async (req, res) => {
    try {
        users = await User.find({})
        res.send(users)
    } catch (err) {
        res.send(err)
    }
}

exports.create_user = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.send(user)
    } catch (err) {
        res.send(err)
    }
}

exports.delete_all_users = async (req, res) => {
    try {
        await User.deleteMany()
        res.send('All users are deleted')
    } catch (err) {
        res.send(err)
    }
}

exports.get_user_by_id = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        res.send(user)
    } catch (err) {
        res.send(err)
    }
}

exports.update_user = async (req, res) => {
    try {
        id = req.params.userId
        updated_user = req.body
        await User.findByIdAndUpdate(id, updated_user);
        res.send("User successfully updated");
    } catch (err) {
        res.send(err)
    }
}

exports.delete_user_by_id = async (req, res) => {
    try {
        id = req.params.userId
        await User.findByIdAndDelete(id)
        res.send('User is deleted')
    } catch (err) {
        res.send(err)
    }
}