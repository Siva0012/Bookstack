const { check } = require('express-validator')


exports.memberRegisterValidator = [
      check('userName').isLength({ min: 3 }).withMessage('Name must be at least 3 characters')
      .matches(/^[a-zA-Z0-9]+$/).withMessage('Name must contain only letters and numbers'),
      check('email', 'Your email is not valid').isEmail(),
      check('password', 'Your password must be at least 6 characters').not().isEmpty().isLength({ min: 6, max: 16 }),
      check('confirmPassword').custom((value , {req}) => (value === req.body.password)).withMessage('You password doesnot match'),
      check('phone').isMobilePhone().withMessage("Invalid Phone number format")
]

