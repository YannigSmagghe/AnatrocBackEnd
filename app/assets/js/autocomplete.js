var placeSearch, autocomplete;

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    var inputAutocomplete = 'search-input-to';

    if ($("#search-input-from").is(":focus")){
        inputAutocomplete = 'search-input-from';
    }
    console.log(inputAutocomplete);

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
    if    ($( "#search-input-from" ).val() !== '' && $( "#search-input-to" ).val() !== ''){
        console.log('ma page resutlat');
        showResultsPage();
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