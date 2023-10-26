const UserController = require('../controllers/userController');

const router = require('express').Router();

router.get('/register', UserController.registerForm);
router.post('/register', UserController.postRegister);
router.get('/login', UserController.login);
router.post('/login', UserController.postLogin);

module.exports = router;