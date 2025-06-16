const complaint = require('./complaintSchema');

const addcomplaint = (req, res) => {


  const complaint1 = new complaint({
    citizenId: req.body.citizenId,
    
      complaint:req.body.complaint,
      date:new Date()

  });

  complaint1.save()
  .then(data=>{
    res.json({
      status:200,
      message: "complaint added  successfully",
      data: data,
  }
  )
})
   .catch(err=>{
    console.error(err);
      res.json({
        err:err,
      status:500,
   });
  })
   
}

const viewAllcomplaints = (req, res) => {
  complaint.find()
   
    .populate('citizenId')
  .exec().
    then((complaints) => {
      res.status(200).json({
        status:200,
        message: "complaints retrieved successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        status:500,
        message: "Error retrieving complaints",
        error: err,
      });
    });
};


const deletecomplaintById = (req, res) => {
  complaint.findByIdAndDelete({ _id: req.params.id })
    .exec().
    then((complaints) => {
      res.json({
        status:200,
        message: "complaints deleted successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        status:500,
        message: "Error retrieving complaints",
        error: err,
      });
    });
};


const viewcomplaintById = (req, res) => {
  complaint.findById({ _id: req.params.id })
    .exec().
    then((complaints) => {
      res.json({
        status:200,
        message: "complaints deleted successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        status:500,
        message: "Error retrieving complaints",
        error: err,
      });
    });
};


const viewcomplaintByCitizenId = (req, res) => {
  complaint.find({ citizenId:req.params.id })
    .exec().
    then((complaints) => {
      res.json({
        status:200,
        message: "complaints obtained successfully",
        data: complaints,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        status:500,
        message: "Error retrieving complaints",
        error: err,
      });
    });
};


module.exports = {
  addcomplaint,
  viewAllcomplaints,
  viewcomplaintById,
  deletecomplaintById,
  viewcomplaintByCitizenId
 
}
