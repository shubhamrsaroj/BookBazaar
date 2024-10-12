import { body, validationResult } from 'express-validator';

const validation = async (req, res, next) => {
  const rules = [
    body('name').notEmpty().withMessage("Name is required"),
    body('price').isFloat({ gt: 0 }).withMessage("Price should be positive value"),
    body('imageUrl').custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Invalid image URL');
      }
      return true;
    }),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('newproduct', { errorMessage: errors.array()[0].msg });
  }

  next();
};

export default validation;