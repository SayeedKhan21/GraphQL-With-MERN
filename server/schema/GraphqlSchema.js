const {projects , clients} = require('../sampleData')
const {
    GraphQLObjectType ,
    GraphQLSchema ,
     GraphQLString ,
     GraphQLInt ,
     GraphQLID ,
     GraphQLList ,
     GraphQLNonNull ,
     GraphQLEnumType
} = require('graphql')


const Client = require('../models/Client')
const Project = require('../models/Project')

const ClientType = new GraphQLObjectType({
    name : "Client" ,
    fields : {
        id : { type : GraphQLID} ,
        name : {type : GraphQLString}  ,
        email : {type : GraphQLString} ,
        phone : {type : GraphQLString}
    }
})

const ProjectType = new GraphQLObjectType({
    name : "Project" ,
    fields : () => ({
        id : { type : GraphQLID} ,
        clientId : {type : GraphQLID} ,
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



//Mutations
const mutation = new GraphQLObjectType({
    name : 'Mutation' ,
    fields : {
        addClient :{
            type : ClientType ,
            args : {
                name : {type : GraphQLNonNull(GraphQLString)} ,
                email : {type : GraphQLNonNull(GraphQLString)} ,
                phone : {type : GraphQLNonNull(GraphQLString)},
            } ,
            
            resolve(parent ,{name ,email , phone}){
                const client =  new Client({
                    name ,
                    email ,
                    phone  ,
                }) 
                client.save()
                return client
                
            }
        }  ,

        deleteClient : {
            type : ClientType ,
            args : {
                id : {type : GraphQLNonNull(GraphQLID)}
            } ,

            resolve(parent ,{id}) {
                return Client.findByIdAndDelete(id)
            }
        } ,

        addProject : {
            type : ProjectType ,
            args : {
                name : {type : GraphQLNonNull(GraphQLString)} ,
                description : {type :GraphQLNonNull(GraphQLString)} ,
                status : {
                    type : new GraphQLEnumType({
                        name : "ProjectStatus" ,
                        values : {
                            'new' : {value : 'Not started'} ,
                            'progress' : {value : 'In Progress'} ,
                            'completed' : {value : 'Completed'}
                        } ,
                    }) ,
                    defaultValue : 'Not started'
                } ,
                clientId : {type : GraphQLNonNull(GraphQLID)}
            } ,

            resolve(parent , args) {
                const project =  new Project({
                    name : args.name ,
                    description : args.description ,
                    status : args.status ,
                    clientId : args.clientId 
                })

                return project.save()
            } ,
        } ,


        deleteProject : {
            type : ProjectType ,
            args : {
                id : {type :  GraphQLNonNull(GraphQLString)} ,
            } ,
            resolve(parent ,args){
                return Project.findByIdAndDelete(args.id)
            }
        } ,

        updateProject : {
            type : ProjectType  ,
            args : {
                id : {type : GraphQLNonNull(GraphQLID)}  ,
                name : {type : GraphQLString} ,
                description : {type : GraphQLString} ,
                status : {
                    type : new GraphQLEnumType({
                        name : "ProjectUpdateStatus" ,
                        values : {
                            'new' : {value : 'Not started'} ,
                            'progress' : {value : 'In Progress'} ,
                            'completed' : {value : 'Completed'}
                        } ,
                    }) 
                } ,
            } ,
             resolve(parent ,{id ,name ,description ,status}){
                const res =   Project.findByIdAndUpdate(
                    id , 
                    {name , description ,status} ,
                    {new : true}
                )

                return res
            }
        }
    }
})

const gschema = new GraphQLSchema({
    query : RootQuery ,
    mutation 
})
module.exports = gschema