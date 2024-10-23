const express = require('express');
const router = express.Router();
const verifyRole = require('../middleware/verifyRole');

const { getStudentsFeeList , addFeeRecord, updateFeeStatus} = require('../controllers/staffController');

router.get('/', getStudentsFeeList);
router.post('/', addFeeRecord);

// Update fee status and add remark
router.put('/:id/mark-paid',updateFeeStatus);

module.exports = router;
