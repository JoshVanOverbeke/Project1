$(document).ready(function () {


  console.log('hi')
// api key
  var config = {
    apiKey: "AIzaSyA8pncokrdjpsKZXsfCIWGbJhrDfbrYR-c",
    authDomain: "project1-1549649048221.firebaseapp.com",
    databaseURL: "https://project1-1549649048221.firebaseio.com",
    projectId: "project1-1549649048221",
    storageBucket: "",
    messagingSenderId: "889307185213"
  };
  firebase.initializeApp(config)
  //search function
  $("#search-event").on("click", function (event) {

    var what = "";
    var where = "";
    var when = "";
    // var category = "";
    event.preventDefault();
    //retreiving info from dom
    what = $("#what-input").val().trim();
    where = $("#where-input").val().trim();
    when = $("#when-input").val();
    category = $("#category-input").val();
    console.log("1 ")
    // var queryURL = "http://api.eventful.com/json/events/search?app_key=jwB57nfLZLPxnQvv&category=movies&keywords";
    var queryURL = "http://api.eventful.com/json/events/search?app_key=jwB57nfLZLPxnQvv&category=" + what + "&l=" + where + "&within=25&units=miles&sort_order=popularity&t=" + when;
    // http://api.eventful.com/json/events/search?app_key=jwB57nfLZLPxnQvv&category=music&keywords
    $.ajax({
      url: queryURL,
      dataType: "json",
      method: "GET"
    }).then(function (response) {
      // console.log(response.events.event.title)
      response.events.event.forEach((event, i) => {
        console.log(event);
        console.log(event.title);
        console.log(event.start_time);
        console.log(event.venue_address);
        console.log(event.city_name);
        console.log(event.title);
        console.log(moment(event.start_time).format("MMM Do, YYYY hh:mm a"))
       
        // creating new containers
        $("#event-result-divs").append("<div class='card' id='card-" + i + "'><h5 class='card-header'>"+event.title+ "</h5></div>")
              






          //  $("#what-results").text(event[i].title)
          //  $("#when-results").text(moment(event[i].start_time).format("MMM Do, YYYY hh:mm a"));
          //  $("#where-results").text(event[i].venue_address + ", " + event[i].city_name + ", " + event[i].region_name);
          //   $("#description-results").text(event[i].description);

          // $("#cardDiv").append(results)


        // }

      });

    });
  });
});
