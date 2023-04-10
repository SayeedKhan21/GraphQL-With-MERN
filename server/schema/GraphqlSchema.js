const {projects , clients} = require('../sampleData')
const {GraphQLObjectType  ,GraphQLSchema, GraphQLString , GraphQLInt, GraphQLID, GraphQLList} = require('graphql')
const Client = require('../models/Client')
const Project = require('../models/Project')

const ClientType = new GraphQLObjectType({
    name : "Client" ,
    fields : () => ({
        id : { type : GraphQLInt} ,
        name : {type : GraphQLString}  ,
        email : {type : GraphQLString} ,
        phone : {type : GraphQLString}
    })
})

const ProjectType = new GraphQLObjectType({
    name : "Project" ,
    fields : () => ({
        id : { type : GraphQLInt} ,
        clientId : {type : GraphQLInt} ,
        name : {type : GraphQLString} ,
        description : {type : GraphQLString} ,
        status : {type : GraphQLString} ,
        client : {
            type : ClientType ,
            resolve(parent ,args){
                return Client.findById(parent.clientId)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType' ,
    fields : () =>  ({
        clients : {
            type : GraphQLList(ClientType),
            resolve(parent ,args){
                return Client.find()
            }
        } ,
        projects : {
            type : GraphQLList(ProjectType),
            resolve(parent ,args){
                return Project.find()
            }
        } ,
        project: {
            type : ProjectType ,
            args : {id : { type : GraphQLID}} ,
            resolve(parent ,args){
                return Project.findById(args.id)
            }
        } ,
        client : {
            type : ClientType ,
            args : {id : {type:GraphQLID}} ,
            resolve(parent ,args) {
                return Client.findById(args.id )
            }
        }
    })
})


const gschema = new GraphQLSchema({
    query : RootQuery ,
})

module.exports = gschema