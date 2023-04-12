const express  = require('express')
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')
const gschema  = require('./schema/GraphqlSchema')
const colors  = require('colors')
const connectDB = require('./config/connect')
const cors = require('cors')




const PORT = process.env.PORT || 5000
const app = express()

//connect mongo
connectDB()


app.use(cors())

app.use('/graphql' , graphqlHTTP({
    schema : gschema ,
    graphiql : (process.env.NODE_ENV==='development')
}))

app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
})