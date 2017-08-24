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


$.getJSON( "myaccount.json", function( data ) {
    $.each(data.data, function(key, item) {
      if (item.home){
          $('.btn-account').append("<button type='button' title='"+item.home["start_address_name"]+"'  class='btn btn-primary address-btn' data-address='"+item.home["start_address_name"]+"'> <i class='fa fa-home' aria-hidden='true'></i></button>")
      }
        if (item.job){
            $('.btn-account').append("<button type='button' title='"+item.job["start_address_name"]+"'  class='btn btn-primary address-btn' data-address='"+item.job["start_address_name"]+"'> <i class='fa fa-briefcase' aria-hidden='true'></i></button>")
        }
        $.each(item.favorite, function(keyAddress, addressName) {
            $('.btn-account').append("<button type='button' title='"+addressName+"'  class='btn btn-primary btn-favorite address-btn' data-address='"+addressName+"'> <i class='fa fa-star' aria-hidden='true'></i></button>")

        })​
    })​
});

/** Add address when u click on button**/
$(document).on('click', '.address-btn', function() {

    if ($('#search-input-from').val() !== ''){
        $('#search-input-to').val(($(this).data('address')));
        showResultsPage();
    }

});