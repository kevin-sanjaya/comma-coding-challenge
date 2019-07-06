import Service from './service.js';

export default class MapInterface {
    constructor() {
        this.service = new Service();
        this.activeLayer = [];
		this.speed = [];
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
		let speed = [];
        this.service.trip.forEach(trip => {
            trip.coords.forEach(coords => {
                latlngs.push([coords.lat, coords.lng]);
				speed.push(coords.speed);
            });
            L.polyline(latlngs, { color: this.color(), weight: 1 })
                .addTo(this.map)
                .bindPopup(`Average speed: ${speed.reduce((a, b) => a + b, 0)/speed.length}`, { closeOnClick: false, autoClose: false })
                .on('mouseover', event => {
                    event.target.setStyle({
                        weight: 5
                    });
                    event.target.bringToFront();
                })
                .on('mouseout', event => {
                    if (!this.activeLayer.includes(event.target)) {
                        event.target.setStyle({
                            weight: 1
                        });
                    }
                })
                .on('click', event => {
                    if (!this.activeLayer.includes(event.target) || this.activeLayer.length === 0) {
                        event.target.setStyle({
                            weight: 5
                        });
                        event.target.bringToFront();
                        this.activeLayer.push(event.target);
                    } else {
                        event.target.closePopup();
                        this.activeLayer[this.activeLayer.indexOf(event.target)].setStyle({
                            weight: 1
                        });
                        this.activeLayer = this.activeLayer.filter(layer => layer !== event.target);
                    }
                });
            latlngs = [];
			speed= [];
        });
    }
}





