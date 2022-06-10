function movecam(pos)
{
    var tile = "tile"+pos;
        if (pos == 0 || pos == 58)
        {
            tile = "start"
        }
        

    $('#boardpagemove').removeClass().addClass(tile+'cam');
    
}
var  contagem;
function moveplayer(pos, player)
{


    var team1name = localStorage.getItem('team1name');
        var team1color = localStorage.getItem('team1color');
        var team2name = localStorage.getItem('team2name');
        var team2color = localStorage.getItem('team2color');
        var team1pos =  localStorage.getItem('team1pos');
        var team2pos =   localStorage.getItem('team2pos');

    var tile = "tile"+pos;
    if (pos == 0 || pos == 48)
    {
        tile = "start"
    }

  

    console.log("time: "+player);
     $('#team'+player+'pin').removeClass().addClass(tile+'position');
     var teamcolor;
     var teamname;

     if(player == 1)
     { team1pos = pos;
        localStorage.setItem('team1pos',pos);
        teamcolor = team1color;
        teamname = team1name;
     } else
     {
        team2pos = pos;
        localStorage.setItem('team2pos',pos);

        teamcolor = team2color;
        teamname = team2name;
     }
     movecam(pos);

     localStorage.setItem('continuegame', 0);


     console.log(pos)
     if(pos == 48)
     {
        $('#continuegame').hide();

        setTimeout(function() { 
         
            $('#ganhou').removeClass().addClass('text-'+teamcolor);
            $('#ganhou span').html(teamname);
        $('section').addClass('hidedsection').removeClass('displayedsection');
        $('#victory').removeClass('hidedsection').addClass('displayedsection');
       
        $(".sound_won").trigger('play');

        }, 500);


     }


}

function changeturn(x)
{

    localStorage.setItem('turn', x);

    var team1name = localStorage.getItem('team1name');
    var team1color = localStorage.getItem('team1color');
    var team2name = localStorage.getItem('team2name');
    var team2color = localStorage.getItem('team2color');
    var team1pos =  localStorage.getItem('team1pos');
    var team2pos =   localStorage.getItem('team2pos');

    var playerpos = 0;
    if(x == 1)
    {
        turnname = team1name;
        turncolor = team1color;
        playerpos = team1pos;
    }
    else
    {
        turnname = team2name;
        turncolor = team2color;
        playerpos = team2pos;
    }
    $('#inturn').removeClass().addClass('text-'+turncolor);
    $('#inturn span').html(turnname);
    $('#inturnbtn').removeClass().addClass('btn pl-4 pr-4 btn-lg btn-'+turncolor);
    $('#showroleta').hide();

    setTimeout(function() { 
        $('.teamwon').slideDown();

        
        movecam(playerpos);

    $('#ui').addClass('showed');
   
    }, 1000);

    
}


$(function () {

    $(".sound_10s").trigger('load');
    $(".sound_drag").trigger('load');
    $(".sound_spin").trigger('load');
    $(".sound_start").trigger('load');
    $(".sound_won").trigger('load');

    var continuar = localStorage.getItem('continuegame');

    if(continuar)
    {
        $('#continuegame').show();
    }
   

    $('.teamnames').on('change', function (e) { 
        $(this).removeClass('unchanged');

    });
    var teamnamestempval = '';
  
    $('.teamnames').on('focus', function (e) {
        if($(this).hasClass("unchanged"))
        {
            teamnamestempval = $(this).val();
            $(this).val('');
        }

     });
     $('.teamnames').on('blur', function (e) {
         if(!$(this).val())
         {
             $(this).val(teamnamestempval);
             $(this).addClass('unchanged');
         }
     });
     
    

   
    $('.btn-goto').on('click', function (e) {
      
        var goto = $(this).data('goto');

        $('section').addClass('hidedsection').removeClass('displayedsection');
        $('#'+goto).removeClass('hidedsection').addClass('displayedsection');


        if(goto == 'board')
        {
            $('#ui').addClass('showed');
        }
    });
    $('.btn-selector').on('click', function (e) {
 
        if($(this).hasClass("disabled") || $(this).hasClass("selected"))
        {}else
        {
        
        var thisparentbox = $(this).parents('.teambox'),
        dataselect = $(this).data('select'),
        datatext = $(this).data('title'),
        team = thisparentbox.data('team'),
        teamnameinput = $('#'+team+' .teamnames'),
        inputcolor = $('#'+team+' .color'),
        anotherteam = 'team2';

        if(anotherteam == team)
        {
            anotherteam = "team1";
        }
        
        
              

        $('#'+team+' .btn-selector').removeClass('selected');


        $('#'+anotherteam+' .btn-selector').removeClass('disabled');
        $('#'+team+'pin svg').removeClass().addClass('fill-'+dataselect);
        $('#'+anotherteam+' .'+dataselect).addClass('disabled');

        

        $(this).addClass('selected');

        inputcolor.val(dataselect);

        if(teamnameinput.hasClass("unchanged")){

            teamnameinput.val(datatext);
            teamnameinput.addClass("unchanged");
        }
    }

    });
    
    
    

    $('#continuegame button').on('click', function (e) {

        $('#ui').removeClass().addClass('showed');
        var team1name = localStorage.getItem('team1name');
        var team1color = localStorage.getItem('team1color');
        var team2name = localStorage.getItem('team2name');
        var team2color = localStorage.getItem('team2color');
        var team1pos =  localStorage.getItem('team1pos');
        var team2pos =   localStorage.getItem('team2pos');
        var turn =  localStorage.getItem('turn');


        moveplayer(team1pos, 1);
        moveplayer(team2pos, 2);


        changeturn(turn);

        $('section').addClass('hidedsection').removeClass('displayedsection');
        $('#board').removeClass('hidedsection').addClass('displayedsection');


    });
    $('.btn-startgame').on('click', function (e) { 
        
        team1name = $('#team1 .name').val(),
        team1color = $('#team1 .color').val(),
        team2name = $('#team2 .name').val(),
        team2color = $('#team2 .color').val(),
        team1pos = 0,
        team2pos = 0;

      

        localStorage.setItem('team1name', team1name);
        localStorage.setItem('team1color', team1color);
        localStorage.setItem('team2name', team2name);
        localStorage.setItem('team2color', team2color);
        localStorage.setItem('team1pos', team1pos);
        localStorage.setItem('team2pos', team2pos);
        localStorage.setItem('continuegame', 1);
        $('#continuegame').show();


        $('#team1pin').addClass('startposition');
        $('#team2pin').addClass('startposition');
        $('#boardpagemove').addClass('startcam');
       
        var goto = 'randplayer';


        $('#randroulette1').addClass('bg-'+team1color);
        $('#randroulette2').addClass('bg-'+team2color);

        $('section').addClass('hidedsection').removeClass('displayedsection');
        $('#'+goto).removeClass('hidedsection').addClass('displayedsection');

        



        let x = Math.floor((Math.random() * 2) + 1);

        $('.randroulletpin').addClass('rotate'+x);
        $(".sound_spin").trigger('play');
      

        


        changeturn(x);
        

        $('#startteamname').html($('#team'+x+' .name').val());

    
     
var turnname, turncolor;
       


        setTimeout(function() { 
            $('.teamwon').slideDown();

        }, 4000);


    });
    
 
    $('#inturnbtn').on('click', function (e) {
        $('#ui').removeClass();
        $('#showroleta').removeClass().show();
        $('#roletaboxparent').show();
        $(".sound_spin").trigger('play');
        $('#qrcodearea, #counterarea, #resultarea').hide();

      

       
          
            var player = localStorage.getItem('turn');

            var playerpos = localStorage.getItem('team1pos');
            if(player == 2)
            {
                playerpos = localStorage.getItem('team2pos');
            }
            console.log(playerpos);

            var x;

            x = Math.floor((Math.random() * 6));

            if(playerpos > "43")
            {
                 x = Math.floor((Math.random() * 6));
                
            }
      
            if(playerpos == "43")
            {
                 x = Math.floor((Math.random() * 5) + 1);
                
                
            }
            if(playerpos == "44")
            {
                 x = Math.floor((Math.random() * 4) + 2);
                
            }
            if(playerpos == "45")
            {
                 x = Math.floor((Math.random() * 3) + 3);
               
            }
            if(playerpos == "46")
            {
                 x = Math.floor((Math.random() * 2) + 4);
              
            }

            if(playerpos == "47")
            {
                 x = 5;
                console.log(x);
            }
            console.log(x);

            localStorage.setItem('tipo',x);

            $('#showroleta').addClass('gamerotate'+x);
            setTimeout(function() { 
                $('#openqrcodearea').slideDown();
                var jsonorigem;
                if(x == 0)
                {
                    jsonorigem = json0;
                }
                if(x == 1)
                {
                    jsonorigem = json1;
                }
                if(x == 2)
                {
                    jsonorigem = json2;
                }
                if(x == 3)
                {
                    jsonorigem = json3;
                }
                if(x == 4)
                {
                    jsonorigem = json4;
                }
                if(x == 5)
                {
                    jsonorigem = json5;
                }
                var values = Object.values(jsonorigem);

                var randomValue = values[parseInt(Math.random() * values.length)];

                localStorage.setItem('palavra', randomValue);

                $('#qrcodeCanvas').html('');
                $('#qrcodeCanvas').qrcode({
                   width: 300,
                   height: 300,
                   text: randomValue
                });

                $('#resultext').html(randomValue);


             }, 4000);
    });
   
  
    $('#openqrcodearea button').on('click', function (e) { 
        $('#roletaboxparent').slideUp();
        setTimeout(function() { 
        $('#qrcodearea').slideDown();  }, 500);
    
    });
    

    $('#acertou').on('click', function (e) {
        $('#counterarea').slideUp();
        setTimeout(function() { 
            $('#resultarea').slideDown();
         }, 500);
         clearInterval(contagem);
         localStorage.setItem('moveplayer', 1);


         $(".sound_10s").trigger('pause').prop("currentTime",0);

    
    
    });
    

    $('#errou').on('click', function (e) {
        $(".sound_10s").trigger('pause').prop("currentTime",0);


        
        clearInterval(contagem);
        $('#counterarea').slideUp();
        localStorage.setItem('moveplayer', 0);
        setTimeout(function() { 
            $('#resultarea').slideDown();
         }, 500);


    
    });


    $('#fazermimica').on('click', function (e) { 
        $('#qrcodearea').slideUp();
     
        $(".sound_start").trigger('play');
        $('#counterarea h2').hide();
        $('#botoes').hide();

        $('#secondscount').html('5<br><small>PREPARAR!</small>');
        var contador = 65;
        
        $('#plural').html('s');
  contagem = setInterval(function(){ 
            contador = contador-1;

            
            
            if (contador == 11)
            {
            
                $(".sound_10s").trigger('play');
            }

            if(contador < 2)
            {
                $('#plural').html('');
            }
            if (contador == 0)
            {
                clearInterval(contagem);
            }

            

            

            if(contador > 60)
            {
                var contadorn = contador - 60;
                $('#counterarea h2').hide();

                $('#secondscount').html(contadorn+'<br><small>PREPARAR!</small>');
            }else
            {
                $('#secondscount').html(contador);
                $('#counterarea h2').show();
                $('#botoes').show();
            }

         }, 1000);

        setTimeout(function() { 
            $('#counterarea').slideDown();  }, 500);

     });

     
    $('#nextplayer').on('click', function (e) {
        
        var team1name = localStorage.getItem('team1name');
        var team1color = localStorage.getItem('team1color');
        var team2name = localStorage.getItem('team2name');
        var team2color = localStorage.getItem('team2color');
        var team1pos =  localStorage.getItem('team1pos');
        var team2pos =   localStorage.getItem('team2pos');

        var x = localStorage.getItem('turn');
        var nexpl = 1;
        var playerpos = team2pos;
        if(nexpl == x)
        {
            playerpos = team1pos;
            nexpl = 2;
        }
        clearInterval(contagem);
       var acertou = localStorage.getItem('moveplayer');
       
       if(acertou == 1)
       {
           var tipo = localStorage.getItem('tipo');
       

           var listanum = casas0;

           if(tipo == 1)
           {
            listanum = casas1;
           }
           if(tipo == 2)
           {
            listanum = casas2;
           }
           if(tipo == 3)
           {
            listanum = casas3;
           }
           if(tipo == 4)
           {
            listanum = casas4;
           }
           if(tipo == 5)
           {
            listanum = casas5;
           }


           var nexttile = playerpos;
           var jaachou = 0;
           for (let value of listanum) {
               if(playerpos < value && jaachou == 0 )
               {
                nexttile = value;
                jaachou = 1;
               }
          }
          $(".sound_drag").trigger('play');

          moveplayer(nexttile, x);
         
           
       }

       

        changeturn(nexpl);
        
     });
});