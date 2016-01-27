
//A-Edge class
var AEdge = function(angle, point){
  this.angle = angle;
  this.point = point;
};
//To String method
AEdge.prototype.toString = function(){
  return "Points with angle "+this.angle+" to point.";
};

//A-Point class
var APoint = function(){
  this.AEdges = [];
};
//Method that adds A-Edges from array of pairs to APoint, as AEdges objects.
APoint.prototype.addAEdges = function(AEdgesAr, points){
  //sorts the array
  AEdgesAr.sort( function(a, b){
    var x=a[0];
    var y=b[0];
    return x-y;
  });
  //creates AEdge objects
  for (var i = 0; i < AEdgesAr.length; i++){
    var newAEdge = new AEdge(AEdgesAr[i][0],points[AEdgesAr[i][1]]);
    this.AEdges.push(newAEdge);
  }
};
//To String method
APoint.prototype.toString = function(){
  str = "";
  for (var i = 0; i<this.AEdges.length; i++){
    str += "Angle number " + (i+1) + ": " + this.AEdges[i].toString() + "\n";
  }
  return str;
};

//A-Triangulation class
var ATriangulation = function(dataObj){
  this.points = {};
  for (var point in dataObj){
    this.points[point] = new APoint();
  }
  for (point in dataObj){
    this.points[point].addAEdges(dataObj[point], this.points);
  }
};
//To string method
ATriangulation.prototype.toString = function(){
  var str = "";
  for (var point in this.points){
    str += "\nPoint " + point  + ":\n----------------\n" + this.points[point].toString();
  }
  return str;
};

