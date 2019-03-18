const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyJWT = require('../middlewares/verify-jwt');

router.get('/users', verifyJWT, userController.getAll);
router.get('/users/:id', verifyJWT, userController.getById);
router.post('/users', userController.create);
router.patch('/users/:id', verifyJWT, userController.update);
router.delete('/users/:id', verifyJWT, userController.delete);
router.post('/users/login', userController.login);

module.exports = router;