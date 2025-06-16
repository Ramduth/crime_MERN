const mongoose = require("mongoose");
const { Schema } = mongoose;
const complaintSchema = new Schema(
    {
       
      citizenId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "citizens"
            },
           date:{
              type: Date,
              required: true,
            },
        
        complaint: {
            type: String,
            required:true

        }
    })
const complaint = mongoose.model("complaints", complaintSchema);
module.exports = complaint;