const express = require('express');
const router = express.Router();
const Room = require('../models/rooms');
const auth = require("../middleware/auth");

//get all room
router.get('/',auth, (req, res) => {
    Room.find().then((rooms) => res.json(rooms));
});
//add room
router.post('/add', (req, res) => {
    const room = new Room ({
        name: req.body.name 
    });
    room.save();
    res.status(200);
}); 
  
module.exports = router; 