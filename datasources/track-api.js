
const { RESTDataSource } = require("apollo-datasource-rest");

class TrackAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";
    }

    getTracksForHome() {
        return this.get('tracks');
    }

    getAuthor(authorId) {
        // Note the use of backticks (`) enclosing the author/:id
        // endpoint, because we're using string interpolation to add
        // the authorId at the end
        return this.get(`author/${authorId}`);
    }

    getTrack(trackId) {
        return this.get(`track/${trackId}`);
    }

    getTrackModules(trackId) {
        return this.get(`track/${trackId}/modules`);
    }

    getModule(moduleId) {
        return this.get(`module/${moduleId}`);
    }

    incrementTrackViews(trackId) {
        return this.patch(`track/${trackId}/numberOfViews`);
    }

}
module.exports = TrackAPI;

