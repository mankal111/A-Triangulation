var initializeTrigFromPage = function(){
  atrig = {};
  $( '#accordion' ).children().each(function(pointIndexmo){
    var pointIndex = pointIndexmo+1;
    s = $('#collapse'+(pointIndex)+ ' .form-inline');
    atrig[pointIndex]=[];
    for (var i=0; i<s.length; i++){
      newAngle = parseFloat($('#angle', s[i]).val());
      newPoint = $('#point', s[i]).val();
      atrig[pointIndex][i]=[newAngle, newPoint];
    }
  });
  return atrig;
};

console.log(JSON.stringify(initializeTrigFromPage()));
