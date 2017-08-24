/** RESULT PAGE PART**/
function showResultsPage() {
    showHideTitle();
    $(".input-container").fadeOut();
    $(".travel-container").fadeIn();


    var addressFrom = $('#search-input-from').val();
    var  addressTo = $('#search-input-to').val();
    GetPosition(addressFrom,addressTo,'WALKING');
    traitementAjax();
    initMap();
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
}


// show/hide title
function showHideTitle(){
    if ($('#main-title').is(":visible")){
        $('#main-title').hide();
    }else{
        $('#main-title').show();
    }
}