const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const con = require('../external/database');

async function authenticate(inputuser, inputpassword, done) {
    try {
        const user = await con.query('select * from user where username = ?', [inputuser], (err, result) => {
            if (err) {
                console.log("error: ", err);
                return done(null, err);
            }
            const data = result.map(row => ({ ...row}));
            if (!data) {
                if (data[0].password !== inputpassword) {
                    console.log('Password mismatch');
                    return done(null, false, { message: 'Password is incorrect' });
                }
                return done(null, false, { message: 'User is not registered!' });
            }
            
            return done(null, data[0]);
        }) ;
    } catch (error) {
      return done(null, false, { message: error.message });
    }
}  

passport.use(new localStrategy({usernameField: 'username', passwordField: 'password'}, authenticate));

passport.serializeUser((data, done) => {
    console.log(data);
    return done(null, data.ID);
});
  
passport.deserializeUser(async (id, done) => {
    try {
      const result = await new Promise((resolve, reject) => {
        con.query(`SELECT * FROM user WHERE id = '${id}'`, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  
      const data = result.map(row => ({ ...row }));
      done(null, data);
    } catch (error) {
      done(error);
    }
  });
  
  
module.exports = passport;