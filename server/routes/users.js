const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const keys = require('../config/db');
const bcrypt = require('bcrypt');

//get all users
router.get('/', (req, res) => {
    User.find().then((users) => res.json(users));
}); 

//register
router.post('/register', async (req, res) => {
    const candidate = await User.findOne({ username: req.body.username })

    if (candidate) {
        // Пользователь существует, нужно отправить ошибку
        res.status(409).json({
            message: 'This username is in use yet.'
        })
    } else {
        // Нужно создать пользователя
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            username: req.body.username,
            password: bcrypt.hashSync(password, salt),
            email: req.body.email
        })

        try {
            await user.save()
            res.status(201).json(user)
        }
        catch (e) {
            errorHandler(res,e)
        }
    }
});
//login
router.post('/login', async (req, res) => {
    console.log(req.body.username)
    const candidate = await User.findOne({ username: req.body.username });

    if (candidate) {
        // Проверка пароля, пользователь существует
        const passwordResult = bcrypt.hashSync(req.body.password, candidate.password)
        if (passwordResult) { 
            // Генерация токена, пароли совпали
            const token = jwt.sign({
                username: candidate.username,
                userId: candidate._id
            }, keys.jwt, { expiresIn: 60 * 60 }) 

            //save token to database
            candidate.token = token; 
            candidate.save();
            console.log(candidate.token)

            res.status(200).json({
                candidate
            })
        } else {
            // Пароли не совпали
            res.status(401).json({
                message: 'Password is wrong. Try again.'
            })
        }
    } 
        if (!candidate) {
            res.status(404).json({
                Error: 'User not found! Please Sign in first!',
            });
        }
    
});
//delete user
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('Account has been deleted');
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;
