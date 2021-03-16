validate = {};

const User = require("../models/User");
const Game = require("../models/Game");
const fetch = require("node-fetch");



const recaptcha_secret_key = process.env.RECAPTCHA_SECRET_KEY


validate.validateUsername = async (username) => {
    const re = /^[a-z0-9]{1}[a-z0-9_-]{3,16}$/i
    if (re.test(username)) {
        const user = await User.findOne({ username });
        if (user) {
            return "O username já está sendo utilizado"
        }
        return false;
    } else {
        return "O username é inválido"
    }
}

validate.validateEmail = async (email) => {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (re.test(String(email).toLowerCase())) {
        const user = await User.findOne({ email });
        if (user) {
            return "O email já está sendo utilizado."
        }
        return false
    } else {
        return "Email é inválido, não é um email"
    }
}

validate.validateAge = (birthday) => {
    const today = new Date();
    if (!(((today - birthday) / (1000 * 60)) >= 9460800)) {
        return "Você deve possui mais de 18 anos."
    }
    return false;
}

validate.validatePassword = (password) => {
    if (password.length < 6) {
        return "A senha deve possui 6 ou mais caracteres.";
    }
    return false;
}

validate.validateRecaptcha = async (recaptcha, remoteip) => {

    let body = {
        secret: recaptcha_secret_key,
        response: recaptcha,
        remoteip: remoteip
    };

    const options = {
        method: "post"
    };

    try{
        const res = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${body.secret}&response=${body.response}&remoteip=${body.remoteip}`, options).then(res => res.json());
        
        if(res.success){
            return {success: res.success, msg:"Captcha válida;"}
        }
        return {success: res.success, msg:"Captcha inválida;"}

    }catch(err){
        console.error(err);
        return {success: false, msg:"Não foi possível validar a captcha."}
    }

};


module.exports = validate;