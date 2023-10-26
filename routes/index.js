const Controller = require('../controllers');

const router = require('express').Router();

router.get('/', Controller.landing);

router.get('/register', Controller.registerForm);

router.post('/register', Controller.postRegister);

router.get('/login', Controller.login);

router.post('/login', Controller.postLogin);

router.get('/logout', Controller.getLogout);

router.use(function (req, res, next) {
    if(req.session.UserId){
        next();
    }else{
        const error = "Please login first!!";
        res.redirect(`/login?error=${error}`);
    }
});
const isRole = function (req, res, next) {
    if(req.session.role === "instructor"){
        next()
    }else{
        const error = "You have no acces";
        res.redirect(`/login?error=${error}`);
    }
};



router.get("/home", Controller.home);   //ke home dg data kategori

router.get("/course/:id", Controller.coursePage); // ke home dengan detail course, video

router.get("/course/edit/:id", Controller.editForm);    //ke form edit

router.post("/course/edit/:id", Controller.updateForm);

router.get("/course/delete/:id", Controller.deleteCourse);





module.exports = router;