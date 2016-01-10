var points = 0;

$( "#new-point-btn" ).click(function(){
  points++;
  $( "#accordion" ).append('<div class="panel panel-default" id="panel'+points+'"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" href="#collapse'+points+'">Point '+points+'</a></h4></div><div id="collapse'+points+'" class="panel-collapse collapse"><div class="panel-body"><a id="new-pair-btn'+points+'" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-plus"></span>Add angle-point pair</a><a id="del-pair-btn'+points+'" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-minus"></span>Delete pair</a></div></div></div>');
  $( "#new-pair-btn"+points+"" ).click(function(){
    $(this).parents("div:first").before('<form class="form-inline" role="form"><div class="form-group"><label for="angle"><h5>Angle:</label><input type="text" class="form-control" id="angle" size="5">π</h5></div>&nbsp;<div class="form-group"><label for="point"><h5>Points to point:</label><input type="number" class="form-control" id="point" maxlength="4"></h5></div></form>');
  });
});

$( "#del-point-btn" ).click(function(){
  if (points>0){
    $( "#panel"+points+"" ).remove();
    points--;
  }
});
