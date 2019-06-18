import Service from './service.js';

export default class MapInterface {
    constructor() {
        this.service = new Service();
    }

    run() {
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
        this.draw();
    }

    color() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    draw() {
        let latlngs = [];
        this.service.trip.forEach(trip => {
            trip.coords.forEach(coords => {
                latlngs.push([coords.lat, coords.lng]);
            });
            L.polyline(latlngs, { color: this.color(), weight: 1 })
                .addTo(this.map)
                .on('mouseover', event => {
                    event.target.color = event.target.options.color;
                    event.target.options.weight = 3;
                    event.target.setStyle({
                        color: 'black'
                    });
                    event.target.bringToFront();
                })
                .on('mouseout', event => {
                    event.target.options.weight = 1;
                    event.target.setStyle({
                        color: event.target.color
                    })
                });
            latlngs = [];
        });
    }
}





