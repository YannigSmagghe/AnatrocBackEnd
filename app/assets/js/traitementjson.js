//Traitement Json

dataVoice = {};
dataVoice.weather = {};
dataVoice.transport = {};
dataVoice.transport.duration = {};


function traitementAjax(){
    var addressFrom = $('#search-input-from').val();
    var  addressTo = $('#search-input-to').val();


    $.ajax({
        url : App.baseUri,
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
    var date = new Date();
    var duration;


    for (var i in response) {
        if (response[i].hasOwnProperty('type')) {
            if (response[i].type === "transport.google_direction.walking") {

                duration = new Date(response[i].data.duration * 1000);
                durationFormated = getFormatedTime(duration, 1);
                $('.actual-time-span-walk').text(getFormatedTime(date,0));
                $('.arrival-time-span-walk').text(getFormatedTime(getDateEnd(response[i].data.duration),0));
                $('#walk-range').text(response[i].data.distance);
                $('#cityTo').text(response[i].data.end_address_name);
                $('#cityFrom').text(response[i].data.start_address_name);
                $('#walk-time').text(durationFormated);
                dataVoice.transport.duration.walking = durationFormated;
            }
            else if (response[i].type === "transport.google_direction.bicycling") {


                duration = new Date(response[i].data.duration * 1000);
                durationFormated = getFormatedTime(duration, 1);
                $('.actual-time-span-bike').text(getFormatedTime(date, 0));
                $('.arrival-time-span-bike').text(getFormatedTime(getDateEnd(response[i].data.duration), 0));
                $('#bike-range').text(response[i].data.distance);
                $('#bike-time').text(durationFormated);
                dataVoice.transport.duration.bicycling = durationFormated;
            }
            else if (response[i].type === "transport.google_direction.driving") {

                duration = new Date(response[i].data.duration * 1000);
                durationFormated = getFormatedTime(duration, 1);
                $('.actual-time-span-car').text(getFormatedTime(date,0));
                $('.arrival-time-span-car').text(getFormatedTime(getDateEnd(response[i].data.duration),0));
                $('#car-range').text(response[i].data.distance);
                $('#car-time').text(durationFormated);
                dataVoice.transport.duration.driving = durationFormated;
            }
            else if (response[i].type === "weatherTo")
            {
                dataVoice.weather.to = response[i].data.weather;
                weatherShow(response[i].data.weather, "To");
            }
            else if (response[i].type === "weatherFrom")
            {
                dataVoice.weather.from = response[i].data.weather;
                weatherShow(response[i].data.weather, "From");
            }
            else if(response[i].type ==="transport.velov.nearFrom") {
               // console.log(response[i].data.arret.localisation.lat);
                for (var y in response[i].data.arret.localisation){
                    latVelovFrom[y] =  response[i].data.arret.localisation.lat;
                    lngVelovFrom[y]=  response[i].data.arret.localisation.lng;

                }
                adressStation.from = response[i].data.arret.address;
                nameStation.from = response[i].data.arret.name;
                placeDispo.from = response[i].data.arret.available_stand;
                placeTotal.from = response[i].data.arret.bike_stands;
                distanceVelov.from = setLocalString(response[i].data.distance);
                statusVelov.from = response[i].data.arret.status;

            } else if(response[i].type ==="transport.velov.nearTo") {
                for (var y in response[i].data.arret.localisation){
                    latVelovTo[y] =  response[i].data.arret.localisation.lat;
                    lngVelovTo[y]=  response[i].data.arret.localisation.lng;
                }
                adressStation.to = response[i].data.arret.address;
                nameStation.to = response[i].data.arret.name;
                placeDispo.to = response[i].data.arret.available_stand;
                placeTotal.to = response[i].data.arret.bike_stands;
                distanceVelov.to = response[i].data.distance;
                statusVelov.to = response[i].data.arret.status;

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


function getFormatedTime(date, duree)
{

    var dateArriveStr = "";
    var timestampOrigin = new Date(0);

    if(duree === 1)
    {

        date.setHours(date.getHours() - timestampOrigin.getHours());
    }


    if(dateDiffInDays(date,timestampOrigin) > 0 && duree === 1)
    {

        dateArriveStr += dateDiffInDays(date,timestampOrigin) + " jour";
        if(dateDiffInDays(date,timestampOrigin) > 1)
        {
            dateArriveStr += "s";
        }
        dateArriveStr += " ";
    }
    if(date.getHours() > 0 )
    {
        if(date.getHours() < 10 && duree === 0)
        {
            dateArriveStr += '0' + date.getHours();
        }
        else
        {
            dateArriveStr += date.getHours();
        }

        if(duree === 0)
        {
            dateArriveStr += ":";
        }
        else
        {
            dateArriveStr += " heure";
            if(date.getHours()>1)
            {
                dateArriveStr += "s";
            }
            dateArriveStr += " ";
        }
    }

    if(date.getMinutes() < 10)
    {
        dateArriveStr += '0' + date.getMinutes();
    }
    else
    {
        dateArriveStr += date.getMinutes();

    }

    if(duree === 1)
    {
        dateArriveStr += " minute";
        if(date.getMinutes() > 1)
        {
            dateArriveStr += "s";
        }
    }
    return dateArriveStr;

}

function getDateEnd(dateEndData)
{

    var dateEnd = new Date();
    dateEnd.setSeconds(dateEndData);
    return dateEnd;
}


function setLocalString(n)
{
    value = n.toLocaleString(
        "fr-FR", // use a string like 'en-US' to override browser locale
        { minimumFractionDigits: 1 }
    );
    return value;
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

    var choice = {};
    choice.soleil = "walk";
    choice.nuage = "bike";
    choice.pluie = "car";
    choice.orage = "car";
    choice.neige = "car";
    choice.venteux = "car";


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
    if(where === "From")
    {
        var set = "";
        for( var weatherProto in choice)
        {
            if(weatherProto == weather)
            {
                $('#'+choice[weatherProto]).addClass("mainChoose");
                set = choice[weatherProto];
            }
            else if(set !== choice[weatherProto])
            {
                $('#'+choice[weatherProto]).removeClass("mainChoose");
            }
        }
    }



}

function dateDiffInDays(a, b) {
    var _MS_PER_DAY = 1000 * 60 * 60 * 24;

    return Math.floor((a - b) / _MS_PER_DAY);
}