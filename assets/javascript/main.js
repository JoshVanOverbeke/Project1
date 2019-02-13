//Global variable
let dateRange="";

$('input[name="dates"]').daterangepicker()

//click handler for search button
$("#search-button").on("click", function(event) {
    event.preventDefault();
    
    console.log($('#date-range').val().trim());
    //grab the dates from the form and split them apart so moment can convert them individually
    let dateSplit = $('#date-range').val().trim().split('-')
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
    dateRange = dateRange1+'-'+dateRange2;
    console.log('This is a valid date')
    console.log(dateRange)
    }

})