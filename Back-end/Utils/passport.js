const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');
// const { secret } = require('./config');
const UserSignup = require('../Models/SignupModel');

// Setup work and export for the JWT passport strategy
function auth() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: process.env.SESSION_SECRET,
  };
  passport.use(
    new JwtStrategy(opts, (jwtPayload, callback) => {
      // eslint-disable-next-line no-underscore-dangle
      const userId = jwtPayload._id;
      const role = jwtPayload.userrole;
      const { email } = jwtPayload;
      // eslint-disable-next-line consistent-return
      UserSignup.findOne(
        { _id: userId, Role: role, EmailID: email },
        // eslint-disable-next-line consistent-return
        (err, results) => {
          if (err) {
            return callback(err, false);
          }
          if (results) {
            callback(null, results);
          } else {
            callback(null, false);
          }
        }
      );
    })
  );
}

exports.auth = auth;
exports.validateUser = passport.authenticate('jwt', { session: false });
