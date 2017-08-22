//Traitement Json

function displayWeather(response) {

    $(".temps").hide();
    $("#"+response.data.weather+"").show();


    $('#temperature').text(response.data.temperature+'°');
    $('#ville').text(response.data.city);


}

function displayTransport(response) {

    $('#distance_result').text(response.data.distance);
    $('#start_address_result').text(response.data.start_address_name);
    $('#end_address_result').text(response.data.end_address_name);
    $('#duration_result').text(response.data.duration);
}
function displayFromResponse(response) {

    for (var i in response) {
        if (response[i].type == "weather") {
            displayWeather(response[i]);

        } else if (response[i].type == "transport.google_direction.driving") {
            displayTransport(response[i]);
            lat = response[i].data.start_location.lat;
            lng = response[i].data.start_location.lng;

        }
    }
}





$.getJSON( "result.json", function( data ) {
    // console.log(data.data[0].type);
    // console.log(data.data[0].data.temperature);
    //console.log(data.data[0].data.temps);
    displayFromResponse(data.data);
    displayTransport(data);
   // recupLocation(data.data);
    $('.result_type').text(data.data[0].type);


});
