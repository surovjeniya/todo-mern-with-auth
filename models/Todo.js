const {Schema,model,Types} = require('mongoose')

const todoSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    important: {
        type:Boolean,
        require:true,
        default:false
    },
    done: {
        type:Boolean,
        required:true,
        default:false
    },
    addedDate: {
        type:String,
        required:true
    },
    owner:{
        type:Types.ObjectId,
        ref:'User'
    }
})


module.exports = model('Todo',todoSchema)