export default class Service {
    constructor() {
        this.trip = [];
    }

    async populate() {
        let i = 1;
        while (true) {
            await fetch(`../mocks/trip (${i}).json`)
                .then(response => response.json())
                .then(json => this.trip.push(json));

            i += 1;

            if (i === 527)
                break;
        }
    }
}