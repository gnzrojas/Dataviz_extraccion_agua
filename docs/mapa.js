if (mapboxgl) {
    const MAPBOX_KEY = 'pk.eyJ1IjoiZ256cm9qYXM5NCIsImEiOiJja3c1cHh3b20wcjlmMndsanR4d2NzcjI4In0.ejatFy2Kqx8LfknIMPR0yQ';
    mapboxgl.accessToken = MAPBOX_KEY;
    const map = new mapboxgl.Map({
        container: 'mapa', // container ID
        style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
        center: [-70.85913401127017, -32.72753208510023], // starting position
        zoom: 7 // starting zoom

    });

    Plotly.d3.json("declaracion_agotamiento.geojson", function (err, geojson_data) {
        if (err) {
            console.log("Error al leer GEOJSON", err);
            return;
        }


        console.log("GEOJSON", geojson_data);

        map.on('load', function () {
            map.addSource('d_agt', {
                'type': 'geojson',
                'data': geojson_data
            })


            map.addLayer({
                'id': 'd_agt',
                'type': 'fill',
                'source': 'd_agt', // reference the data source
                'layout': {},
                'paint': {
                    'fill-color': 'red', // blue color fill
                    'fill-opacity': 0.5,


                }
            });
        });
  
       

    });

}
