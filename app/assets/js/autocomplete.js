var placeSearch, autocomplete;

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    var inputAutocompleteTo = 'search-input-to';
    var  inputAutocompleteFrom = 'search-input-from';

    if(document.getElementById(inputAutocompleteTo)){
        loadAutocomplete(inputAutocompleteTo);

    }
    if(document.getElementById(inputAutocompleteFrom)){
        loadAutocomplete(inputAutocompleteFrom);

    }

}


function loadAutocomplete(inputAutocomplete){
    if(document.getElementById(inputAutocomplete)){
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById(inputAutocomplete)),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.

        autocomplete.addListener('place_changed', showResults);
    }
}
function showResults() {
    // Get the place details from the autocomplete object.

    var addressFrom = $('#search-input-from').val();
    var  addressTo = $('#search-input-to').val();

    if    (addressFrom !== '' && addressTo !== ''){
        $('#loader').fadeIn();
        showHideTitle();
        $(".input-container").fadeOut();
        $.ajax({
            url : 'https://api.anatroc/app_dev.php/',
            type : 'POST',
            data : 'addressFrom='+addressFrom + '&addressTo='+addressTo,
            dataType : 'JSON',
            success : function(data){
                console.log(data + 'succes');

                showResultsPage(data);
            },
            error : function(data){
                $('#loader').fadeOut();
                $('.error-container').fadeIn();
            },
        });
        //showResultsPage();
    }
}
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
        initAutocomplete();
    }
}


// show/hide title
function showHideTitle(){
    if ($('#main-title').is(":visible")){
        $('#main-title').hide();
    }else{
        $('#main-title').show();
    }
}