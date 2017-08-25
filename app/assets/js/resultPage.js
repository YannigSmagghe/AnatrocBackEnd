/** RESULT PAGE PART**/
function showResultsPage() {
    console.log('dans mshow result page');
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
        console.log( 'walk click');
        hideChoice()

    });
    $( "#bike" ).on( "click", function() {
        console.log( 'bike click');
        hideChoice()
    });
    $( "#car" ).on( "click", function() {
        console.log( 'car click');
        hideChoice()
    });

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

