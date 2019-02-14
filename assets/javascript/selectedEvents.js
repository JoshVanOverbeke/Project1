<<<<<<< HEAD
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

function fillLocations(){
  for(let i in eventArray){
    eventArray[i]+", ";
  }
}

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
$("#starting-point").val("")
});
// =================================================================================================================
=======
$(document).ready(function () {
    //Our starting location that is input in the form, us jquery to pull information
    const chosenDisplay=JSON.parse(localStorage.getItem("chosenEventsArray"));
    var startingPoint;

    // this sorts the array by date, run after all the events are pushed to the array
    chosenDisplay.sort(function(a, b){
      var dateA=new Date(a.start_time), dateB=new Date(b.start_time)
      return dateA-dateB //sort by date ascending
    })
    console.log('sorted');
    console.log(chosenDisplay);

    // ================================================================================================================
    // mapquest & leaflet logic for generating a map.
    // ================================================================================================================
    let addresses = [];


    $("body").on("click", "#calculate-button", function (event) {
        

        startingPoint = $("#starting-point").val().trim();
        console.log(startingPoint);
        addresses = [];
        //push starting point to array first
        addresses.push(startingPoint);
        //push each address into the array
        for (let j in chosenDisplay) {
            addresses.push(chosenDisplay[j].venue_address + ", " + chosenDisplay[j].city_name + ", " + chosenDisplay[j].region_abbr + ", " + chosenDisplay[j].postal_code)
        }
        //clear the map
        $("#map-part").empty();
        //dynamically create map div and directions div
        let div= $("<div>");
        let mapDiv = div.attr("id", "map");
        let directionDiv = $("<div>").attr("id", "route-narrative");
        $("#map-part").append(mapDiv);
        $("#map-part").append(directionDiv);

        //stops map from disappearing
        event.preventDefault();
        //initialize variables for mapquest/leaflet
        var map,
        dir;

        map = L.map('map', {
            layers: MQ.mapLayer(),
            center: [39.995149, -102.045473],
            zoom: 9
        });
        //text route directions
        dir = MQ.routing.directions()
        .on('success', function(data) {
            var legs = data.route.legs,
                html = '',
                maneuvers,
                i;
    
            if (legs && legs.length) {
                maneuvers = legs[0].maneuvers;
    
                for (i=0; i < maneuvers.length; i++) {
                    html += (i+1) + '. ';
                    html += maneuvers[i].narrative + '';
                }
    
                L.DomUtil.get('route-narrative').innerHTML = html;
            }
        });

        dir.route({
            locations: addresses
        });

        map.addLayer(MQ.routing.routeLayer({
            directions: dir,
            fitBounds: true
        }));
        $("#starting-point").val("")
    });
    // =================================================================================================================
})
>>>>>>> 8f56bc6dd6b88c73cc3e36caddc1b558f8f26d96
