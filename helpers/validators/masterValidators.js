const { body, validationResult } = require('express-validator');

const voucherValidationRules = () => [
    body('po_number').notEmpty().withMessage('PO number is required'),
    body('voucher_number').notEmpty().withMessage('Voucher number is required'),
    body('tax_invoice_number')
        .notEmpty()
        .withMessage('Tax Invoice number is required'),
];
const userRoleValidationRules = () => [
    body('roleName')
        .notEmpty()
        .withMessage('User Role Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Should have minimum 2 and maximum 50 characters'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    const extractedErrors = [];
    errors.array().map((error) => extractedErrors.push({ msg: error.msg }));
    req.ValidateErrors = extractedErrors;
    return next();
};

module.exports = {
    voucherValidationRules,
    userRoleValidationRules,
    validate,
};
