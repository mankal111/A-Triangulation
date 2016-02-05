myui = {};

(function(myui){
var points = 0;

$('#alertMsg').hide();

myui.addPoint = function(){
  points++;
  $( "#accordion" ).append('<div class="panel panel-default" id="panel'+points+'"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" href="#collapse'+points+'">Point '+points+'</a></h4></div><div id="collapse'+points+'" class="panel-collapse collapse"><div class="panel-body"><a id="new-pair-btn'+points+'" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-plus"></span>Add angle-point pair</a><a id="del-pair-btn'+points+'" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-minus"></span>Delete pair</a></div></div></div>');
  $( "#new-pair-btn"+points+"" ).click(function(){
    $(this).parents("div:first").before('<form class="form-inline" class="apEntry" role="form"><div class="form-group"><label for="angle"><h5>Angle:</label><input type="text" class="form-control" id="angle" size="5">π</h5></div>&nbsp;<div class="form-group"><label for="point"><h5>Point:</label><input type="number" class="form-control" id="point" maxlength="4" style="width:100px"></h5></div></form>');
  });

  $( "#del-pair-btn"+points+"" ).click(function(){
    $(this).parents("div:first").prev().remove();
  });

  return this;
};

$( "#new-point-btn" ).click(myui.addPoint);

$( "#del-point-btn" ).click(function(){
  if (points>0){
    $( "#panel"+points+"" ).remove();
    points--;
  }
});

//loads data from obj to page
myui.loadDataToPage = function(dataObj){
  myui.clear();
  for (var point in dataObj){
    myui.addPoint();
    for (var i = 0; i < dataObj[point].length; i++){
      $("#collapse"+points+"").children("div:first").before('<form class="form-inline" class="apEntry" role="form"><div class="form-group"><label for="angle"><h5>Angle:</label><input type="text" class="form-control" id="angle" size="5" value="'+dataObj[point][i][0]+'">π</h5></div>&nbsp;<div class="form-group"><label for="point"><h5>Point:</label><input type="number" class="form-control" id="point" maxlength="4" style="width:100px" value="'+dataObj[point][i][1]+'"></h5></div></form>');
    }
  }
  myui.getTrigFromPage();
  myui.drawATriangulation();
};

myui.getTrigFromPage = function(){
  atrig = {};
  $( '#accordion' ).children().each(function(pointIndexmo){
    var pointIndex = pointIndexmo+1;
    s = $('#collapse'+(pointIndex)+ ' .form-inline');
    atrig[pointIndex]=[];
    for (var i=0; i<s.length; i++){
      newAngle = parseFloat(eval($('#angle', s[i]).val()));
      newPoint = $('#point', s[i]).val();
      atrig[pointIndex][i]=[newAngle, newPoint];
    }
  });
  return atrig;
};

myui.drawATriangulation = function(){
  ATriang = new ATriangulation(myui.getTrigFromPage());
  $('#alertMsg').hide();
  try {
    ATriang.setCartesianOfPoints(parseInt($( '#firstPointX' ).val()),
                                 parseInt($( '#firstPointY' ).val()),
                                parseInt($( '#firstEdgeLength' ).val()));
    ATriang.drawTriangulation("myCanvas");
  }
  catch(err) {
    document.getElementById("alertMsg").innerHTML = "<h5>"+err+"</h5>";
    $('#alertMsg').show();
  }
};

$( "#draw-btn" ).click(myui.drawATriangulation);

myui.clear = function(){
  document.getElementById( "accordion" ).innerHTML ="";
  points = 0;
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
};

$( "#clear-btn" ).click(myui.clear);

$( "#example-1-btn" ).click(function(){myui.loadDataToPage({1: [['1',2],['1/2',3]], 2: [['1/4',3]], 3:[]});});

$( "#example-2-btn" ).click(function(){myui.loadDataToPage({1: [['1/3',3],['8/9',2]], 2: [['1/4',3],['1/2',4]], 3:[['6/7',4]], 4:[]});});

$( "#example-3-btn" ).click(function(){myui.loadDataToPage({1: [[1/4,3],[1/2,4],[4/6,5],[1,2]], 2:[[1/2,5]], 3:[[3/4,4]], 4:[[1, 5]], 5:[]});});

$( "#example-4-btn" ).click(function(){myui.loadDataToPage({1: [['1/4',2],['3/4',3]], 2: [['3/4',4],['1',3]], 3:[['1/4',4],['1/2',6]], 4:[['1/4',5],['3/4',6]], 5:[[1,6],[3/4,7]],6:[[1/4,7]],7:[]});});

})(myui);
