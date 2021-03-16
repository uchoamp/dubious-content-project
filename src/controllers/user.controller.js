const userCtrl = {};
const passport = require("passport");
const User = require('../models/User')
const { validateUsername, validateEmail, validateAge, validatePassword, validateRecaptcha } = require("../libs/validate");

userCtrl.signupForm = (req, res) => {
  res.render('user/signup', { tittle: "INSCREVER-SE | H-NATSU", meta_keywords: "inscrever-se, signup", canonical:"signup" });
}

userCtrl.signup = async (req, res) => {
  
  let { username, email, password, birthday } = req.body;
  let errors = {};
  const recaptcha = req.body['g-recaptcha-response'];

  if(!recaptcha || recaptcha === '' || recaptcha === undefined || recaptcha === null ){
      return res.render("user/signup", { username, password, email, errors, birthday, recaptcha_error:"Selecione a captcha.", 
                tittle: "INSCREVER-SE | H-NATSU", meta_keywords: "inscrever-se, signup", canonical:"signup" });
  }else{
    const recaptcha_res = await validateRecaptcha(recaptcha, req.connection.remoteAddress); 
    if(!recaptcha_res.success){
      return res.render("user/signup", { username, password, email, errors, birthday, recaptcha_error: recaptcha_res.msg, 
                tittle: "INSCREVER-SE | H-NATSU", meta_keywords: "inscrever-se, signup", canonical:"signup" });
    }
  
  }


  birthday = new Date(birthday);

  errors.username = await validateUsername(username);
  errors.email = await validateEmail(email);
  errors.password = validatePassword(password);
  errors.birthday = validateAge(birthday);


  if (!errors.username && !errors.email && !errors.password && !errors.birthday) {
    const newUser = await new User({ username, email, password, birthday });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();

    req.flash('success_msg', 'Usuário cadastrado com sucesso')
    return res.redirect('/login');
  }
  birthday = birthday.toISOString().slice(0, 10);


  res.render("user/signup", { username, password, email, errors, birthday, 
            tittle: "INSCREVER-SE | H-NATSU", meta_keywords: "inscrever-se, signup", canonical:"signup" })

}


userCtrl.loginForm = (req, res) => {
  res.render('user/login', { tittle: "LOGIN | H-NATSU", meta_keywords: "login, entrar", canonical:"login" });
}

userCtrl.login = passport.authenticate("local", {
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
