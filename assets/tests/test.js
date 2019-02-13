
//Our starting location that is input in the form, us jquery to pull information
var startingPoint;
//push seleceted events into array and sort them
eventArray = [];

//this sort function will sort the array by date, run after all the events are pushed to the array
// eventArray.sort(function(a, b){
//   var dateA=new Date(a.date), dateB=new Date(b.date)
//   return dateA-dateB //sort by date ascending
// })
// ================================================================================================================
// mapquest & leaflet logic for generating a map
// ================================================================================================================


$("#calculate-button").on("click", function(event){
  event.preventDefault();
  

  startingPoint = $("#starting-point").val().trim()
  console.log(startingPoint)



//clears current map
$("#map").empty();


//initialize variables for mapquest/leaflet
var map,
  dir;


map = L.map('map', {
  layers: MQ.mapLayer(),
  center:[ 39.995149, -102.045473],
  zoom: 9
});
console.log(map)
dir = MQ.routing.directions();

dir.route({
  locations: [
    startingPoint,
    'marshall mn'
    // fillLocations()
  
  ]
});


map.addLayer(MQ.routing.routeLayer({
  directions: dir,
  fitBounds: true
}));
var map1 = L.1('map', {
  layers: MQ.mapLayer()
});

MQ.geocode().search('san francisco ca').on('success', function(e) {
  var best = e.result.best,
    latlng = best.latlng;

  map1.setView(latlng, 12);

  L.marker([ latlng.lat, latlng.lng ])
    .addTo(map1)
    .bindPopup('<strong>' + best.adminArea5 + ', ' + best.adminArea3 + '</strong> is located here.')
    .openPopup()
});
$("#starting-point").val("")
});
// =================================================================================================================
