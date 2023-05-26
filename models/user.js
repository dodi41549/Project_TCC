const con = require('../external/database');

const Auth = function(admin){
    this.username = admin.username;
    this.password = admin.password;
};

Auth.login = (admin, result) => {
    con.query('select username from user where username = ? and password = ?',
        [admin.username, admin.password],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                return result(null, err);
            }

            if (res.affectedRows == 0) {
                return result({ code: 404 }, null);
            }

            result(null, console.log('Login berhasil'));
        }
    );
};

module.exports = Auth;