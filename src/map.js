import Service from './service.js';

export default class MapInterface {
    service = new Service();
    map = {};

    constructor() {
        this.set();
    }

    async set() {
        await this.service.populate();
        this.map = L.map('map').setView([this.service.trip[0].coords[0].lat, this.service.trip[0].coords[0].lng], 10);
        this.render();
    }

    render() {
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'YOUR_ACCESS_TOKEN_HERE'
        }).addTo(this.map);
    }
}





