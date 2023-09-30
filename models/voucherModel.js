const { DataTypes } = require('sequelize');
const sqlize = require('../helpers/init-mysql');

const digitalVoucher = sqlize.define(
    'digital_vouchers',
    {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        po_number: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        voucher_number: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        tax_invoice_number: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        po_file: {
            type: DataTypes.STRING(2000),
            allowNull: false,
            comment: 'kept long for path name',
        },
        po_data: {
            type: DataTypes.BLOB('long'),
            allowNull: false,
        },
        voucher_file: {
            type: DataTypes.STRING(2000),
            allowNull: false,
            comment: 'kept long for path name',
        },
        voucher_data: {
            type: DataTypes.BLOB('long'),
            allowNull: false,
        },
        tax_invoice_file: {
            type: DataTypes.STRING(2000),
            allowNull: false,
            comment: 'kept long for path name',
        },
        tax_invoice_data: {
            type: DataTypes.BLOB('long'),
            allowNull: false,
        },
    },
    {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
);

module.exports = digitalVoucher;
