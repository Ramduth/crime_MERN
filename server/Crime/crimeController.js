const crime=require("./crimeSchema");
const secret='crime';
const jwt=require('jsonwebtoken')
const multer=require('multer')

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./upload");
    },
    filename: function (req, file, cb) {
      const uniquePrefix = 'prefix-';
      const originalname = file.originalname;
      const extension = originalname.split('.').pop();
      const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
      cb(null, filename);
    },
  });

  const upload = multer({ storage: storage }).fields([
    { name: 'audioevidence', maxCount: 1 },
    { name: 'videoevidence', maxCount: 1 },
    { name: 'photoevidence', maxCount: 1 },
  ]);

  //Add crime

  const addCrime = async (req,res) =>{

    console.log(req.file);
    try{
        const {policestationname,victimname,victimgender,victimemail,victimaddress,incidentdate,incidenttime,incidentlocation,incidentcity,crimetype,crimeitem,witnessname,witnesscontact,witnessaddress,witnessstatement,numofsuspect,physicaldescription,evidencedescription,comments}=req.body;
        const newCrime=new crime({
            policestationname,
            victimname,
            victimgender,
            victimemail,
            victimaddress,
            incidentdate,
            incidenttime,
            incidentlocation,
            incidentcity,
            crimetype,
            crimeitem,
            witnessname,
            witnesscontact,
            witnessaddress,
            witnessstatement,
            numofsuspect,
            physicaldescription,
            evidencedescription,
            comments,
            audioevidence:req.files['audioevidence'] ? req.files['audioevidence'][0] : null,
            videoevidence:req.files['videoevidence'] ? req.files['videoevidence'][0] : null,
            photoevidence:req.files['photoevidence'] ? req.files['photoevidence'][0] : null
        })

        await newCrime.save()
        .then(data=>{
            return res.json({
                status:200,
                msg:"Case Added Successfully",
                data:data
            })
        })
        .catch(err=>{
            console.log(err);
            return res.json ({
                status : 500,
                msg : "Data not inserted",
                data : err
            });
        })
    }
    catch(error){
        res.status (500).json ({message : error.message});
    }
  };

  // View all Cases
const viewCrime = (req, res) => {
    crime.find({adminApproved:true})
        .exec()
        .then(data => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 200,
                    msg: "No Data obtained"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};


//View Crime By Id
const viewCrimeById = (req, res) => {
    crime.findById({ _id: req.params.id })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};

//Edit Crime By Id
const editCaseById = async (req, res) => {
    const { 
        policestationname, victimname, victimgender, victimemail, victimaddress, 
        incidentdate, incidenttime, incidentlocation, incidentcity, crimetype, 
        crimeitem, witnessname, witnesscontact, witnessaddress, witnessstatement, 
        numofsuspect, physicaldescription, evidencedescription, comments 
    } = req.body;
    
    const updateData = {
        policestationname,
        victimname,
        victimgender,
        victimemail,
        victimaddress,
        incidentdate,
        incidenttime,
        incidentlocation,
        incidentcity,
        crimetype,
        crimeitem,
        witnessname,
        witnesscontact,
        witnessaddress,
        witnessstatement,
        numofsuspect,
        physicaldescription,
        evidencedescription,
        comments,
    };

    if (req.files) {
        if (req.files['audioevidence']) updateData.audioevidence = req.files['audioevidence'][0];
        if (req.files['videoevidence']) updateData.videoevidence = req.files['videoevidence'][0];
        if (req.files['photoevidence']) updateData.photoevidence = req.files['photoevidence'][0];
    }

    

    try {
        const updatedCrime = await crime.findByIdAndUpdate(
            { _id: req.params.id }, 
            updateData, 
            { new: true }
        ).exec();

        if (!updatedCrime) {
            return res.status(404).json({
                status: 404,
                msg: "Case not found"
            });
        }

        res.json({
            status: 200,
            msg: "Updated successfully",
            data: updatedCrime
            
        });console.log("Update Data:", updatedCrime);
    } catch (err) {
        console.error("Error updating case:", err);
        res.status(500).json({
            status: 500,
            msg: "Data not updated",
            Error: err.message
        });
    }
};


//Accept Crime
const acceptCrimeById = (req, res) => {

    crime.findByIdAndUpdate({_id:req.params.id}, { adminApproved: true})
    .then(result => {
        if (result) { 
            res.json({
                status: 200,
                msg: 'Data obtained',
                data: result
            });
        } else {
            res.json({
                status: 200,
                msg: 'No Data obtained'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            status: 500,
            msg: 'Error in API',
            error: err
        });
    });
};

 //Reject Crime
 const rejectCrimeById =async (req, res) => {
    crime.findByIdAndDelete({_id:req.params.id})
    .exec()
        .then((result) => {
            res.json({
                status: 200,
                data: result,
                msg: 'data deleted'
            })
        })
        .catch(err => {
            res.json({
                status: 500,
                msg: 'Error in API',
                err: err
            })
        })
  
      }

// View Case By PoliceStation
const viewCaseByPolicestation = (req, res) => {
    const { policestationname } = req.body;
    
    if (!policestationname) {
        return res.status(400).json({
            status: 400,
            msg: "Police station name is required"
        });
    }

    crime.find({ policestationname: policestationname, adminApproved: false })        .exec()
        .then(data => {
            if (data.length > 0) {
                res.status(200).json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.status(404).json({
                    status: 404,
                    msg: "No Data obtained"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                error: err
            });
        });
};


  module.exports={
    addCrime,
    upload,
    viewCrime,
    editCaseById,
    acceptCrimeById,
    rejectCrimeById,
    viewCrimeById,
    viewCaseByPolicestation
  }