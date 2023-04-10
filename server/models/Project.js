const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    name : {
        type : String
    } ,
    description : {
        type : String ,
    } ,
    status : {
        type   : String ,
        enum : ['Not started' , 'In progress' , 'Completed']
    } ,
    clientId : {
        type: mongoose.Schema.Types.ObjectId ,
        red : 'Client'
    }
})

const Project = mongoose.model('project' , ProjectSchema)

module.exports  = Project