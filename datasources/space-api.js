
const { RESTDataSource } = require("apollo-datasource-rest");

class SpaceAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";
    }

    // Важно!! Порядок аргументов имеет значение.
    assignSpaceshipToMission(spaceshipId, missionId) {
        // В туториале Lift-off IV ничего не говорится про путь к ресурсу,
        // поэтому я написал от фонаря. Из это функции сервер должен вернуть
        // объект с двумя свойствами spaceship и mission
        // todo: it's stub-endpoint.
        return this.patch(`spaceship/${spaceshipId}/mission/${missionId}`);
    }
}
module.exports = SpaceAPI;

