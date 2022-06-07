$(function () {



    if (($("form").length > 0)) {
        $('form')[0].reset();
    }
    $('#respbtn').on('click', function (e) {

        var ativo = $(this).data('toggle');
        var newtoggle = 0;
        if (ativo == 0) {
            newtoggle = 1;
            $('header nav ul').first().stop(true, true).slideDown();
        }
        else {
            $('header nav ul').first().stop(true, true).slideUp();
        }
        $('#respbtn').data('toggle', newtoggle);
    });

});