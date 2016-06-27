$("document").ready(function(){
  $("body").on("click", "#playersGoldenState", function(){
      getJugadores();
  });
});

function Player(name, position, number){
  this.name = name;
  this.position = position;
  this.number = number;
}

function createRow(name,position,number){
  return "<tr><td>"+name+"</td><td>"+position+"</td><td>"+number+"</td></tr>";
}

function getJugadores(){
  $.ajax({
    url: "http://web-unicen.herokuapp.com/api/group/17"+"?",
    method: "GET",
    contentType: "application/json; charset=utf-8",
    success: function(resultData){
      var table = '<table class="table table-bordered table-responsive"><thead><tr><th>Nombre</th><th>Posicion</th><th>Numero</th></tr></thead><tbody>';
      var player = new Player();
      for (var i = 0; i < resultData.information.length; i++){
        player = JSON.parse(resultData.information[i].thing);
        table = table + createRow(player.name,player.position,player.number);
      }
      table = table + "</tbody></table>";
      $("#mainContent").html(table);
    },
    error: function(jqxml, status, errorThrown){
      console.log(errorThrown);
    }
  });
}
