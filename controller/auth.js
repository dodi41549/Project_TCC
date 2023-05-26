const passport = require('../utils/passport');

module.exports = {
    login: (req, res) => {
        return res.render('index', {errors: true});
    },

    auth: 
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: true
        })
}