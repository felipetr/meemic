$(function () {


    $('.btn-goto').on('click', function (e) {
      
        var goto = $(this).data('goto');

        $('section').addClass('hidedsection').removeClass('displayedsection');
        $('#'+goto+'').removeClass('hidedsection').addClass('displayedsection');
    });

   
    


});