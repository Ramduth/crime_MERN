const Citizen = require('./citizenSchema');
  const secret = 'citizen'; // Replace this with your own secret key
const jwt=require('jsonwebtoken')
const registerCitizen = async (req, res) => {
    try {
         const { firstname, lastname,  dob,  gender,contact, email, aadhar, password, housename, street, district, nationality, pincode } = req.body;

        const newCitizen = new Citizen({
            firstname,
            lastname,
            contact,
            email,
            dob,
            aadhar,
            password,
            housename,
            street,
            district,
            nationality,
            pincode,
            dob,
            gender
        });

        let existingCitizen1 = await Citizen.findOne({ aadhar });
        if (existingCitizen1) {
            return res.json({
                status: 409,
                msg: "AadharNumber Already Registered With Us !!",
                data: null
            });
        }
        let existingCitizen = await Citizen.findOne({ contact });
        if (existingCitizen) {
            return res.json({
                status: 409,
                msg: "contact Number Already Registered With Us !!",
                data: null
            });
        }
        await newCitizen.save()
            .then(data => {
                return res.json({
                    status: 200,
                    msg: "Inserted successfully",
                    data: data
                });
            })
            .catch(err => {
                if (err.code === 11000) {
                    return res.json({
                        status: 409,
                        msg: "Email already in use",
                        data: err
                    });
                }
                return res.json({
                    status: 500,
                    msg: "Data not Inserted",
                    data: err
                });
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// View all citizens
const viewCitizens = (req, res) => {
    Citizen.find()
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

// Update citizen by ID
const editCitizenById =async (req, res) => {
    let flag=0
    const { firstname, lastname, contact,gender,  dob, email, housename, street, district, nationality, pincode } = req.body;
    let existingCitizen = await Citizen.find({ contact });
    let citizenData = await Citizen.findById({  _id: req.params.id  });
await existingCitizen.map(x=>{
    if (x.contact!=citizenData.contact) {
      flag=1        
    }
    
})

if(flag==0){
   
   await Citizen.findByIdAndUpdate({ _id: req.params.id }, {
        firstname,
        lastname,
        contact,
        email,
        dob,
        gender,
        housename,
        street,
        district,
        nationality,
        pincode
    })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Updated successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not Updated",
                Error: err
            });
        });
    }
    else{
        return res.json({
            status: 409,
            msg: "contact Number Already Registered With Us !!",
            data: null
        });
    }
};

// View citizen by ID
const viewCitizenById = (req, res) => {
    Citizen.findById({ _id: req.params.id })
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

// Delete citizen by ID
const deleteCitizenById = (req, res) => {
    Citizen.findByIdAndDelete({ _id: req.params.id })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data removed successfully",
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

// Forgot Password for citizen
const forgotPassword = (req, res) => {
    Citizen.findOneAndUpdate({ email: req.body.email }, {
        password: req.body.password
    })
        .exec()
        .then(data => {
            if (data != null)
                res.json({
                    status: 200,
                    msg: "Updated successfully"
                });
            else
                res.json({
                    status: 500,
                    msg: "User Not Found"
                });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not Updated",
                Error: err
            });
        });
};

// Reset Password for citizen
const resetPassword = async (req, res) => {
    let pwdMatch = false;

    await Citizen.findById({ _id: req.params.id })
        .exec()
        .then(data => {
            if (data.password === req.body.oldpassword)
                pwdMatch = true;
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not Updated",
                Error: err
            });
        });

    if (pwdMatch) {
        await Citizen.findByIdAndUpdate({ _id: req.params.id }, {
            password: req.body.newpassword
        })
            .exec()
            .then(data => {
                if (data != null)
                    res.json({
                        status: 200,
                        msg: "Updated successfully"
                    });
                else
                    res.json({
                        status: 500,
                        msg: "User Not Found"
                    });
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    msg: "Data not Updated",
                    Error: err
                });
            });
    } else {
        res.json({
            status: 405,
            msg: "Your Old Password doesn't match"
        });
    }
};

const createToken = (user) => {
    return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
  };
  
  const login = (req, res) => {
    const { email, password } = req.body;
  
    Citizen.findOne({ email }).then(user => {
     
  
      if (!user) {
        return res.json({status:405,msg: 'User not found' });
      }
  
        if (user.password!=password) {
          return res.json({ status:405,msg: 'Password Mismatch !!' });
        }if (!user.isActive) {
            return res.json({ status:405,msg: 'You Are Currently Deactivated By Admin !!' });
          }
  
      
        const token = createToken(user);
  
        res.json({
            status:200,
            data:user, 
            token });
     
    }).catch(err=>{
     console.log(err);
            return res.json({status:500,msg: 'Something went wrong' });
          
    })
  };
     
  //validate
  
  const requireAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
  
    console.log("t1",token);
    console.log("secret",secret);
    if (!token) {
      return res.json({status:401,msg: 'Unauthorized' });
    }
    jwt.verify(token, secret, (err, decodedToken) => {
      console.log(decodedToken);
      if (err) {
        return res.json({status:401, messagge: 'Unauthorized' ,err:err});
      }
  
      req.user = decodedToken.userId;
      next();
      return res.json({ status:200,msg: 'ok' ,user:decodedToken.userId});
    });
    console.log(req.user);
  };

  const activateCitizenById = (req, res) => {
    console.log("id",req.params.id);

    Citizen.findByIdAndUpdate({ _id: req.params.id }, { isActive:true }).exec()
        .then((result) => {
            res.json({
                status: 200,
                data: result,
                msg: 'data obtained'
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
  //Police accept completed
  
  const deactivateCitizenById =async (req, res) => {
    await Citizen.findByIdAndUpdate({ _id: req.params.id },{isActive:false}).exec()
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
  
  //Login Custome --finished

module.exports = {
    registerCitizen,
    viewCitizens,
    editCitizenById,
    viewCitizenById,
    deleteCitizenById,
    forgotPassword,
    resetPassword,
    login,
    requireAuth,
    deactivateCitizenById,
    activateCitizenById
};
