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