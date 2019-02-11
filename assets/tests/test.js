var map,
  dir;

map = L.map('map', {
  layers: MQ.mapLayer(),
  center: [ 42.346353, -71.415958 ],
  zoom: 9
});

dir = MQ.routing.directions();

dir.route({
  locations: [
    'worcester ma',
    { latLng: { lat: 42.346797, lng: -71.547966 }},
    { city: 'san diego', state: 'ca' }
  ]
});

map.addLayer(MQ.routing.routeLayer({
  directions: dir,
  fitBounds: true
}));