
const { gql } = require("apollo-server");

const typeDefs = gql`
    # The Query type contains the entry points to our schema.
    # In future courses, we'll take a look at two other possible
    # entry points: Mutation and Subscription.
    type Query {
        "Get tracks array for homepage grid"
        tracksForHome: [Track!]!
        # Your resolvers can then use a field's provided arguments
        # to help determine how to populate the data for that field.
        # !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        #  Важно!!! Заданное здесь имя параметра trackIdDemo должно в
        # точности повторяться во всех местах, где происходит вызов track(...),
        # а именно при определении GET_TRACK и GET_MODULE_AND_PARENT_TRACK !!!
        track(trackIdDemo: ID!): Track
        "Fetch a specific module, provided a module's ID"
        module(id: ID!): Module!
    }

    type Mutation {
        incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
        
        assignSpaceship(spaceshipId: ID!, missionId: ID!): AssignSpaceshipResponse
    }

    type IncrementTrackViewsResponse {
        "Similar to HTTP status code, represents the status of the mutation"
        code: Int!
        "Indicates whether the mutation was successful"
        success: Boolean!
        "Human-readable message for the UI"
        message: String!
        "Newly updated track after a successful mutation"
        track: Track
    }
    
    type AssignSpaceshipResponse {
        "Similar to HTTP status code, represents the status of the mutation"
        code: Int!
        "Indicates whether the mutation was successful"
        success: Boolean!
        "Human-readable message for the UI"
        message: String!
        spaceship: Spaceship
        mission: Mission
    }

    type Spaceship {
        id: ID!
        year: Int!
        missionCount: Int
    }

    type Mission {
        id: ID!
        codename: String!
        spaceship: Spaceship
    }

    "A track is a group of Modules that teaches about a specific topic"
    type Track {
#  Важно!!! Поле должно называться - id !!!
        id: ID!
        "The track's title"
        title: String!
        "The track's main author"
        author: Author!
        "The track's main illustration to display in track card or track page detail"
        thumbnail: String
#        "The track's approximate length to complete, in seconds"
#        length: Int @deprecated(reason: "Use durationInSeconds")
        "The track's full duration, in seconds"
        durationInSeconds: Int
        "The number of modules this track contains"
        modulesCount: Int
        "The track's complete description, can be in Markdown format"
        description: String
        "The number of times a track has been viewed"
        numberOfViews: Int
        "The track's complete array of Modules"
        modules: [Module!]!
    }

    "Author of a complete Track"
    type Author {
#  Важно!!! Поле должно называться - id !!!
        id: ID!
        "Author's first and last name"
        name: String!
        "Author's profile picture url"
        photo: String
    }

    "A Module is a single unit of teaching. Multiple Modules compose a Track"
    type Module {
#  Важно!!! Поле должно называться - id !!!
        id: ID!
        "The Module's title"
        title: String!
#        "The Module's length in seconds"
#        length: Int @deprecated(reason: "Use durationInSeconds")
        "The module's video duration, in seconds"
        durationInSeconds: Int
        "The module's text-based description, can be in markdown format. In case of a video, it will be the enriched transcript"
        content: String
        "The module's video url, for video-based modules"
        videoUrl: String
    }
`;

module.exports = typeDefs;
