
//Our staring location that is input in the form, us jquery to pull information
var startLocation;
//push seleceted events into array and sort them
eventArray = [];

//this sort function will sort the array by date, run after all the events are pushed to the array
eventArray.sort(function(a, b){
  var dateA=new Date(a.date), dateB=new Date(b.date)
  return dateA-dateB //sort by date ascending
})
// ================================================================================================================
// mapquest & leaflet logic for generating a map
// ================================================================================================================
function fillLocations(){
  for(let i in eventArray){
    eventArray[i]+", ";
  }
}

var map,
  dir;


map = L.map('map', {
  layers: MQ.mapLayer(),
  center: startLocation,
  zoom: 9
});

dir = MQ.routing.directions();

dir.route({
  locations: [
    startLocation,
    fillLocation()
  
  ]
});

map.addLayer(MQ.routing.routeLayer({
  directions: dir,
  fitBounds: true
}));
// =================================================================================================================
