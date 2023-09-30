const { QueryTypes } = require('sequelize');
const logger = require('../helpers/winston');
const db = require('../helpers/init-mysql');

const digitalVoucher = require('../models/voucherModel');

// Patients Registration Form Page

const getDigitalVoucher = async (req, res) => {
    const rows = await digitalVoucher.findAll();
    res.render('masterPages/digitalVoucher', {
        rows,
    });
};

const getDigitalVoucherTable = async (req, res) => {
    const rows = await digitalVoucher.findAll();

    await res.render('masterPages/digitalVoucherTable', { rows });
};
const deleteVoucherTable = async (req, res) => {
    await deletedigitalVoucher(req, res);
};

const savedigitalVoucher = async (req, res) => {
    const { po_number, voucher_number, tax_invoice_number } = req.body;
    try {
        const rows = await digitalVoucher.findAll();
        const { po_file, voucher_file, tax_invoice_file } = req.files; // Destructure the uploaded files

        if (!po_file || !voucher_file || !tax_invoice_file) {
            return res.render('masterPages/digitalVoucher', {
                errors: [{ msg: 'File uploads are missing or invalid.' }],
                rows,
            });
        }
        const errors = req.validationErrors;
        if (errors) {
            return res.render('masterPages/digitalVoucher', {
                errors,
                rows,
            });
        }

        // Your code to handle saving the files and creating a new digitalVoucher record goes here

        // Example:
        const newdigitalVoucher = await digitalVoucher.create({
            po_number,
            voucher_number,
            tax_invoice_number,
            po_file: po_file[0].originalname,
            po_data: po_file[0].filename,
            voucher_file: voucher_file[0].originalname,
            voucher_data: voucher_file[0].filename,
            tax_invoice_file: tax_invoice_file[0].originalname,
            tax_invoice_data: tax_invoice_file[0].filename,
        });

        // console.log('newVoucher', newdigitalVoucher);
        req.flash(
            'success_msg',
            `Digital Voucher  ${newdigitalVoucher.voucher_number} is saved.`
        );
        return res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
    return null;
};

// update

const updateVoucher = async (req, res) => {
    const { po_number, voucher_number, tax_invoice_number } = req.body;

    const rows = await digitalVoucher.findAll();
    const { po_file, voucher_file, tax_invoice_file } = req.files; // Destructure the uploaded files

    if (!po_file || !voucher_file || !tax_invoice_file) {
        return res.render('masterPages/digitalVoucher', {
            errors: [{ msg: 'File uploads are missing or invalid.' }],
            rows,
        });
    }
    const errors = req.validationErrors;
    if (errors) {
        return res.render('masterPages/digitalVoucher', {
            errors,
            rows,
        });
    }

    try {
        if (id !== '') {
            const updateDigitalVoucher = await digitalVoucher.update(
                {
                    po_number,
                    voucher_number,
                    tax_invoice_number,
                    po_file: po_file[0].originalname,
                    po_data: po_file[0].filename,
                    voucher_file: voucher_file[0].originalname,
                    voucher_data: voucher_file[0].filename,
                    tax_invoice_file: tax_invoice_file[0].originalname,
                    tax_invoice_data: tax_invoice_file[0].filename,
                },
                { where: { id } }
            );
            //   console.log('updatedPatient', updatedPatient);
            if (updateDigitalVoucher) {
                req.flash('success_msg', 'Data Successfully updated.');
            }
            return res.redirect('/digital-voucher/registerTable');
        }
    } catch (err) {
        logger.error(err);
    }
    return null;
};

// edit

const editVoucher = async (req, res) => {
    const { id } = req.params;
    try {
        const rows = await digitalVoucher.findByPk(id);

        if (rows === null) {
            //  console.log('inside blank');
            req.flash('error_msg', `No record found for editing`);
            return res.redirect('/digital-voucher/registerTable');
        }

        res.render('masterPages/digitalVoucher', {
            rows,
        });
    } catch (error) {
        return error.message;
    }
    return null;
};

async function deletedigitalVoucher(req, res) {
    const { id } = req.params;
    try {
        await digitalVoucher.destroy({
            where: {
                id,
            },
        });

        req.flash('success_msg', 'Data Deleted successfully.');
        return res.redirect('/digital-voucher/registerTable');
    } catch (error) {
        if (error) {
            if (
                error.message.includes(
                    'Cannot delete or update a parent row: a foreign key constraint fails'
                )
            ) {
                req.flash(
                    'error_msg',
                    'Cannot delete this record as it is already in use.'
                );
                return res.redirect('/digital-voucher/registerTable');
            }
            logger.error(
                "Can't delete Digital Voucher Documents from database ->",
                error
            );
        }
        return null;
    }
}

module.exports = {
    getDigitalVoucher,
    savedigitalVoucher,
    editVoucher,
    updateVoucher,
    deleteVoucherTable,
    getDigitalVoucherTable,
};
