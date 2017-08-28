/** RESULT PAGE PART**/
function showResultsPage(data) {
    ResultResponse(data.data);
    showHideTitle();
    $(".input-container").fadeOut();
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

    $( "#walk" ).on( "click", function() {
        hideChoice();
        displayMap('WALKING');


  ;

    });
    $( "#bike" ).on( "click", function() {
        hideChoice();
        displayMap('BICYCLING');
    });
    $( "#car" ).on( "click", function() {
        hideChoice();
        displayMap('DRIVING');
    });

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

