const { User } = require('../models');
const bcrypt = require('bcryptjs');

class Controller{

    static home(req, res){
        res.render("home");
    }

    static registerForm(req, res){
        res.render('registerpage');
    }

    static async postRegister(req, res){
        const {email, password, role} = req.body;
        try {
            await User.create({email, password, role});
            res.redirect('/login');
        } catch (error) {
            console.log(error);
            res.send(error.message);
        } 
    }

    static login(req, res){
        const {error}  = req.query
        res.render('login', {error});
    }

    static async postLogin(req, res){
        try {
        const {email, password} = req.body; 
        const find = await User.findOne({where: {email}});
        if(find){
            const isPasswordTrue = bcrypt.compareSync(password, find.password);
            if(isPasswordTrue){
                res.redirect('/');
            }else{
                const error = "invalid username/password";
                res.redirect(`/login?error=${error}`);
            }
        }else{
            const error = "invalid username/password";
            res.redirect(`/login?error=${error}`);
        }
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
}

module.exports = Controller;