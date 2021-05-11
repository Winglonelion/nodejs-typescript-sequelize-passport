import { check } from 'express-validator';

export default [
  check('email', 'Your email is not valid')
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false }),
  check('password', 'Your password must be at least 8 characters')
    .not()
    .isEmpty()
    .isLength({ min: 8 }),
];
