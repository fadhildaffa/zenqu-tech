const Controller = require('../controllers');

const router = require('express').Router();

router.get('/', Controller.home);
router.get('/register', Controller.registerForm);
router.post('/register', Controller.postRegister);
router.get('/login', Controller.login);
router.post('/login', Controller.postLogin);

module.exports = router;