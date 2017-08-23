/** Constantes **/
/** From **/
var latFrom = 0;
var lngFrom = 0;
/** To **/
var latTo = 0;
var lngTo = 0;
/** get Json position to dont refresh **/
var didOnlyOnce = 0;

/** init **/
$.getJSON('https://ipinfo.io/geo', function(response) {
    var loc = response.loc.split(',');
    var coords = {
        latFrom2: loc[0],
        lngFrom2: loc[1]
    };
    latFrom = loc[0];
    lngFrom = loc[1];
    /** input from **/
    setSearchInputFrom(latFrom,lngFrom);
});


/** WPID watching position **/
var geo_options = {
    enableHighAccuracy: true,
    maximumAge        : 30000,
    timeout           : 27000
};

var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);


/** Function **/

function setSearchInputFrom(latFrom,lngFrom) {


    $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latFrom+','+lngFrom+'&key=AIzaSyBkq58QUf_6ZOm4MRr29H2-ZUQcLBHQ75I', function(response) {
        var loc = response.results[0].formatted_address;

        if (loc && didOnlyOnce === 0){
            didOnlyOnce = 1;
            $('#search-input-from').val(loc).fadeIn();

        }
    });
}


function geo_success(position) {

    if (position.coords.latitude && position.coords.longitude){
        latFrom = position.coords.latitude;
        lngFrom = position.coords.longitude;
    }
    /** input from **/
    setSearchInputFrom(position.coords.latitude, position.coords.longitude);
}

function geo_error() {
    console.log("Sorry, no position available.");
}


function initMap() {
    var map;

    window.initMap = function () {
        var myLatLng = {lat: lat, lng: lng};
        map = new google.maps.Map(document.getElementById('map-container'), {
            zoom: 10,
            center: myLatLng
        });

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Vous etes ici!'
        });
        var onChangeHandler = function(origin,destination,travelMode) {
            calculateAndDisplayRoute(directionsService, directionsDisplay,origin,destination,travelMode);
        };
        // document.getElementById('start').addEventListener('change', onChangeHandler);
        // document.getElementById('end').addEventListener('change', onChangeHandler);
        onChangeHandler(origin,destination,travelMode);

        var styles = [
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#a7a7a7"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#737373"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#efefef"
                    },
                    {
                        "lightness": "20"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "off"
                    },
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#696969"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#b3b3b3"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#d6d6d6"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "weight": 1.8
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#d7d7d7"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#808080"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#bfcdd5"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "saturation": "-47"
                    }
                ]
            }
        ]

        map.setOptions({styles: styles});

    }


}

/*Calcul l'itineraire de l'origine à la destination avec le moyen de transport*/
function calculateAndDisplayRoute(directionsService, directionsDisplay,origin, destination,travelMode) {
    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: travelMode
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function getLocation() {
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        alert('Votre navigateur ne supporte pas la geolocalisation')
    }
}

function showPosition(position) {
    /*   x.innerHTML = "Latitude: " + position.coords.latitude +
     "<br>Longitude: " + position.coords.longitude;*/
    console.log(position.coords.longitude + 'longitude');
    console.log(position.coords.latitude + 'latitude');
}
