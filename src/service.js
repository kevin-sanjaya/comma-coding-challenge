export default class Service {
    trip = [];

    constructor() {
    }

    async populate() {
        let i = 1;
        while (true) {
            await fetch(`../mocks/trip (${i}).json`)
                .then(response => response.json())
                .then(json => this.trip.push(json));

            i += 1;

            if (i === 528)
                break;
        }
    }
}