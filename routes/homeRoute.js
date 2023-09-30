const express = require('express');

const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth-helper');
const dashboardController = require('../controllers/dashboardController');
const roles = require('../config/roles.json');

// app Landing page
router.get(['/', '/dashboard'], ensureAuthenticated, async (req, res, next) => {
    if ([roles.ADMIN, roles.USER].includes(req.user.role_id)) {
        return dashboardController.adminDashboard(req, res, next);
    }

    return res
        .send('No dashboard available, please check with the developers.')
        .status(404);
});

module.exports = router;
