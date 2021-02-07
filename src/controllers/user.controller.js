const userCtrl = {};
const passport = require("passport");
const User = require('../models/user')
const noFotter = true;

userCtrl.signupForm = (req, res)=>{
  res.render('user/signup', {noFotter});
}

userCtrl.signup = async (req, res)=>{
  const {username, password} = req.body;
  const newUser = await new User({username, password});
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();
  req.flash('success_msg','Usuário cadastrado com sucesso')
  res.redirect('/');

}


userCtrl.loginForm = (req, res)=>{
  res.render('user/login', {noFotter});
}

userCtrl.login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  successFlash: "Welcome!",
});


//logout
userCtrl.logout = (req, res)=>{
  req.logout();
  res.redirect('/')
}

module.exports = userCtrl;
