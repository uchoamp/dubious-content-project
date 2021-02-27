validate = {};

const User = require("../models/User")
const Game = require("../models/Game")


validate.validateUsername = async (username)=>{
    const re = /^[a-z0-9]{1}[a-z0-9_-]{3,16}$/i
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
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
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



validate.validateURL = async (gameURL)=>{
    const re = /^[a-z0-9]{1}[\w-]*$/i
    if(re.test(gameURL)){
       const game = await Game.findOne({ gameURL });
       if(game){
            return "URL já existe"
       }
       return false
    }
    return "URL inválida"
}

module.exports = validate;