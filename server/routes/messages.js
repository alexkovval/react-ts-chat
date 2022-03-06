const express = require('express');
const router = express.Router();
const Message = require('../models/messages');
const auth = require('../middleware/auth');
//get all messages by user id
router.get('/', auth, (req, res) => {
    Message.find().then((messages) => res.json(messages));
});
//get all messages by user id
router.post('/room', auth, (req, res) => {
    Message.find().then((messages) => {
        //console.log("Request "+req.body.roomId)
        const roomsMessages = messages.filter((message) => {
            //console.log("Message "+message.roomId)
            return message.roomId.includes(req.body.roomId);
        });
        res.json(roomsMessages);
    });
});

module.exports = router;
