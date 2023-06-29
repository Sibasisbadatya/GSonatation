import { ApolloServer } from 'apollo-server-express'
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core'
import dotenv from 'dotenv'
import typeDefs from './schemaGql.js'
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'
// import { MONGO_URI, JWT_SECRET } from "./config.js";
import express from 'express';
import http from 'http';
const PORT = process.env.PORT || 8000
if (process.env.NODE_ENV !== "production")
    dotenv.config();

const app = express();
const httpServer = http.createServer(app);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("connected to mongodb")
})

mongoose.connection.on("error", (err) => {
    console.log("error connecting", err)
})


//import models here
import './models/Quotes.js'
import './models/User.js'

import resolvers from './resolvers.js'

const context = ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
        return { userId }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        process.env.NODE_ENV !== "production" ?
            ApolloServerPluginLandingPageGraphQLPlayground()
            : ApolloServerPluginLandingPageDisabled()
    ]
});


    // app.use(express.static('sonatation/build'))
    // app.get("*", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    // })


await server.start();
server.applyMiddleware({
    app,
    path: '/graphql'
});

httpServer.listen({ port: PORT }, () => {
    console.log(`🚀  Server ready at ${server.graphqlPath}`);
})


