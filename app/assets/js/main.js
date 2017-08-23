$(document).ready(function () {

    /** INPUT PART**/
    //send input
    function resultPage() {
        if    ($( "#search-input-from" ).val() !== '' && $( "#search-input-to" ).val() !== ''){
            showResultsPage();
        }
    }

    var timer = null;
    $("#search-input-to").on("keyup", function () {
        console.log(timer);
        if (timer) {
            clearTimeout(timer); //cancel the previous timer.
        }
        timer = setTimeout(resultPage, 3000);
        return timer;
    });


    // Clear input From if clicked
    function clearInputFrom() {
        $( "#search-input-from" ).val('');
        $('#interim_span').val();

    }
    function clearInputTo() {
        $( "#search-input-to" ).val('');
        $('#interim_span').val();
    }
    $( "#search-input-from" ).on( "click", clearInputFrom );
    $( "#search-input-to" ).on( "click", clearInputTo );


    /** MENU PART **/
    $("#menu_connexion").click(function () {
        $(".input-container").hide();
        $(".connexion-container").show();
    });

    $("#menu_accueil").click(function () {
        $(".connexion-container").hide();
        $(".meteo-container").hide();
        $(".input-container").show();
    });


    //title Animation

    $('.tlt').textillate({

        loop: false,

        autoStart: true,

        in: {
            effect: "flipInX",
            delayScale: 3,
            delay: 50,
            sync: false,
            sequence: true,
            reverse: false
        },
        type: 'char'
    });

    /** VOICE ACTIVATION INIT **/
    //Swap voice input

    //Change to get select of autocompelete gl hf
    window.setInterval(function () {
        var voiceSpan = '#interim_span';
        if ($(voiceSpan).text().length > 0) {
            $(voiceSpan).hide();
            /** target input2 if 1 is not empty **/
            if ($('#search-input-from').val() !== '' && !$("#search-input-from").is(":focus")) {
                $('.notice-textToSpeech').fadeIn();
                $('#search-input-to').val($(voiceSpan).text());
            }else{
                $('#search-input-from').val($(voiceSpan).text());
                $('.notice-textToSpeech').fadeIn();
            }
        }else{
            $('.notice-textToSpeech').fadeOut();

        }

    }, 5000);

    /** RESULT PAGE PART**/
    function showResultsPage() {
        $(".input-container").fadeOut();
        $(".result-container").fadeIn();
        initMap();
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    }


});


