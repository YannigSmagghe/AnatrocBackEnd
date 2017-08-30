/** Connexion **/

function verifyToken(){
    $.get(App.baseUri+'/token/verify?token='+getUserToken())
        .done(function (response) {
            if (response.data === true){
                $('#menu_login').text('Espace membre');
                getUserInfos();

            }
            $("#menu_login").click(function () {
                showMyAccount();
            });
        });
}

function addFavorite(){
    var address = $('#account-addFavorite-address').val();
    var description = $('#account-addFavorite-desc').val();

    if (address !== '' && description !== ''){
        $.ajax({
            url : App.baseUri+'/user/favorite',
            type : 'POST',
            data : 'address='+address + '&description='+ description + '&token='+getUserToken(),
            dataType : 'JSON',
            success : function(data){
                console.log(data + 'succes');

                showResultsPage(data);
            },
            error : function(data){
                console.log(data + 'erreur');
                $('.error-container').fadeIn();
            },
        });
    }
}

function showMyAccount() {
    $(".connexion-container").fadeOut();
    $("#main-title").fadeOut();
    $(".myAccount-container").fadeIn("slow");
    $("#login").fadeIn();
}

var xhrFavorites = null;
function fetchUserFavorites(callback) {
    if (typeof xhrFavorites === XMLHttpRequest) {
        xhrFavorites.abort();
    }

    xhrFavorites = new XMLHttpRequest();
    xhrFavorites.open('GET', App.baseUri+'/user/favorites?token='+getUserToken());
    xhrFavorites.onload = function() {
        var json = JSON.parse(xhrFavorites.responseText);

        callback(json);
    };
    xhrFavorites.send();
}
var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}

function createFavoriteElement(address, description) {
    address = escapeHtml(address);
    description = escapeHtml(description);

     return "<div class='col-lg-2 col-md-2 col-sm-2'>" +
         "<button type='button' title='" + address + "' class='col-lg-3 col-md-3 col-sm-3 btn btn-primary address-btn' data-address='" + address + "'> " +
         "<i class='fa fa-star' aria-hidden='true'></i>" +
         "</button>" +
         "</div>" +
         "<div class='col-lg-9 col-md-9 col-sm-6  col-sm-offset-3 col-md-offset-0 col-lg-offset-0'>" + description +"</div>";
}

function createFavoriteElements(data) {
    var elements = '';
    for (var i in data) {
        elements += createFavoriteElement(data[i].address, data[i].description);
    }

    return elements;
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

function getUserToken() {
    return 'test';
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

function getUserInfos() {
    $.get(App.baseUri+'/user/info?token='+getUserToken())
        .done(function (response) {
            var email = response.data.email;
            var n = email.indexOf('@');
            var name = email.substring(0, n != -1 ? n : email.length);

            $('.login-container').fadeIn();

            $('#nameAccount').text(name);
        });
}


function responseApiHasError(response) {
    return typeof response.hasOwnProperty('errors') && response.errors.length > 0;
}

$(function () {

    verifyToken();
    // fetchUserFavorites(function (response) {
    //     if (!responseApiHasError(response)) {
    //         $("#favorites").append(createFavoriteElements(response.data));
    //     }
    // });
    //
    // $("#favorites").on('click', 'button', function () {
    //     var favorite = $(this).data('address');
    //     var fromInput = $("#search-input-from");
    //
    //     if (($.trim(fromInput.val())).length === 0) {
    //         fromInput.val(favorite);
    //         return;
    //     }
    //
    //     var toInput = $("#search-input-to");
    //
    //     if (($.trim(toInput.val())).length === 0) {
    //         toInput.val(favorite);
    //         return;
    //     }
    // });

    $('#button-connect').on("click", function () {
        showMyAccount();
    });

    $(document).on('click', '.address-btn', function () {
        if ($('#search-input-from').val() !== '') {
            $('#search-input-to').val(($(this).data('address')));
            showResultsPage();
        }
    });
});