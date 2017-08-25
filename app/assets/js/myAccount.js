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

        $.each(item.favorite, function (keyAddress, addressName) {
            var item = 'favorite-btn'+count;
            if (count % 2 === 0){
                $('.favorite-btn').append('<div  class="row" id='+count+'>');
                //Create item
                $('#'+count).append('<div class="btn-favorite btn-favorite-'+count+' col-lg-6 col-md-6 col-sm-6">');
                $(".btn-favorite-"+count).append("<div class='col-lg-2 col-md-2 col-sm-2'><button type='button' title='" + addressName + "'  class='col-lg-3 col-md-3 col-sm-3  btn btn-primary btn-favorite address-btn' data-address='" + addressName + "'> <i class='fa fa-star' aria-hidden='true'></i></button> </div><div class='col-lg-9 col-md-9 col-sm-6 col-sm-offset-3 col-md-offset-0 col-lg-offset-0'> favorite address"+count+"</div></div>")
            }else{
                var countBefore = count -1;
                item = 'favorite-btn'+countBefore;
                $('#'+countBefore).append('<div class="btn-favorite btn-favorite-'+count+' col-lg-6 col-md-6 col-sm-6">');
                $(".btn-favorite-"+count).append("<div class='col-lg-2 col-md-2 col-sm-2'><button type='button' title='" + addressName + "'  class='col-lg-3 col-md-3 col-sm-3 btn btn-primary btn-favorite address-btn' data-address='" + addressName + "'> <i class='fa fa-star' aria-hidden='true'></i></button></div><div class='col-lg-9 col-md-9 col-sm-6  col-sm-offset-3 col-md-offset-0 col-lg-offset-0'> favorite address"+count+"</div></div>")
                //end row
                $(item).append('</div>');
            }
            if (count % 2 !== 0){

            }
            count++;
        })​
    })​
});


/** SET AUTH COOKIE **/
// $.cookie("test", 1, {
//     expires : 10,           //expires in 10 days
//
//     path    : '/',          //The value of the path attribute of the cookie
//                             //(default: path of page that created the cookie).
//
//     domain  : 'jquery.com',  //The value of the domain attribute of the cookie
//     //(default: domain of page that created the cookie).
//
//     secure  : true          //If set to true the secure attribute of the cookie
//                             //will be set and the cookie transmission will
//                             //require a secure protocol (defaults to false).
// });

/** Add address when u click on button**/
$(document).on('click', '.address-btn', function () {
    if ($('#search-input-from').val() !== '') {
        $('#search-input-to').val(($(this).data('address')));
        showResultsPage();
    }

});