module.exports = {
    auth: (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }

        return res.redirect('/');
    },

    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/');
        })
    }
};