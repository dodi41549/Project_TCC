const express = require('express');
const router = express.Router();
const item = require('../controller/item');

router.get('/', (req, res) => res.status(200).json({
    message: "welcome to dashboard"
}));

router.post('/item/create', item.create);

// router.get('/channels', channel.index); 
// router.get('/channels/:channel_id', channel.show); 
// router.post('/channels', channel.store); 
// router.put('/channels/:channel_id', channel.update); 
// router.delete('/channels/:channel_id', channel.destroy); 

module.exports = router;