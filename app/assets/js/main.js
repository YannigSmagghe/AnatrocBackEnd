$(document).ready(function () {

    /** INPUT PART**/

    // Clear input From if clicked
    function clearInputFrom() {
        $( "#search-input-from" ).val('');
      //  $('#interim_span').val();
        $('#interim_span').text('');
        $('#final_span').text('');

    }
    function clearInputTo() {
        $( "#search-input-to" ).val('');
       // $('#interim_span').val();
        $('#interim_span').text('');
        $('#final_span').text('');
    }
    $( "#search-input-from" ).on( "click", clearInputFrom );
    $( "#search-input-to" ).on( "click", clearInputTo );


    /** MENU PART **/
    var arrayContainer = ['travel-container','input-container','connexion-container','myAccount-container','result-container','error-container'];
    $("#menu_login").click(function () {
        showHideTitle();
        $.each(arrayContainer, function( index, value ) {

            if (value !== 'connexion-container'){
                $('.'+value).fadeOut();
            }else{
                $('.connexion-container').fadeIn();
            }
        });
    });

    $( "#menu_accueil, #button-back" ).click(function() {
        showHideTitle();
        $.each(arrayContainer, function( index, value ) {
            if (value !== 'input-container'){
                $('.'+value).fadeOut();
            }else{
                $('.input-container').fadeIn();
            }
        });
    });



    // show/hide title
    function showHideTitle(){
        if ($('#main-title').is(":visible") && !$('.input-container').is(':visible')){
            $('#main-title').fadeOut();
        }else{
            $('#main-title').fadeIn();
        }
    }
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
        $(voiceSpan).text('');
        $('#final_span').text('');

        if ($('#loader').is(":visible")){
            $('.menu-container').fadeOut();
        }else{
            $('.menu-container').fadeIn();
        }
    }, 100);

    //Swap to result page
    // window.setInterval(function () {
    //     var voiceSpan = '#interim_span';
    //     if ($(voiceSpan).text().length > 0) {
    //         $(voiceSpan).hide();
    //         /** target input2 if 1 is not empty **/
    //         if ($('#search-input-from').val() !== '' && !$("#search-input-from").is(":focus")) {
    //             $('.notice-textToSpeech').fadeIn();
    //             $('#search-input-to').val($(voiceSpan).text());
    //         }else{
    //             $('#search-input-from').val($(voiceSpan).text());
    //             $('.notice-textToSpeech').fadeIn();
    //         }
    //     }else{
    //         $('.notice-textToSpeech').fadeOut();
    //
    //     }
    //
    // }, 3000);

    /** RESULT PAGE PART**/
    // voir resultPage.js
    // function showResultsPage() {
    //     showHideTitle();
    //     var addressFrom = $('#search-input-from').val();
    //     var  addressTo = $('#search-input-to').val();
    //     GetPosition(addressFrom,addressTo,'WALKING');
    //     traitementAjax();
    //     $(".input-container").fadeOut();
    //     $(".result-container").fadeIn();
    //     initMap();
    //     var center = map.getCenter();
    //     google.maps.event.trigger(map, "resize");
    //     map.setCenter(center);
    // }

    /** Afficher le chemin **/

});

function getGoogleAuth() {
    $('.abcRioButtonContentWrapper').trigger('click');
}