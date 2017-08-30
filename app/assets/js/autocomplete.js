var placeSearch, autocomplete;

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    var inputAutocompleteTo = 'search-input-to';
    var  inputAutocompleteFrom = 'search-input-from';
    var account_addFavorite_address ='account-addFavorite-address'

    if(document.getElementById(inputAutocompleteTo)){
        loadAutocomplete(inputAutocompleteTo);
    }
    if(document.getElementById(inputAutocompleteFrom)){
        loadAutocomplete(inputAutocompleteFrom);
    }
    if(document.getElementById(account_addFavorite_address))
    {
        loadAutocomplete(account_addFavorite_address);
    }

}


function loadAutocomplete(inputAutocomplete){
    if(document.getElementById(inputAutocomplete)){
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById(inputAutocomplete)),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        if(inputAutocomplete !== "account-addFavorite-address"){
            autocomplete.addListener('place_changed', showResults);
        }

    }
}



function showResults() {
    // Get the place details from the autocomplete object.

    var place = autocomplete.getPlace();

    if (!place) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.

        //window.alert("No details available for input: '" + place.name + "'");

        //$("#"+inputAutocomplete).innerHTML('<span>Aucun résultat</span>');

        //console.log("No details available for input");
        //return;

        noResultsAutocomplete();
    } else {
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

function noResultsAutocomplete() {
    $('#no-result').css('display', 'block');
    window.setInterval(function () {
        $('#no-result').css('display', 'none');
    }, 3000);

}