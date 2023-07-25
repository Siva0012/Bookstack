const { check } = require('express-validator')


exports.memberRegisterValidator = [
      check('userName').isLength({ min: 3 }).withMessage('Name must be at least 3 characters')
            .matches(/^[a-zA-Z0-9]+$/).withMessage('Name must contain only letters and numbers'),
      check('email', 'Your email is not valid').isEmail(),
      check('password', 'Your password must be at least 6 characters').not().isEmpty().isLength({ min: 6, max: 16 }),
      check('confirmPassword').custom((value, { req }) => (value === req.body.password)).withMessage('You password doesnot match'),
      check('phone').isMobilePhone().withMessage("Invalid Phone number format")
]

exports.adminLoginValidator = [
      check('email').isEmail().withMessage("Please enter a valid email").not().isEmpty(),
      check('password', 'Required password !!').not().isEmpty()
]

exports.editBookDataValidator = [
      check('title').not().isEmpty().withMessage('Title is required')
            .matches(/^[a-zA-Z0-9\s]+$/).withMessage('Title must contain only letters and numbers'),
      check('author').not().isEmpty().withMessage('Author name is required')
            .matches(/^[a-zA-Z0-9\s]+$/).withMessage('Author name must contain only letters and numbers'),
      check('edition').not().isEmpty().withMessage('Edition is required')
            .matches(/^[a-zA-Z0-9\s]+$/).withMessage('Edition must contain only letters and numbers'),
      check('category').not().isEmpty().withMessage('Category is required')
            .isMongoId().withMessage('Invalid category ID format'),
      check('isbn').not().isEmpty().withMessage('ISBN number is required')
            .isLength({ min: 10 }).withMessage('ISBN number is invalid'),
      check('stock').not().isEmpty().withMessage('stock number is required')
            .isNumeric().withMessage('Stock number must be a valid number'),
      check('publisher').not().isEmpty().withMessage('Publisher name is required')
            .matches(/^[a-zA-Z\s]+$/).withMessage('Publisher name must contain only letters.'),
      check('maximumReservation').not().isEmpty().withMessage('Maximum reservation is required')
            .isNumeric().withMessage('Maximum reservations must be a valid number'),
      check('description').not().isEmpty().withMessage('Description is required')
            .matches(/^[a-zA-Z0-9\s,.!?"']+$/).withMessage('Description must contain only letters, numbers, commas, periods, exclamation marks, question marks, and double quotes')
            .custom((value, { req }) => {
                  const wordCount = value.trim().split(/\s+/).length;
                  const minWords = 10; // minimum number of words
                  const maxWords = 75; // maximum number of words
                  if (wordCount < minWords || wordCount > maxWords) {
                    throw new Error(`Description must contain ${minWords} to ${maxWords} words`);
                  }
            
                  return true;
                }),
]

