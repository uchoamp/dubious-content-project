const passport = require("passport"),
  localStrategy = require("passport-local"),
  User = require("../models/User"),
  Admin = require("../models/Admin");

passport.use("user",
  new localStrategy(async (username, password, done) => {
    const user = await User.findOne({ $or: [{ username }, { email: username }] });
    if (user) {
      const match = await user.matchPassword(password);
      if (match) {
        return done(null, user);
      }
    }
    return done(null, false, { message: "Incorrect username, email or password." });
  })
);

passport.use("admin",
  new localStrategy(async (username, password, done) => {
    const admin = await Admin.findOne({ $or: [{ username }, { email: username }] });

    if (admin) {
      const match = await admin.matchPassword(password);
      if (match) {
        return done(null, admin);
      }
    }
    return done(null, false, { message: "Incorrect username, email or password." });
  })
);

passport.serializeUser((user, done) => {
  done(null, { id: user.id, secret: user.secret });
});

passport.deserializeUser((obj, done) => {
  if (!obj.secret) {
    User.findById(obj.id, (err, user) => {
      return done(err, user);
    });
  } if (obj.secret === process.env.SECRET_ADMIN) {
    Admin.findById(obj.id, (err, user) => {
      return done(err, user);
    });
  }

});
