let chosenEventsArray=[];

$(document).ready(function () {

    




    $("#search-event").on("click", function (event) {

        $("#event-result-divs").empty();
        let resultsArray=[];
        var what = "";
        var where = "";
        var when = "";
        var category = "";
        var eventTitle = "";
        var eventCity = "";
        var eventTime = "";
        var eventAddress = "";

        $("#event-result-divs").empty();
        event.preventDefault();
        what = $("#what-input").val().trim();
        where = $("#where-input").val().trim();
        when = $("#when-input").val();
        category = $("#category-input").val();

        // var queryURL = "http://api.eventful.com/json/events/search?app_key=jwB57nfLZLPxnQvv&category=movies&keywords";
        var queryURL = "http://api.eventful.com/json/events/search?app_key=jwB57nfLZLPxnQvv&category=" + what + "&l=" + where + "&within=25&units=miles&sort_order=popularity";
        // http://api.eventful.com/json/events/search?app_key=jwB57nfLZLPxnQvv&category=music&keywords
        
        console.log("hopefully empty array", resultsArray);

        $.ajax({
            url: queryURL,
            dataType: "json",
            method: "GET"
        }).then(function (response) {
            // console.log(response.events.event.title)
            response.events.event.forEach((event, i) => {
                
                resultsArray.push(event);
                
                // console.log(i, event);
                // console.log(event.title);
                // console.log(event.start_time);
                // console.log(event.venue_address);
                // console.log(event.city_name);
                // console.log(event.title);
                // console.log(moment(event.start_time).format("MMM Do, YYYY hh:mm a"))
                // for (let i = 0; i < response.events.event.length; i++) {


                let eventDescription="";
                if(event.description){
                    eventDescription=event.description;
                }
                else
                    eventDescription = "not available. Please see event URL for further details.";

                $("#event-result-divs").append("<div class='card' id='card-" + i + "'><h5 class='card-header'>" + event.title + "</h5>"
                    + "<div class='card-body'>"
                    + "<p class='card-text'>Date: " + moment(event.start_time).format("LLLL") + "</p>"
                    + "<p class= 'card-text'>Location: " + event.venue_address + ", " + event.city_name + ", " + event.region_abbr + ", " + event.postal_code + "</p>"
                    //this is where the collapse portion starts
                    + "<div class='row'>"
                    + "<div class='col'>"
                    + "<div class='collapse multi-collapse' id='collapse-card-" + i + "'>"

                    //Here we can add in more p tags for the event url, price, etc. 
                    + "<p class='card-text'>Description: " + eventDescription + "</p>"
                    + "<p class='card-text'>Event Web Page: <a href='" + event.url + "'>" + event.url + "</a></p>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "<a href='#collapse-card-" + i + "' data-toggle='collapse' role='button' aria-expanded= 'false' aria-controls='collapse-example-card'  class='btn btn-primary'>More Details</a>"
                    + "<button class='btn btn-primary' id='add-event-button-" + i + "'>Add to Trip</button>"
                    + "</div>"
                    + "</div>");

                    $("#add-event-button-"+i).on("click",function(){
                        $("#card-"+i).hide();
                        $("#selected-events").append("<div><p>Testing!</p></div>");
                        chosenEventsArray.push(resultsArray[i]);
                        console.log(chosenEventsArray);
                    
                        $("#events-chosen-divs").append(
                            
                        );
                    })
                //   $("#what-results").text(event[i].title);
                //   $("#when-results").text(moment(event[i].start_time).format("MMM Do, YYYY hh:mm a"));
                //   $("#where-results").text(event[i].venue_address + ", " + event[i].city_name + ", " + event[i].region_name);
                //   $("#description-results").text(event[i].description);

                // eventTitle = 



                $("#add-event-button-" + i).on("click", function (event) {

                    var title = 
                    console.log($("#what-results").text(event.title));
                    var startTime = $("#when-results").text(moment(event[i].start_time).format("MMM Do, YYYY hh:mm a"));
                    var location = $("#where-results").text(event[i].venue_address + ", " + event[i].city_name + ", " + event[i].region_name);
                    var description = $("#description-results").text(event[i].description);

                    event.preventDefault()
                    $("#card-" + i).hide();
                    $("#selected-events").append("<div><p>Testing!</p></div>");


                })





                // }



            });

            console.log("array with numbers", resultsArray);

        });
    });
});

