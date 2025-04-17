const express = require("express");
const User = require('../models/User');
const router = express.Router();

router.post('/login', async function (req, res) {
    try {
        const result = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        });

        if (result) {
            res.send(result);
        } else {
            res.status(500).json("Error");
        }

    }
    catch (error) {
        res.status(500).json(error);
    }

});

// Register route with username check
router.post('/register', async function (req, res) {
    try {
        const { name, email, password } = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({ name: name });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Check if the email already exists
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create new user
        const newuser = new User({
            name,
            email,
            password, // You should hash this before saving in a real app!
        });

        await newuser.save();
        res.status(201).send('User Registered Successfully');
    }
    catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;