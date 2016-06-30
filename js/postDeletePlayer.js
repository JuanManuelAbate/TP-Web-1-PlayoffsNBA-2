$("document").ready(function(){
  $("#admin").click(function(){
    injectAdminHtml();
  });
  $("body").on("click", "#crear", function(){
    createPlayer();
  });
  $("body").on("click", ".deletePlayer", function(){
    deletePlayer($(this).attr("id"));
  });
});

function createPlayer(){
  event.preventDefault()
  var newPlayer = new Player($("#nombreJugador").val(),$("#posicionJugador").val(),$("#numeroJugador").val())
  var info = {
    "group":"17",
    "thing": JSON.stringify(newPlayer)
  };
  $.ajax({
    url: "http://web-unicen.herokuapp.com/api/create",
    method: "POST",
    dataType: 'JSON',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(info),
    success: function(resultData){
      $("#nombreJugador").val("")
      $("#posicionJugador").val("")
      $("#numeroJugador").val("")
      var player = new Player();
      player = JSON.parse(resultData.information.thing);
      idPlayer = resultData.information._id;
      $("#tablaJugadoresAdmin").append(createRowAdmin(player.name,player.position,player.number,idPlayer));
    },
    error:function(jqxml, status, errorThrown){
      console.log(errorThrown);
    }
  });
}

function createRowAdmin(name,position,number,id){
  return '<tr><td>'+name+'</td><td>'+position+'</td><td>'+number+'</td><td><button id="'+id+'" class="btn btn-danger center-block deletePlayer"><span class="glyphicon glyphicon-trash"></span></button></td></tr>';
}

function getJugadoresAdmin(){
  $.ajax({
    url: "http://web-unicen.herokuapp.com/api/group/17"+"?",
    method: "GET",
    contentType: "application/json; charset=utf-8",
    success: function(resultData){
      var player = new Player();
      var idPlayer = "";
      for (var i = 0; i < resultData.information.length; i++){
        player = JSON.parse(resultData.information[i].thing);
        idPlayer = resultData.information[i]._id;
        console.log(idPlayer);
        $("#tablaJugadoresAdmin").append(createRowAdmin(player.name,player.position,player.number,idPlayer));
      }
    },
    error: function(jqxml, status, errorThrown){
      console.log(errorThrown);
    }
  });
}

function injectAdminHtml(){
  $.ajax({
    url:"adminJugadores.html",
    method:"GET",
    dataType:"html",
    success: function(resultData){
      $("#mainContent").html(resultData);
      getJugadoresAdmin();
    },
    error:function(jqxml, status, errorThrown){
      console.log(errorThrown);
    }
  });
}

function deletePlayer(id){
  $.ajax({
    url: "http://web-unicen.herokuapp.com/api/delete/"+id+"?",
    method: "DELETE",
    contentType: "application/json; charset=utf-8",
    success: function(resultData){
      idButtonToDelete = "#"+id;
      $(idButtonToDelete).closest('tr').remove();
    },
    error: function(jqxml, status, errorThrown){
      console.log(errorThrown);
    }
  });
}
