var points = 0;

$( "#new-point-btn" ).click(function(){
  points++;
  $( "#accordion" ).append('<div class="panel panel-default" id="panel'+points+'"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" href="#collapse'+points+'">Point '+points+'</a></h4></div><div id="collapse'+points+'" class="panel-collapse collapse"><div class="panel-body"><a id="new-pair-btn" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-plus"></span>Add angle-point pair</a><a id="del-pair-btn" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-minus"></span>Delete pair</a></div></div></div>');
});

$( "#del-point-btn" ).click(function(){
  if (points>0){
    $( "#panel"+points+"" ).remove();
    points--;
  }
});
