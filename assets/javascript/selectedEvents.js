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