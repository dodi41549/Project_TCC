const express = require('express');
const router = express.Router();
const item = require('../controller/item');
const auth = require('../controller/auth');
const middlewares = require('../utils/middleware');

router.get('/', (req, res) => {
    return res.render('index', {errors: false});
});

router.get('/dashboard', middlewares.auth, (req, res) => {
    return res.render('dashboard');
});

router.get('/login', auth.login);
router.post('/auth/login', auth.auth);
router.post('/item/create/', item.create);
router.get('/item/show/', item.show);
router.put('/item/edit/:id', item.update);
router.delete('/item/delete/:id', item.destroy);

module.exports = router;