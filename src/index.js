
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const TrackAPI = require("../datasources/track-api");
const SpaceAPI = require("../datasources/space-api");

// const mocks = {
//     Query: () => ({
//         tracksForHome: () => [...new Array(6)],
//     }),
//     Track: () => ({
//         id: () => "track_01",
//         title: () => "Astro Kitty, Space Explorer",
//         author: () => {
//             return {
//                 name: "Grumpy Cat",
//                 photo:
//                     "https://res.cloudinary.com/dety84pbu/image/upload/v1606816219/kitty-veyron-sm_mctf3c.jpg",
//             };
//         },
//         thumbnail: () =>
//             "https://res.cloudinary.com/dety84pbu/image/upload/v1598465568/nebula_cat_djkt9r.jpg",
//         length: () => 1210,
//         modulesCount: () => 6,
//     }),
// };
//
// const server = new ApolloServer({ typeDefs, mocks });

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

server.listen().then(() => {
    console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at http://localhost:4000
  `);
});
