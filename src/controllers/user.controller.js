const userCtrl = {};
const passport = require("passport");
const User = require('../models/User')

userCtrl.signupForm = (req, res) => {
  res.render('user/signup');
}

userCtrl.signup = async (req, res) => {
  let errors = ["", "", "", ""], saveUser = true;
  const { username, email, password, birthday } = req.body;

  let dateBirth = new Date(birthday);
  const today = new Date();

  const users = await User.find({ $or: [{ username }, { email }] })
  const tUser = users.length;


  if (tUser > 0) {
    saveUser = false;
    if (tUser > 1) {
      errors[0] = "O username já esta sendo usado";
      errors[1] = "O email já está cadastrado"
    } else {
      let user = users[0]
      if (user.username === username) {
        errors[0] = "O username já está sendo utilizada";
      } if (user.email === email) {
        errors[1] = "O email já está cadastrado";
      }
    }

  }

  if (password.length < 6) {
    saveUser = false;
    errors[2] = "A senha deve possui 6 ou mais caracteres "
  }


  if (!(((today - dateBirth) / (1000 * 60)) >= 9460800)) {
    saveUser = false;
    errors[3] = "Você deve possui mais de 18 anos"
  }


  if (saveUser && tUser === 0) {
    const newUser = await new User({ username, email, password, birthday });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
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
