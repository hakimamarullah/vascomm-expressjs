const { body, validationResult } = require('express-validator');

exports.validateCreateUser = [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').isIn(['USER', 'ADMIN']).withMessage('Role must be ADMIN or USER'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ code: 400, message: 'Validation errors', data: errors.array() });
        }
        next();
    }
];