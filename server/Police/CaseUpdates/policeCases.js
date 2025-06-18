const mongoose = require("mongoose");
const { Schema } = mongoose;
const caseSchema = new Schema(
    {
       
      crimeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "crimes",
            required:true
            },
            citizenId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "citizens",
                required: false
                },
                
           date:{
              type: Date,
              required: true,
            },
        
        officeInCharge: {
            type: String,
            required:true

        },
        status: {
            type: String,
            required:true

        },
        description: {
            type: String,
            required:true

        }
    },{timestamps:true})
const complaint = mongoose.model("policecases", caseSchema);
module.exports = complaint;