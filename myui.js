var points = 0;

$( "#new-point-btn" ).click(function(){
  points++;
  $( "#accordion" ).append('<div class="panel panel-default" id="panel'+points+'"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" href="#collapse'+points+'">Point '+points+'</a></h4></div><div id="collapse'+points+'" class="panel-collapse collapse"><div class="panel-body">Panel Body</div><div class="panel-footer">Panel Footer</div></div></div>');
});

$( "#del-point-btn" ).click(function(){
  if (points>0){
    $( "#panel"+points+"" ).remove();
    points--;
  }
});
