// const privacy = require('./privacySchema');

// const addPrivacy = (req, res) => {
//     privacy.findOne({})
//         .then(existingPolicy => {
//             if (existingPolicy) {
//                 return res.json({
//                     status: 400,
//                     message: "A privacy policy already exists"
//                 });
//             }
            
//             const newPrivacy = new privacy({
//                 content: req.body.content
//             });

//             newPrivacy.save()
//                 .then(data => {
//                     res.json({
//                         status: 200,
//                         message: "Privacy Policy added successfully",
//                         data: data
//                     });
//                 })
//                 .catch(err => {
//                     console.error(err);
//                     res.json({
//                         status: 500,
//                         error: err
//                     });
//                 });
//         })
//         .catch(err => {
//             console.error(err);
//             res.json({
//                 status: 500,
//                 error: err
//             });
//         });
// };

// const updatePrivacy = (req, res) => {
//     const privacyId = req.params.id;
//     const updatedContent = req.body.content;

//     privacy.findByIdAndUpdate(privacyId, { content: updatedContent }, { new: true })
//         .then(data => {
//             if (!data) {
//                 return res.json({
//                     status: 404,
//                     message: "Privacy Policy not found"
//                 });
//             }
//             res.json({
//                 status: 200,
//                 message: "Privacy Policy updated successfully",
//                 data: data
//             });
//         })
//         .catch(err => {
//             console.error(err);
//             res.json({
//                 status: 500,
//                 error: err
//             });
//         });
// };

// const viewAllpolicy = (req, res) => {
//     privacy.find({})
//         .exec()
//         .then((data) => {
//             res.status(200).json({
//                 status: 200,
//                 message: "Privacy policies retrieved successfully",
//                 data: data
//             });
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(500).json({
//                 status: 500,
//                 message: "Error retrieving privacy policies",
//                 error: err
//             });
//         });
// };

// const viewPolicyById = (req, res) => {
//     const privacyId = req.params.id;

//     privacy.findById(privacyId)
//         .then(data => {
//             if (!data) {
//                 return res.json({
//                     status: 404,
//                     message: "Privacy Policy not found"
//                 });
//             }
//             res.json({
//                 status: 200,
//                 message: "Privacy Policy retrieved successfully",
//                 data: data
//             });
//         })
//         .catch(err => {
//             console.error(err);
//             res.json({
//                 status: 500,
//                 message: "Error retrieving privacy policy",
//                 error: err
//             });
//         });
// };

// module.exports = {
//     addPrivacy,
//     updatePrivacy,
//     viewAllpolicy,
//     viewPolicyById
// };
