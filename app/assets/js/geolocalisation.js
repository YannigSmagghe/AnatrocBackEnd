/** Constantes **/
/** From **/
var latFrom = 0;
var lngFrom = 0;
/** To **/
var latTo = 0;
var lngTo = 0;
/** get Json position to dont refresh **/
var didOnlyOnce = 0;


latVelovFrom = [];
lngVelovFrom =[];
latVelovTo=[];
lngVelovTo=[];

adressStation ={};
nameStation ={};
placeDispo = {};
placeTotal = {};
velovDispo = {};
distanceVelov = {};
statusVelov ={};
var colorStatusVelov;

var featuresTo =[];
var featuresFrom =[];


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


/**Function Appel inimap et autocomplete**/

function initialize() {
    initMap();
    initAutocomplete();
}


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
        console.log('revoir els données lat lng');
        var myLatLng = {lat: 45.764043, lng: 4.835659};
        map = new google.maps.Map(document.getElementById('map-container'), {
            zoom: 16,
            center: myLatLng
        });

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('itinerary-board'));
        var onChangeHandler = function(origin,destination,travelMode) {
            calculateAndDisplayRoute(directionsService, directionsDisplay,origin,destination,travelMode);
        };
        // document.getElementById('start').addEventListener('change', onChangeHandler);
        // document.getElementById('end').addEventListener('change', onChangeHandler);
        onChangeHandler(origin,destination,travelMode);


        var icons = {
            volov: {
                icon: 'https://velov.grandlyon.com/typo3conf/ext/gl_stationsvelov/Resources/Public/Icons/Map/station-0.png',

            }
        };

        for (var i in latVelovFrom) {
                 featuresFrom[i] = [
                    {
                        position: new google.maps.LatLng(latVelovFrom[i], lngVelovFrom[i]),
                        type: 'volov'
                    }
                ];
        }
        for(var i in latVelovTo){
            featuresTo[i] = [
                {
                    position: new google.maps.LatLng(latVelovTo[i], lngVelovTo[i]),
                    type: 'volov'
                }
            ];
        }

        // Create markers.
        for (var i in featuresTo) {
            featuresTo[i].forEach(function (feature) {
                var marker = new google.maps.Marker({
                    position: feature.position,
                    icon: icons[feature.type].icon,
                    map: map,
                    size:new google.maps.Size(1, 1)

                });
                velovDispo.to=placeTotal.to-placeDispo.to;
                if(statusVelov.to == "OPEN"){
                    colorStatusVelov ='green';
                }else {
                    colorStatusVelov ='red';
                }
                var contentString = '<div id="InfoVelov">'+
                        '<div id="statusVelov" style="background-color: '+colorStatusVelov+'; height: 10px"></div>'+
                        '<h1 id="nameVelov">'+nameStation.to+'</h1>'+
                        '<div id="adressVelov"> '+adressStation.to+'</div>'+

                        '<div id="bodyContent">'+
                    '<span><b>Distance par rapport à votre point de d\'arrivé :</b>'+distanceVelov.to+'Km</span><br>'+
                            '<b>Velo Disponible: </b> '+velovDispo.to+'<br> ' +
                            '<b>place Disponible:</b>'+placeDispo.to+
                        '</div>'+
                    '</div>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });
            });
        }

        for (var i in featuresFrom) {
            featuresFrom[i].forEach(function (feature) {
                var marker = new google.maps.Marker({
                    position: feature.position,
                    icon: icons[feature.type].icon,
                    map: map,
                    size:new google.maps.Size(1, 1)

                });
                velovDispo.from=placeTotal.from-placeDispo.from;
                if(statusVelov.from == "OPEN"){
                    colorStatusVelov ='green';
                }else {
                    colorStatusVelov ='red';
                }
                var contentString = '<div id="InfoVelov">'+
                        '<div id="statusVelov" style="background-color: '+colorStatusVelov+'; height: 10px"></div>'+
                        '<h1 id="nameVelov">'+nameStation.from+'</h1>'+
                        '<div id="adressVelov"> '+adressStation.from+'</div>'+

                        '<div id="bodyContent">'+
                            '<span><b>Distance par rapport à votre point de départ :</b>'+distanceVelov.from+'km</span><br>'+
                            '<b>Velo Disponible: </b> '+velovDispo.from+'<br> ' +
                            '<b>place Disponible:</b>'+placeDispo.from+
                            '</div>'+
                    '</div>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });
            });
        }
        /* style map*/
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
