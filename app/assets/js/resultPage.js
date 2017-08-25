/** RESULT PAGE PART**/
function showResultsPage() {
    showHideTitle();
    $(".input-container").fadeOut();
    $(".travel-container").fadeIn();



    /** Go to selected result **/

    $( "#walk" ).on( "click", function() {
        console.log( 'walk click');
        hideChoice();
        displayMap('WALKING')


  ;

    });
    $( "#bike" ).on( "click", function() {
        console.log( 'bike click');
        hideChoice();
        displayMap('BICYCLING');
    });
    $( "#car" ).on( "click", function() {
        console.log( 'car click');
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

