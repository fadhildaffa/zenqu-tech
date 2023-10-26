const Controller = require('../controllers');

const router = require('express').Router();

router.get('/', Controller.landing);

router.get('/register', Controller.registerForm);

router.post('/register', Controller.postRegister);

router.get('/login', Controller.login);

router.post('/login', Controller.postLogin);

router.get("/home", Controller.home);   //ke home dg data kategori

router.get("/course/:id", Controller.coursePage); // ke home dengan detail course, video

// router.get("/course/edit/:id", Controller.editForm);

// router.get("/course/edit/:id", Controller.editCourse);

router.get("/course/delete/:id", Controller.deleteCourse);





module.exports = router;