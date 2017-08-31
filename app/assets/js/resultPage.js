/** RESULT PAGE PART**/
function showResultsPage(data) {
    ResultResponse(data.data);
    $('#loader').fadeOut();
    $(".travel-container").fadeIn();


    // var addressFrom = $('#search-input-from').val();
    // var  addressTo = $('#search-input-to').val();
    // GetPosition(addressFrom,addressTo,'WALKING');
    // traitementAjax();
    // initMap();
    // var center = map.getCenter();
    // google.maps.event.trigger(map, "resize");
    // map.setCenter(center);

    /** Go to selected result **/
    responsiveVoice.speak('Choisissez votre mode de transport entre la marche à pied, le vélo et la voiture', "French Female");
    if(dataVoice.weather.from=="soleil"){
        responsiveVoice.speak('le temps est ensoleillé, nous vous conseillons de vous rendre à votre destination à pieds', "French Female");
    }else if(dataVoice.weather.from=='nuage'){
        responsiveVoice.speak('le temps est nuageux, nous vous conseillons d\'utiliser le velo pour vous rendre à votre destination', "French Female");
    }else if(dataVoice.weather.from=='pluie'){
        responsiveVoice.speak('le temps est pluvieux, nous vous conseillons d\'utiliser la voiture pour vous rendre à votre destination', "French Female");
    }


    $( "#walk" ).on( "click", function() {
        hideChoice();
        displayMap('WALKING');
        voiceResult('WALKING');
    });
    $( "#bike" ).on( "click", function() {
        hideChoice();
        displayMap('BICYCLING');
        voiceResult('BICYCLING');

    });
    $( "#car" ).on( "click", function() {
        hideChoice();
        displayMap('DRIVING');
        voiceResult('DRIVING');
    });

}

function voiceResult(travelMode){

    var addressFrom = $('#search-input-from').val();
    var  addressTo = $('#search-input-to').val();
    var durationBycyclingEnd = $('.arrival-time-span-bike').text();
    var durationWalkingEnd = $('.arrival-time-span-walk').text();
    var durationDrinvingEnd = $('.arrival-time-span-car').text();
    if(travelMode == 'WALKING')
    {   // var timeTravel = $('.adp-summary span:nth-child(3)').attr('jstcache','50').text();
        var duration = dataVoice.transport.duration.walking;
        responsiveVoice.speak('Vous avez choisis la marche à pied pour atteindre '+addressTo+', cela vous prendra environ'+duration, "French Female");
        responsiveVoice.speak('Vous arriverez à'+durationWalkingEnd+'minutes à '+addressTo, "French Female");
    }
    if(travelMode == 'DRIVING')
    {
        var duration = dataVoice.transport.duration.driving;
        responsiveVoice.speak('Vous avez choisis la voiture à pied pour atteindre '+addressTo+', cela vous prendra environ'+duration, "French Female");
        responsiveVoice.speak('Vous arriverez à'+durationDrinvingEnd+'minutes à '+addressTo, "French Female");
    }
    if(travelMode == 'BICYCLING')
    {
        var duration = dataVoice.transport.duration.bicycling;
        responsiveVoice.speak('Vous avez choisis le velo pour atteindre '+addressTo+', cela vous prendra environ'+duration, "French Female");
        responsiveVoice.speak('Vous avez une station velov qui ce situe à'+distanceVelov.from+'Kilométre de votre position de départ', "French Female");
        responsiveVoice.speak('Vous arriverez à'+durationBycyclingEnd+'minutes à'+addressTo, "French Female");
    }
}

function displayMap(travelMode){
    var addressFrom = $('#search-input-from').val();
    var  addressTo = $('#search-input-to').val();
    GetPosition(addressFrom,addressTo,travelMode);
    initMap();
}



// hide other choice
function hideChoice(){
    $('.travel-container').fadeOut();
    $('.result-container').fadeIn();
}


// show/hide title
function showHideTitle(){
    if ($('#main-title').is(":visible")){
        $('#main-title').hide();
    }else{
        $('#main-title').show();
    }
}

