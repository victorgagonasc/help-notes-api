const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const verifyJWT = require('../middlewares/verify-jwt');

router.get('/notes', verifyJWT, noteController.getAll);
router.get('/notes/:id', verifyJWT, noteController.getById);
router.post('/notes', verifyJWT, noteController.create);
router.patch('/notes/:id', verifyJWT, noteController.update);
router.delete('/notes/:id', verifyJWT, noteController.delete);

module.exports = router;