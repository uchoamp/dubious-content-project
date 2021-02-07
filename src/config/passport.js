const passport = require("passport"),
  localStrategy = require("passport-local"),
  User = require("../models/user");

passport.use(
  new localStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (user) {
      const match = await user.matchPassword(password);
      if (match) {
        return done(null, user);
      }
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, false, { message: "Incorrect username or password." });
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
