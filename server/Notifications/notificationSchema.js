const mongoose = require("mongoose");
const { Schema } = mongoose;
const nSchema = new Schema(
    {

     
        psId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "police"
        },
        date: {
            type: Date,
            required: true,
        },

        caseType: {
            type: String,

        },
        district: {
            type: String,

        },
        target:{
            type: String,
            default:'all',
            enum:['all','users','police']
        }


    })
const complaint = mongoose.model("notifications", nSchema);
module.exports = complaint;