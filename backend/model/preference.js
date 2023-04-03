const mongoose = require ('mongoose');

const PreferenceSchema = new mongoose.Schema({
    type:{type: String,required:true,unique:true},
    isActive:{type: Boolean,default:true},
    isDeleted:{type:Boolean,default:false},
    createdAt:{type: Number},
    createdBy:{type: String},
    updatedAt:{type: Number},
    updatedBy:{type:String},
    deletedAt:{type:Number},
    deletedBy:{type:String},
    },
    { collection : 'preference'}
)

const model = mongoose.model('PreferenceSchema',PreferenceSchema)


module.exports = model