var passport = require('passport');
var LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;

exports.setup = function (User, config) {
  passport.use(new LinkedinStrategy({
      clientID: config.linkedin.clientID,
      clientSecret: config.linkedin.clientSecret,
      callbackURL: config.linkedin.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        'linkedin.id': profile.id
      }, function(err, user) {
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.emails[0].value,
            provider: 'linkedin',
            linkedin: profile._json
          });
          user.save(function(err) {
            if (err) done(err);
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
  ));
};