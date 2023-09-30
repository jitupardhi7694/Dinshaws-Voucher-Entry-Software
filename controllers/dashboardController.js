// const userRoles = require('../models/roles');
const digitalVoucher = require('../models/voucherModel');

// const db = require('../helpers/init-mysql');

const adminDashboard = async (req, res) => {
    const voucherData = await digitalV();

    return res.render('dashboard/adminDashboard', {
        voucherData,
    });
};

async function digitalV() {
    const data = {};
    data.totalSymptoms = await digitalVoucher.count();

    return data.totalSymptoms;
}

module.exports = {
    adminDashboard,
};
