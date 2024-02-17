const complaintController = require('../controller/complaint_controller')
const router = require('express').Router()

router.get('/', complaintController.getComplaints)
router.get('/',complaintController.getComplaintID)
router.post('/', complaintController.insertComplaint)
router.put('/', complaintController.upComplaint)
router.delete('/',complaintController.delComplaint)

module.exports = router