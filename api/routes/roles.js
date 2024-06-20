const express = require('express');
const router = express.Router();

const Roles = require('../db/models/Roles');
const RolePrivileges = require('../db/models/RolePrivileges');
const Response = require('../lib/Response');

router.get('/', async (req, res, next) => {
    try {
        let roles = await Roles.find({});
        res.json(Response.successResponse(roles));
    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
});

router.post('/add', async (req, res, next) => {
    let body = req.body;
    try {
        if (!body.role_name) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Validation Error!', 'Name is required');
        let role = new Roles({
            role_name: body.role_name,
            is_active: true,
            created_by: req.user?.id
        });
        await role.save();
        res.json(Response.successResponse({ success: true }));
    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
});

module.exports = router;