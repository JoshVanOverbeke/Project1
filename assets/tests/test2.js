$(document).ready(function () {




    // var config = {
    //   apiKey: "AIzaSyA8pncokrdjpsKZXsfCIWGbJhrDfbrYR-c",
    //   authDomain: "project1-1549649048221.firebaseapp.com",
    //   databaseURL: "https://project1-1549649048221.firebaseio.com",
    //   projectId: "project1-1549649048221",
    //   storageBucket: "",
    //   messagingSenderId: "889307185213"
    // };
    // firebase.initializeApp(config);
    $("#search-event").on("click", function (event) {


        var what = "";
        var where = "";
        var when = "";
        var category = "";
        event.preventDefault();
        what = $("#what-input").val().trim();
        where = $("#where-input").val().trim();
        when = $("#when-input").val();
        category = $("#category-input").val();

        // var queryURL = "http://api.eventful.com/json/events/search?app_key=jwB57nfLZLPxnQvv&category=movies&keywords";
        var queryURL = "http://api.eventful.com/json/events/search?app_key=jwB57nfLZLPxnQvv&category=" + what + "&l=" + where + "&within=25&units=miles&sort_order=popularity";
        // http://api.eventful.com/json/events/search?app_key=jwB57nfLZLPxnQvv&category=music&keywords
        $.ajax({
            url: queryURL,
            dataType: "json",
            method: "GET"
        }).then(function (response) {
            console.log(response.events.event.title)
            response.events.event.forEach((event, i) => {
                console.log(i, event);
                console.log(event.title);
                console.log(event.start_time);
                console.log(event.venue_address);
                console.log(event.city_name);
                console.log(event.title);
                console.log(moment(event.start_time).format("MMM Do, YYYY hh:mm a"))
                // for (let i = 0; i < response.events.event.length; i++) {

                /*
                <div class="card" id = "cardDiv">
                              <div class="card-header" id = "what-results"></div>
                              <div class="card-body">
                                  <p class="card-text" id ="when-results"></p>
                                  <p class="card-text" id = "where-results"></p>
                                  <p class="card-text"></p>
                                  <div class="row">
                                      <div class="col">
                                          <div class="collapse multi-collapse" id="collapse-example-card">
                                              <p class="card-text" >
                                                  <div id = "description-results"></div>
                                                 
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                                  <a href="#collapse-example-card" data-toggle="collapse" role="button" aria-expanded="false"
                                      aria-controls="collapse-example-card" class="btn btn-primary">More Details</a>
                                  <a href="#" class="btn btn-primary">Add to Trip</a>
                              </div>
                          </div>
                          */
                //  console.log(i);
                let eventDescription="";
                if(event.description){
                    eventDescription=event.description;
                }
                else
                    eventDescription="not available. Please see event URL for further details.";

                $("#event-result-divs").append("<div class='card' id='card-" + i + "'><h5 class='card-header'>" + event.title + "</h5>"
                    + "<div class='card-body'>"
                    + "<p class='card-text'>Date: " + moment(event.start_time).format("LLLL") + "</p>"
                    + "<p class= 'card-text'>Location: " + event.venue_address + ", " + event.city_name + ", " + event.region_abbr + event.postal_code+ "</p>"
    //this is where the collapse portion starts
                    + "<div class='row'>"
                    + "<div class='col'>"
                    + "<div class='collapse multi-collapse' id='collapse-card-" + i + "'>"
                    
                    //Here we can add in more p tags for the event url, price, etc. 
                    +"<p class='card-text'>Description: "+eventDescription+"</p>"
                    + "<p class='card-text'>Event Web Page: <a href='" +event.url+"'>"+event.url+"</a></p>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "<a href='#collapse-card-" + i + "' data-toggle='collapse' role='button' aria-expanded= 'false' aria-controls='collapse-example-card'  class='btn btn-primary'>More Details</a>"
                    + "<button class='btn btn-primary' id='add-event-button-"+i+"'>Add to Trip</button>"
                    + "</div>"
                    + "</div>");

                    $("#add-event-button-"+i).on("click",function(){
                        $("#card-"+i).hide();
                        $("#selected-events").append("<div><p>Testing!</p></div>");
                    })
                //   $("#what-results").text(event[i].title);
                //   $("#when-results").text(moment(event[i].start_time).format("MMM Do, YYYY hh:mm a"));
                //   $("#where-results").text(event[i].venue_address + ", " + event[i].city_name + ", " + event[i].region_name);
                //   $("#description-results").text(event[i].description);

                // $("#card").append()


                // }

            });

        });
    });
});
