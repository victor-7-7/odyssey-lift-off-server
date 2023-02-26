
const resolvers = {
    // Любой резолвер получает 4 параметра - (parent, args, contextValue, info)
    // https://www.apollographql.com/docs/apollo-server/data/resolvers/
    // Содержимое парента зависит от вида запроса.
    // Важно! Имя Query должно в точности совпадать с именем типа в схеме!
    Query: {
        // returns an array of Tracks that will be used to populate
        // the homepage grid of our web client
        tracksForHome: (_, __, { dataSources }) => {
            return dataSources.trackAPI.getTracksForHome();
        },
        // get a single track by ID, for the track page
        track: (_, {trackIdDemo}, {dataSources}) => {
            return dataSources.trackAPI.getTrack(trackIdDemo);
        },
        // get a single module by module ID, for the module detail page
        module: (_, {id}, {dataSources}) => {
            return dataSources.trackAPI.getModule(id);
        },
    },
    // Важно! Имя Mutation должно в точности совпадать с именем типа в схеме!
    Mutation: {
        // increments a track's numberOfViews property.
        // Важно! Имя мутации должно в точности совпадать со схемным!
        // We won't need the parent argument in this resolver,
        // because it's for a root field numberOfViews in our Track schema.
        incrementTrackViews: async (_, {id}, {dataSources}) => {
            try {
                const track = await dataSources.trackAPI.incrementTrackViews(id);
                return {
                    code: 200,
                    success: true,
                    message: `Successfully incremented number of views for track ${id}`,
                    track,
                };
            } catch (err) {
                return {
                    // We could set the code to be 404, but we can also be more
                    // dynamic and use the values that Apollo Server and the
                    // RESTDataSource class provide. When an error occurs,
                    // Apollo Server attaches an extensions field to that error
                    // that contains relevant error details. In this case,
                    // as our TrackAPI extends RESTDataSource, this extensions
                    // object will be enriched with a response property, which
                    // provides some additional information about the HTTP response
                    // itself. We can return the status property, which refers to
                    // the HTTP status code.
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    track: null
                };
            }
        },

        assignSpaceship: async (_, {spaceshipId, missionId}, {dataSources}) => {
            try { // Важно!! Порядок аргументов в методе имеет значение.
                const { spaceship, mission } = await dataSources.spaceAPI
                  .assignSpaceshipToMission(spaceshipId, missionId);
                return {
                    code: 200,
                    success: true,
                    message: `Successfully assigned spaceship ${spaceshipId} to mission ${missionId}`,
                    spaceship,
                    mission
                }
            } catch (err) {
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    spaceship: null,
                    mission: null
                }
            }
        }
    },

    Track: {
        // The parent argument contains data returned by our tracksForHome
        // resolver, and because tracksForHome returns a list, Apollo Server
        // iterates through that list and calls the author resolver once
        // for each track. It passes the current track as the value of parent,
        // enabling us to extract the authorId. Let's destructure authorId
        // from the parent argument.
        // Из парент-параметра (Track) мы деструктурировали поле author,
        // а из него деструктурировали id-поле
        author: ({ authorId }, _, { dataSources }) => {
            return dataSources.trackAPI.getAuthor(authorId);
        },
        // We'll destructure the first parameter to retrieve the id property
        // from the parent, that's the id of the module.
        // Из парент-параметра (Track) мы деструктурировали поле id
        modules: ({ id }, _, { dataSources }) => {
            return dataSources.trackAPI.getTrackModules(id);
        },
        // We'll destructure the first parameter for the length property.
        // We don't need any of the other resolver parameters
        durationInSeconds: ({ length }) => length,
    },

    Module: {
        // We'll destructure the first parameter for the length property.
        // We don't need any of the other resolver parameters
        durationInSeconds: ({ length }) => length,
    },
};

module.exports = resolvers;

