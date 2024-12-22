const express = require('express');
const { getAll, getById, create, update, remove, login } = require('../controllers/userController');
const { createUserSchema, updateUserSchema, loginSchema } = require('../utils/validationSchemas');
const validateRequest = require('../middlewares/validationMiddleware');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getAll);
router.get('/:id', authenticateToken, getById);
router.post('/', authenticateToken, validateRequest(createUserSchema), create);
router.patch('/:id', authenticateToken, validateRequest(updateUserSchema), update);
router.delete('/:id', authenticateToken, remove);
router.post('/login', validateRequest(loginSchema), login);

module.exports = router;