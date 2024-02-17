const { baseResponse } = require('../../../../utils/response')
const complaintRepository = require('../repository/complaint_repository')
const {newcom} = require('../../../../entity/complaint')

// const getComplaints = async (req, res) => {
    
//     const complaintId = req.query.id

//     if(complaintId === undefined){
//         const complaintbyID = await complaintRepository.getComplaintByID(complaintId)
//         if (complaintbyID.error){
//             res.status(500).json(baseResponse(500,"Server error", null))
//             return
//         }
//         res.status(200).json(baseResponse(200,"",complaintbyID.data))

//     }
//     else {
//         const complaints = await complaintRepository.getAllComplaints()
//         if(complaints.error){
//             res.status(500).json(baseResponse(500,"Server Error"))
//             return
//         }
//         res.status(200).json(baseResponse(200,"",complaints.data))
//     }
// }

const getComplaints = async (req,res)=>{
    const complaints = await complaintRepository.getAllComplaints()
    if(complaints.error){
        res.status(500).json(baseResponse(500,"Server Error"))
        return
    }
    res.status(200).json(baseResponse(200,"",complaints.data))
}

const getComplaintID = async(req,res)=>{
    const complaintId = req.query.id
    const getcompid = await complaintRepository.getComplaintByID(complaintId)
    if(getcompid.error){
        res.status(500).json(baseResponse(500,"Server Error"))
        return
    }
    res.status(200).json(baseResponse(200,"",getcompid.data))
}

const insertComplaint = async(req,res)=>{
    const payload = req.body
    const NewComplaint = newcom(payload)

    const Ncomplaint = await complaintRepository.insertNewComplaint(NewComplaint)
    if(Ncomplaint.error){
        res.status(500).json(baseResponse(500,"Server Error"))
        return
    }
    res.status(201).json(baseResponse(201,"Complaint Created",Ncomplaint.data))

}

const upComplaint = async(req,res)=>{
    const payload = req.body
    const complaintId = req.query.id
    const NewComplaint = newcom(payload)

    if(complaintId === undefined){
        res.status(400).json(baseResponse(400,"Complaint ID Should Be Inserted"))
        return
    }

    const checkupcomp = await complaintRepository.getComplaintByID(complaintId)
    if(checkupcomp.data.length === 0){
        res.status(404).json(baseResponse(404,"Complaint Not Found",null))
        return
    }

    const upComp = await complaintRepository.updateComplaint(complaintId,NewComplaint)
    if(upComp.error){
        res.status(500).json(baseResponse(500,"Server Error",null))
        return
    }
    res.status(200).json(baseResponse(200,"Complaint Updated",upComp.data))
}

const delComplaint = async(req,res)=>{
    const complaintId = req.query.id

    const checkupcomp = await complaintRepository.getComplaintByID(complaintId)
    if(checkupcomp.data.length === 0){
        res.status(404).json(baseResponse(404,"Complaint Not Found",null))
        return
    }

    const delComp = await complaintRepository.deleteComplaint(complaintId)
    if(delComp.error){
        res.status(500).json(baseResponse(500,"Server Error"))
        return
    }
    res.status(200).json(baseResponse(200,"Complaint Deleted",delComp.data))
}

module.exports = {
    getComplaints,
    getComplaintID,
    insertComplaint,
    upComplaint,
    delComplaint
}