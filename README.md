# Trippin

## Project 1
***

https://project-trippin.herokuapp.com/index.html

## Description

A website that assists users in planning a roadtrip around events (Comedy shows, concerts, etc.) in different cities, and then providing a map with directions for the upcoming roadtrip.

## New Technologies
* Leaflet - JavaScript library needed for the MapQuest API to have any functionality. 
* bootstrap.build - Website that provides live previews as you customize Bootstrap's theming and CSS. Has the ability to customize any Bootstrap component, from Jumbotrons to forms.

## Code Snippet
### selectedEvents.js, lines 3 to 10
        const chosenDisplay=JSON.parse(localStorage.getItem("chosenEventsArray"));
        var startingPoint;
    
        // this sorts the array by date, run after all the events are pushed to the array
        chosenDisplay.sort(function(a, b){
          var dateA=new Date(a.start_time), dateB=new Date(b.start_time)
          return dateA-dateB //sort by date ascending
        })
Pulls the object as a string out of local storage and converts it into JSON. This will sort the objects pulled from the Eventful API based on their date.

## Which APIs

* Eventful

* MapQuest

## Other Info

* CORS is needed for the Eventful API. MapQuest doesn't need it, but is not affected by it.

* The assets/tests file is full of test code that may not work, but it isn't linked to the main files.

* Bug: If you add events to the 'Selected Events' list, then go directly to the 'Selected Events/Trips' page and come back, the 'Clear All Events' button will not work properly. Refreshing the page will update the DOM and fix this.

* Bug: The directions on the 'Selected Events' page will only give you directions to the first location.
