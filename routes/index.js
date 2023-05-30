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

router.get('/create', middlewares.auth, (req, res) => {
    return res.render('create');
});


router.get('/edit', middlewares.auth, item.showEdit, (req, res) => {
    return res.render('edit');
});

router.get('/edit/:id', middlewares.auth, item.showId, (req, res) => {
    return res.render('edititem');
});

router.get('/delete', middlewares.auth, item.showDelete, (req, res) => {
    return res.render('delete');
});

router.get('/login', auth.login);
router.post('/auth/login', auth.auth);
router.post('/create', middlewares.auth, item.create);
router.get('/show', middlewares.auth, item.show);
router.post('/edit/:id', middlewares.auth, item.update);
router.get('/delete/:id', middlewares.auth, item.destroy);
router.get('/logout', middlewares.logout);

module.exports = router;