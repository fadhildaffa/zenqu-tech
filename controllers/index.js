const { Category, Course, User } = require('../models');
const bcrypt = require('bcryptjs');

class Controller{

    static landing(req, res){
        res.render("landing");
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
        const user = await User.findOne({where: {email}});
        if(user){
            const isPasswordTrue = bcrypt.compareSync(password, user.password);
            if(isPasswordTrue){

                req.session.role = user.role;
                req.session.UserId = user.id;

                res.redirect('/home'); //ke class page
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


    static async home(req, res){
        try {
            const categories = await Category.findAll({
                include: {
                    model: Course,
                    attributes: ["id", "title", "description", "CategoryId"]  
                }
            })
           
            res.render("home", {categories});
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }


    static async coursePage(req, res){
     try {
        const {id} = req.params;
        
        const course = await Course.findByPk(id);
        res.render("coursePage", {course});
        
     } catch (error) {
        console.log(error);
        res.send(error.message);
     }   
    }



    
    static async deleteCourse(req, res){
        try {
            await Course.destroy({where: {id: req.params.id}});
            res.redirect("/home");
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static getLogout(req, res){
        req.session.destroy((err) => {
            if(err){
                console.log(err)
            }else{
                res.redirect('/login');
            }
        });
    }

}

module.exports = Controller;