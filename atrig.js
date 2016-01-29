
//A-Edge class
var AEdge = function(angle, point){
  this.angle = angle;
  this.point = point;
};

//A-Point class
var APoint = function(){
  this.AEdges = [];
};
//Method for setting cartesian coordinates
APoint.prototype.setCartesian = function(x, y){
  this.x=x;
  this.y=y;
};
//Method that computes distance from this point to another
APoint.prototype.distanceFrom = function(point){
  return Math.sqrt(Math.pow(this.x-point.x,2)+Math.pow(this.y-point.y, 2));
};
//Method that adds A-Edges from array of pairs to APoint, as AEdges objects.
APoint.prototype.addAEdges = function(AEdgesAr, points){
  //sorts the array
  AEdgesAr.sort( function(a, b){
    var i=a[0];
    var j=b[0];
    return i-j;
  });
  //creates AEdge objects
  for (var i = 0; i < AEdgesAr.length; i++){
    var newAEdge = new AEdge(AEdgesAr[i][0],points[AEdgesAr[i][1]-1]);
    this.AEdges.push(newAEdge);
  }
};
// Set cartesian coordinates of this point from a point,
// the edge between these points and the distance.
APoint.prototype.setCartFromPED = function(point, edgePosition, distance){
  this.setCartesian(point.x+distance*Math.sin(point.AEdges[edgePosition].angle*Math.PI),
                    point.y+distance*Math.cos(point.AEdges[edgePosition].angle*Math.PI));
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
  this.points = [];
  for (var point in dataObj){
    this.points.push(new APoint());
  }
  var i = 0;
  for (point in dataObj){
    this.points[i++].addAEdges(dataObj[point], this.points);
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

