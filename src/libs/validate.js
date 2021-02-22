validate = {};

const User = require("../models/User")

validate.validateUsername = async (username)=>{
    const re = /^[a-z0-9_-]{4,16}$/igm
    if(re.test(username)){
        const user = await User.findOne({username});
        if(user){
            return "O username já está sendo utilizado"
        }
        return false;
    }else{
        return "O username é inválido"
    }
}

validate.validateEmail = async (email)=>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email).toLowerCase())){
        const user = await User.findOne({email});
        if(user){
            return "O email já está sendo utilizado."
        }
        return false
    }else{
        return "Email é inválido, não é um email"
    }
}

validate.validateAge = (birthday)=>{
    const today = new Date();
    if (!(((today - birthday) / (1000 * 60)) >= 9460800)) {
        return "Você deve possui mais de 18 anos."
    }
    return false;
}

validate.validatePassword = (password)=>{
    if (password.length < 6) {
        return "A senha deve possui 6 ou mais caracteres.";
      }
    return false;
}

module.exports = validate;