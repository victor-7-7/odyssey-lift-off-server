
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const TrackAPI = require("../datasources/track-api");
const SpaceAPI = require("../datasources/space-api");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // This is what enables us to access the dataSources.trackAPI
    // (and its methods) from the context parameter of our resolvers.
    dataSources: () => {
        return {
            trackAPI: new TrackAPI(),
            spaceAPI: new SpaceAPI(),
        };
    },
});

const startServer = async (srv) => {
    const { url } = await srv.listen({ port: process.env.PORT || 4000 });
    return url
}
startServer(server).then((url) => {
    console.log(` 🚀  Server ready at ${url}`);
})

// const port = process.env.PORT || 4000
// server.listen({ port }).then(() => {
//     console.log(`
//     🚀  Server is running!
//     🔉  Listening on port ${port}
//   `);
// });
