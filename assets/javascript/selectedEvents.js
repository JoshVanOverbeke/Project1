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
    let chosenDisplay=JSON.parse(localStorage.getItem("chosenEventsArray"));
    console.log(chosenDisplay);
    var startingPoint;
    //push seleceted events into array and sort them


    // this sort function will sort the array by date, run after all the events are pushed to the array
    chosenDisplay.sort(function(a, b){
      var dateA=new Date(a.start_time), dateB=new Date(b.start_time)
      return dateA-dateB //sort by date ascending
    })
    console.log(chosenDisplay)
    // ================================================================================================================
    // mapquest & leaflet logic for generating a map.
    // ================================================================================================================

    function fillLocations() {
        for (let i in chosenDisplay) {
            chosenDisplay[i] + ", ";
        }
    }

    $("#calculate-button").on("click", function (event) {
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
            center: [39.995149, -102.045473],
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
})
>>>>>>> 8f56bc6dd6b88c73cc3e36caddc1b558f8f26d96
