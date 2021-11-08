if (mapboxgl) {
    const MAPBOX_KEY = 'pk.eyJ1IjoiZ256cm9qYXM5NCIsImEiOiJja3ZiZXN3cWcwNXVqMnBubjBzMWt2ZW9jIn0.x3S9RneKDjwGMluUvHSDbA';
    mapboxgl.accessToken = MAPBOX_KEY;

    //Definir constante global con referencia al mapa
    const map = new mapboxgl.Map({
        container: "MapaAgua",
        style: "mapbox://styles/mapbox/outdoors-v11",
        center: [-70.90971394689318, -32.58134197478298],
        zoom: 7
    });

   
}

