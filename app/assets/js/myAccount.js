$(document).ready(function () {

    $('#button-connect').on("click", function () {
        showMyAccount();
    });
});

function showMyAccount() {
    $(".connexion-container").fadeOut();
    $("#main-title").fadeOut();
    $(".myAccount-container").fadeIn("slow");
}


$.getJSON("myaccount.json", function (data) {
    var count=0;
    $.each(data.data, function (key, item) {
        if (item.home) {
            $('.btn-home').append("<div class='col-lg-2 col-md-2 col-sm-2'><button type='button' title='" + item.home["start_address_name"] + "'  class='col-lg-3 col-md-3 col-sm-3 btn btn-primary address-btn' data-address='" + item.home["start_address_name"] + "'> <i class='fa fa-home' aria-hidden='true'></i></button></div><div class='col-lg-9 col-md-9 col-sm-6  col-sm-offset-3 col-md-offset-0 col-lg-offset-0'>my home</div>")
        }
        if (item.job) {
            $('.btn-job').append("<div class='col-lg-2 col-md-2 col-sm-2'><button type='button' title='" + item.job["start_address_name"] + "'  class='col-lg-3 col-md-3 col-sm-3 btn btn-primary address-btn' data-address='" + item.job["start_address_name"] + "'> <i class='fa fa-briefcase' aria-hidden='true'></i></button> </div><div class='col-lg-9 col-md-9 col-sm-6  col-sm-offset-3 col-md-offset-0 col-lg-offset-0'> my job</div>")
        }

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var xhr = new XMLHttpRequest();

    xhr.open('POST', App.baseUri+'/login');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        var json = JSON.parse(xhr.responseText);

        createCookieAuthToken(json.data.token);
    };
    xhr.send('token=' + id_token+'&email='+googleUser.getBasicProfile().getEmail());
}

const AUTH_COOKIE_NAME = 'anatroc.auth.token';
const USER_INFO_KEY = 'user.info';

function createCookieAuthToken(token) {
    var d = new Date();

    d.setTime(d.getTime() + (14*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = AUTH_COOKIE_NAME + "=" + token + ";" + expires + ";path=/";
}

function getCookieAuthToken() {
    var name = AUTH_COOKIE_NAME + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/** Add address when u click on button**/
$(document).on('click', '.address-btn', function () {
    if ($('#search-input-from').val() !== '') {
        $('#search-input-to').val(($(this).data('address')));
        showResultsPage();
    }

});