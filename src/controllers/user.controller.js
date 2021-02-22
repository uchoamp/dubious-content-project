const userCtrl = {};
const passport = require("passport");
const User = require('../models/User')
const {validateUsername, validateEmail, validateAge, validatePassword} = require("../libs/validate");

userCtrl.signupForm = (req, res) => {
  res.render('user/signup');
}

userCtrl.signup = async (req, res) => {
  let { username, email, password, birthday } = req.body;
  let errors = {};

  birthday = new Date(birthday);
  
  errors.username = await validateUsername(username);
  errors.email = await validateEmail(email);
  errors.password = validatePassword(password);
  errors.birthday = validateAge(birthday); 


  if (!errors.username && !errors.email && !errors.password && !errors.birthday ) {
    // const newUser = await new User({ username, email, password, birthday });
    // newUser.password = await newUser.encryptPassword(password);
    // await newUser.save();

    req.flash('success_msg', 'Usuário cadastrado com sucesso')
    return res.redirect('/login');
  }

  res.render("user/signup", { username, password,  email, errors, birthday})

}


userCtrl.loginForm = (req, res) => {
  res.render('user/login');
}

userCtrl.login = passport.authenticate("user", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  successFlash: "Welcome!",
});


//logout
userCtrl.logout = (req, res) => {
  req.logout();
  res.redirect('/')
}

module.exports = userCtrl;
