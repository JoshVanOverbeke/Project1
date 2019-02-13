$(document).ready(function () {





  $("#search-event").on("click", function (event) {

    event.preventDefault();
  


      var what = "";
      var where = "";
      var when = "";
      var category = "";
      var eventTitle = "";
      var eventCity = "";
      var eventTime = "";
      var eventAddress = "";

    
      console.log($("#when-input").val().trim());
      //grab the dates from the form and split them apart so moment can convert them individually
      let dateSplit = $("#when-input").val().trim().split('-')
      console.log(dateSplit);
      //allow moment to understand the date format and convert each date into our search date format
      let dateRange1 = moment(dateSplit[0], 'MM/DD/YYYY').format('YYYYMMDD00');
      let dateRange2 = moment(dateSplit[1], 'MM/DD/YYYY').format('YYYYMMDD00');
      console.log(dateRange1)
  
      //invalid date
      if (moment(moment(dateSplit[0], 'MM/DD/YYYY')).isBefore(moment(), 'day') === true){
          console.log('this date is before the current date')
  
      }
      //valid date
      else{
      when = dateRange1+'-'+dateRange2;
      console.log('This is a valid date')
      console.log(when)
      


     
      what = $("#what-input").val().trim();
      where = $("#where-input").val().trim();
      where = $("#state-input").val().trim();
      category = $("#category-input").val();

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
              // console.log(i, event);
              // console.log(event.title);
              // console.log(event.start_time);
              // console.log(event.venue_address);
              // console.log(event.city_name);
              // console.log(event.title);
              // console.log(moment(event.start_time).format("MMM Do, YYYY hh:mm a"))




              //  console.log(i);
              let eventDescription = "";
              if (event.description) {
                  eventDescription = event.description;
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


              // eventTitle = 



              $("#add-event-button-" + i).on("click", function (event) {
                

                  // var title = 
                  // console.log((i).val(event.title));
                  // var startTime = $("#when-results").text(moment(event[i].start_time).format("MMM Do, YYYY hh:mm a"));
                  // var location = $("#where-results").text(event[i].venue_address + ", " + event[i].city_name + ", " + event[i].region_name);
                  // var description = $("#description-results").text(event[i].description);

                  event.preventDefault()
                  $("#card-" + i).hide();
                  $("#selected-events").append("<div><p>Testing!</p></div>");


              });



          });

      });
    };
  });
});


