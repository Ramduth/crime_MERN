const mongoose = require('mongoose')

const crimeSchema=mongoose.Schema({
    policestationname:{
        type:String,
        require:true
    },
    victimname:{
        type:String,

    },
    victimgender:{
        type:String,

    },
    victimemail:{
        type:String,

    },
    victimaddress:{
        type:String,

    },
    incidentdate:{
        type:Date,

    },
    incidenttime:{
        type: String

    },
    incidentlocation:{
        type:String,

    },
    incidentcity:{
        type:String,

    },
    crimetype:{
        type:String,

    },
    crimeitem:{
        type:String,

    },
    witnessname:{
        type:String,

    },
    witnesscontact:{
        type:Number,

    },
    witnessaddress:{
        type:String,

    },
    witnessstatement:{
        type:String,

    },
    numofsuspect:{
        type:Number,

    },
    physicaldescription:{
        type:String,

    },
    audioevidence:{
        type:Object,

    },
    videoevidence:{
        type:Object,

    },
    photoevidence:{
        type:Object,

    },
    evidencedescription:{
        type:String,

    },
    comments:{
        type:String,

    },
    adminApproved:{
        type:Boolean,
        default:false
    }

})

module.exports=mongoose.model('crime',crimeSchema)