//Traitement Json

function traitementAjax(){
    var addressFrom = $('#search-input-from').val();
    var  addressTo = $('#search-input-to').val();
    $.ajax({
    url : 'https://api.anatroc/app_dev.php/',
    type : 'POST',
    data : 'addressFrom='+addressFrom + '&addressTo='+addressTo,
    dataType : 'JSON',
    success : function(data){
        console.log(data + 'succes');
    },
    error : function(data){
        console.log(data + 'erreur');
    },
});
}
/**
 *  recupere les info pour la meteo
 * **/
function displayWeather(response) {

    $(".temps").hide();
    $("#"+response.data.weather+"").show();


    $('#temperature').text(response.data.temperature+'°');
    $('#ville').text(response.data.city);
}

/** Get Json DATA transport  **/
function displayTransport(response) {

    $('#distance_result').text(response.data.distance);
    $('#start_address_result').text(response.data.start_address_name);
    $('#end_address_result').text(response.data.end_address_name);
    $('#duration_result').text(response.data.duration);
}

/**
 *  Recuper les valeurs du Json, check les differents types.
 * **/
function ResultResponse(response){

    for (var i in response) {
        if (response[i].type == "weather") {
            displayWeather(response[i]);

        } else if (response[i].type == "transport.google_direction.driving") {
            displayTransport(response[i]);
            lat = response[i].data.start_location.lat;
            lng = response[i].data.start_location.lng;
        }else if(response[i].type == "transport.velov"){
            latVelov[i] = response[i].data.localisation.lat;
            lngVelov[i] = response[i].data.localisation.lng;
        }
    }
}

/**
 * recupere la position, la destination et le mode de transport
 * **/
function GetPosition(ori,dest,travelM){
    origin = ori;
    destination = dest;
    travelMode = travelM;
}

$.getJSON( "result.json", function( data ) {
    // console.log(data.data[0].type);
    // console.log(data.data[0].data.temperature);
    //console.log(data.data[0].data.temps);
    displayFromResponse(data.data);
    displayTransport(data);
    GetJsonPosition('grenoble','lyon','WALKING');
    //recupLocation(data.data);
    $('.result_type').text(data.data[0].type);
});
