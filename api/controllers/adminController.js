const User = require('../models/userModel');

exports.get_all_users = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.delete_user_by_id = async (req, res) => {
    try {
        const userId = req.params.userId;
        await User.findByIdAndDelete(userId);
        res.send('User deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.get_user_by_id = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.send(user);
    } catch (err) {
        res.send(err);
    }
};

exports.update_user = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updated_user = req.body;
        await User.findByIdAndUpdate(userId, updated_user);
        res.send("User successfully updated");
    } catch (err) {
        res.send(err);
    }
};
