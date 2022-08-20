const Router = require('express');
const { check } = require('express-validator');

const router = new Router();
const controller = require('./Controller');


router.post('/registration', [
    check('email','email cannot be empty').notEmpty(),
    check('password','password cannot be empty').notEmpty(),
], controller.registration);
router.get('/login&&:email&&:password', controller.login);
router.post('/delete',[
    check('token','password cannot be empty').notEmpty()
], controller.delete);
router.post('/update',[
    check('password','password cannot be empty').notEmpty(),
    check('new_password','password cannot be empty').notEmpty(),
    check('token','password cannot be empty').notEmpty()
], controller.update);


module.exports = router ;