const passport = require("passport"),
localStrategy = require("passport-local"),
User = require("../models/User");

passport.use(
  new localStrategy(async (username, password, done) => {
    const user = await User.findOne({$or:[{ username}, {email:username}]});
    if (user) {
      const match = await user.matchPassword(password);
      if (match) {
        return done(null, user);
      }
    }
    return done(null, false, { message: "Incorrect username, email or password." });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
