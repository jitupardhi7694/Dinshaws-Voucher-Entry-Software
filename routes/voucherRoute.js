const express = require('express');
const router = express.Router();
const {
    voucherValidationRules,
    validate,
} = require('../helpers/validators/masterValidators');
const digitalVoucherController = require('../controllers/digitalVoucherController');
const multer = require('multer');
const path = require('path');

// Configure file upload using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads'); // Specify the directory where uploaded files will be stored
    },

    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });

router.get('/register', async (req, res) => {
    await digitalVoucherController.getDigitalVoucher(req, res);
});
router.post(
    '/register',
    upload.fields([
        { name: 'po_file', maxCount: 1 },
        { name: 'voucher_file', maxCount: 1 },
        { name: 'tax_invoice_file', maxCount: 1 },
    ]),
    async (req, res) => {
        await digitalVoucherController.savedigitalVoucher(req, res);
    }
);
router.post(
    '/edit/:id',
    upload.fields([
        { name: 'po_file', maxCount: 1 },
        { name: 'voucher_file', maxCount: 1 },
        { name: 'tax_invoice_file', maxCount: 1 },
    ]),
    async (req, res) => {
        await digitalVoucherController.updateVoucher(req, res);
    }
);

router.get('/registerTable', async (req, res) => {
    await digitalVoucherController.getDigitalVoucherTable(req, res);
});
router.post('/registerTable/:id/delete', async (req, res) => {
    await digitalVoucherController.deleteVoucherTable(req, res);
});
router.get('/edit/:id', async (req, res) => {
    await digitalVoucherController.editVoucher(req, res);
});

module.exports = router;
