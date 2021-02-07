const express = require("express");
const morgan = require("morgan");
const path = require("path");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const expSession = require("express-session");
const passport = require("passport");

require('./config/passport')


//Init
const app = express();

// Settings
app.set("PORT", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

app.engine(
  "hbs",
  handlebars({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: false,
    },
  })
);

app.set("view engine", "hbs");

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(expSession({
  secret: 'hetai',
  resave: true,
  saveUninitialized: true
}))
app.use(flash())
app.use(methodOverride("_method"))
app.use(passport.initialize())
app.use(passport.session())

// Golbal Varibles
app.use((req, res, next) =>{
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.user = req.user || null;
  next();
})

// Routes
app.use(require("./routes/index.routes"));
app.use(require("./routes/page.routes"));
app.use(require("./routes/user.routes"));
app.use(require("./routes/hGames.routes"));
app.use(require("./routes/comments.routes"));
app.use(require("./routes/category.routes"));
app.use(require("./routes/search.routes"));

// static files
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.send("404");
});

module.exports = app;
