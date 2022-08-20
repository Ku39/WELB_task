const Router = require('express');
const { check } = require('express-validator');

const router = new Router();
const controller = require('./Notes_Controller');



router.get('/find/:token',controller.find);
router.post('/create',controller.create);
router.post('/update',controller.update);
router.post('/delete',controller.delete);

module.exports = router ;