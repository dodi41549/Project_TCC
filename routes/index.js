const express = require('express');
const router = express.Router();
const item = require('../controller/item');

router.get('/', (req, res) => {
    return res.render('index');
});

router.post('/item/create/', item.create);
router.get('/item/show/', item.show);
router.put('/item/edit/:id', item.update);
// router.delete('/item/delete', item.destroy);

module.exports = router;