$( document ).ready(function() {

    //send input
    function resultPage() {
        $(".input-container").fadeOut();
        $(".result-container").fadeIn();
        getLocation();
        google.maps.event.trigger(map, 'resize');
    }
    var timer = null;
    $("#search-input").on("keyup", function() {
        console.log(timer);
        if (timer) {
            clearTimeout(timer); //cancel the previous timer.
        }
        timer = setTimeout(resultPage, 3000);
        return timer;
    });
    



    $("#menu_connexion").click(function() {
        $(".input-container").hide();
        $(".connexion-container").show();
    });

    $("#menu_accueil").click(function() {
        $(".connexion-container").hide();
        $(".meteo-container").hide();
        $(".input-container").show();
    });


    //title Animation

    $('.tlt').textillate( {

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


    //Swap voice inpu
    window.setInterval(function(){
        var voiceSpan = '#interim_span';
        if ($(voiceSpan).text().length > 0){
            $('#search-input').hide();
        }

    }, 1000);

    //Swap to result page
    window.setInterval(function(){
        var voiceSpan = '#final_span';
        if ($(voiceSpan).text().length > 0){
            resultPage();
        }

    }, 100);


});