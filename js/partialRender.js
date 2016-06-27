$("document").ready(function(){
  $(".navItem").click(function(){
    injectContentByName($(this).attr("name"));
  });
});

function injectContentByName(name){
  $.ajax({
    url:"http://localhost/proyectos/TP-WEB-1-PlayoffsNBA-2/" + name +".html",
    method:"GET",
    dataType:"html",
    success: function(resultData){
      $("#mainContent").html(resultData);
    },
    error:function(jqxml, status, errorThrown){
      console.log(errorThrown);
    }
  });
}
