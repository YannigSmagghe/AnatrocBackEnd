//Traitement Json

var urlRoot = "https://api.anatroc/";
var dev = 1;

var urlApi;

if(dev === 1)
{
    urlApi = urlRoot + "app_dev.php";
}
else
{
    urlApi = urlRoot;
}



function traitementAjax(){
    var addressFrom = $('#search-input-from').val();
    var  addressTo = $('#search-input-to').val();


    $.ajax({
        url : urlApi,
        type : 'POST',
        data : 'addressFrom='+addressFrom + '&addressTo='+addressTo,
        dataType : 'JSON',
        success : function(data)
        {
            console.log(data + 'succes');
            showResultsPage(data);
        },
        error : function(data)
        {
            console.log(data + 'erreur');
        }
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
function ResultResponse(response) {
    console.log(response);
    var date = new Date();
    var duration;


    for (var i in response) {
        if (response[i].hasOwnProperty('type')) {
            if (response[i].type === "transport.google_direction.walking") {

                duration = new Date(response[i].data.duration * 1000);
                duration.setHours(duration.getHours() - 1);
                $('.actual-time-span-walk').text(getFormatedTime(date));
                $('.arrival-time-span-walk').text(getFormatedTime(getDateEnd(response[i].data.duration)));
                $('#walk-range').text(response[i].data.distance);
                $('#walk-time').text(getFormatedTime(duration));
            }
            else if (response[i].type === "transport.google_direction.bicycling") {


                duration = new Date(response[i].data.duration * 1000);
                duration.setHours(duration.getHours() - 1);
                $('.actual-time-span-bike').text(getFormatedTime(date));
                $('.arrival-time-span-bike').text(getFormatedTime(getDateEnd(response[i].data.duration)));
                $('#bike-range').text(response[i].data.distance);
                $('#bike-time').text(getFormatedTime(duration));
            }
            else if (response[i].type === "transport.google_direction.driving") {


                duration = new Date(response[i].data.duration * 1000);
                duration.setHours(duration.getHours() - 1);
                $('.actual-time-span-car').text(getFormatedTime(date));
                $('.arrival-time-span-car').text(getFormatedTime(getDateEnd(response[i].data.duration)));
                $('#car-range').text(response[i].data.distance);
                $('#car-time').text(getFormatedTime(duration));
            }
            else if (response[i].type === "weatherTo")
            {
                weatherShow(response[i].data.weather, "To");
            }
            else if (response[i].type === "weatherFrom")
            {
                weatherShow(response[i].data.weather, "From");
            }
            else if(response[i].type ==="transport.velov.nearFrom") {
               // console.log(response[i].data[0].arret.localisation.lat);
                for (var y in response[i].data[0].arret.localisation){
                    latVelovFrom[y] =  response[i].data[0].arret.localisation.lat;
                    lngVelovFrom[y]=  response[i].data[0].arret.localisation.lng;

                }
                adressStation.from = response[i].data[0].arret.address;
                nameStation.from = response[i].data[0].arret.name;
                placeDispo.from = response[i].data[0].arret.available_stand;
                placeTotal.from = response[i].data[0].arret.bike_stands;
                distanceVelov.from = response[i].data[0].distance;
                statusVelov.from = response[i].data[0].arret.status;

            } else if(response[i].type ==="transport.velov.nearTo") {
                console.log(response[i].data[0].arret.localisation.lat);
                for (var y in response[i].data[0].arret.localisation){
                    latVelovTo[y] =  response[i].data[0].arret.localisation.lat;
                    lngVelovTo[y]=  response[i].data[0].arret.localisation.lng;
                }
                adressStation.to = response[i].data[0].arret.address;
                nameStation.to = response[i].data[0].arret.name;
                placeDispo.to = response[i].data[0].arret.available_stand;
                placeTotal.to = response[i].data[0].arret.bike_stands;
                distanceVelov.to = response[i].data[0].distance;
                console.log(response[i].data[0].distance);
                statusVelov.to = response[i].data[0].arret.status;

            }

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
    // displayFromResponse(data.data);
    // displayTransport(data);
    // GetJsonPosition('grenoble','lyon','WALKING');
    //recupLocation(data.data);
    $('.result_type').text(data.data[0].type);
});


function getFormatedTime(date)
{
    var dateArriveStr ;
    if(date.getHours() < 10)
    {
        dateArriveStr = '0' + date.getHours();
    }
    else
    {
        dateArriveStr = date.getHours();
    }
    dateArriveStr += ":";
    if(date.getMinutes() < 10)
    {
        dateArriveStr += '0' + date.getMinutes();
    }
    else
    {
        dateArriveStr += date.getMinutes();

    }
    return dateArriveStr;

}

function getDateEnd(dateEndData)
{

    var dateEnd = new Date();
    dateEnd.setSeconds(dateEndData);
    return dateEnd;
}

function weatherShow(weather, where)
{
    var temps = [];
    temps[0] = "orage";
    temps[1] = "pluie";
    temps[2] = "soleil";
    temps[3] = "nuage";
    temps[4] = "neige";
    temps[5] = "venteux";

    for(var i in temps)
    {
        if(weather === temps[i])
        {
            $("#"+temps[i]+where).show();
        }
        else
        {
            $("#"+temps[i]+where).hide();
        }
    }

}