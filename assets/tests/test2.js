$(document).ready(function () {
    let chosenDisplay=JSON.parse(localStorage.getItem("chosenEventsArray"));
    console.log(chosenDisplay);
    let chosenEventsArray=[];

    if(chosenDisplay === undefined){
        console.log('undefined chosenDisplay')
    }

    else{
        console.log('else')
        for(let j =0; j<chosenDisplay.length; j++){
            chosenEventsArray.push(chosenDisplay[j]);
            let SelectedEventDescription0="";
            if(chosenDisplay[j].description){
                SelectedEventDescription0=chosenDisplay[j].description;
            }
            else{
                SelectedEventDescription0 = "not available. Please see event URL for further details.";
            }
            console.log(chosenDisplay[j]);
            $("#events-chosen-divs").append("<div class='card'>"
            +"<div class='card-header'>"
            +"<h5>"+chosenDisplay[j].title+"</h5></div>"
            +"<div class='card-body'>"
            + "<p class='card-text'>Date: " + moment(chosenDisplay[j].start_time).format("LLLL") + "</p>"
            + "<p class= 'card-text'>Location: " + chosenDisplay[j].venue_address + ", " + chosenDisplay[j].city_name + ", " + chosenDisplay[j].region_abbr + ", " + chosenDisplay[j].postal_code + "</p>"
            + "<div class='row'>"
            + "<div class='col'>"
            + "<div class='collapse multi-collapse' id='collapse-card-2-" + j + "'>"
            + "<p class='card-text'>Description: " + SelectedEventDescription0 + "</p>"
            + "<p class='card-text'>Event Web Page: <a href='" + chosenDisplay[j].url + "'>Click Here</a></p>"
            +"</div>"
            + "<a href='#collapse-card-2-" + j + "' data-toggle='collapse' role='button' aria-expanded= 'false' aria-controls='collapse-example-card'  class='btn btn-primary'>More Details</a>"
            +"</div>"
            +"</div>"
            +"</div>");
        };
    };

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
                    + "<p class='card-text'>Event Web Page: <a href='" + event.url + "'>Click Here</a></p>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "<a href='#collapse-card-" + i + "' data-toggle='collapse' role='button' aria-expanded= 'false' aria-controls='collapse-example-card'  class='btn btn-primary my-4'>More Details</a>"
                    + "<button class='btn btn-primary mx-2 my-4' id='add-event-button-" + i + "'>Add to Trip</button>"
                    + "</div>"
                    + "</div>");


                    let SelectedEventDescription="";
                    if(resultsArray[i].description){
                        SelectedEventDescription=resultsArray[i].description;
                    }
                    else
                        SelectedEventDescription = "not available. Please see event URL for further details.";

                    $("#add-event-button-"+i).on("click",function(){
                        
                        $("#empty-events").hide();
                        $("#card-"+i).hide();
                        chosenEventsArray.push(resultsArray[i]);
                        localStorage.setItem("chosenEventsArray",JSON.stringify(chosenEventsArray));
                        console.log(chosenEventsArray);
                        console.log(JSON.parse(localStorage.getItem(chosenEventsArray)));

                        $("#events-chosen-divs").append("<div class='card'>"
                        +"<div class='card-header'>"
                        +"<h5>"+resultsArray[i].title+"</h5></div>"
                        +"<div class='card-body'>"
                        + "<p class='card-text'>Date: " + moment(resultsArray[i].start_time).format("LLLL") + "</p>"
                        + "<p class= 'card-text'>Location: " + resultsArray[i].venue_address + ", " + resultsArray[i].city_name + ", " + resultsArray[i].region_abbr + ", " + resultsArray[i].postal_code + "</p>"
                        + "<div class='row'>"
                        + "<div class='col'>"
                        + "<div class='collapse multi-collapse' id='collapse-card-2-" + i + "'>"
                        + "<p class='card-text'>Description: " + SelectedEventDescription + "</p>"
                        + "<p class='card-text'>Event Web Page: <a href='" + resultsArray[i].url + "'>Click Here</a></p>"
                        +"</div>"
                        + "<a href='#collapse-card-2-" + i + "' data-toggle='collapse' role='button' aria-expanded= 'false' aria-controls='collapse-example-card'  class='btn btn-primary'>More Details</a>"
                        +"</div>"
                        +"</div>"
                        +"</div>");

                    })









            });

            console.log("array with numbers", resultsArray);

        });
    });
});

