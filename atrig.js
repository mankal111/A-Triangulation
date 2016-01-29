
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
    var newAEdge = new AEdge(AEdgesAr[i][0],AEdgesAr[i][1]-1);
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
//Set cartesian coordinates of the first edge point of triangle.
ATriangulation.prototype.setCartesianOfFirstPoint = function(point, edgePosition){
  var distB = this.points[point.AEdges[edgePosition+1].point].distanceFrom(point);
  var distC;
  var anglea = point.AEdges[edgePosition+1].angle - point.AEdges[edgePosition].angle;
  var angleb, anglec;
  if (point.AEdges[edgePosition].point < point.AEdges[edgePosition+1].point){
    angleb = point.AEdges[edgePosition].angle +
      Math.PI - this.points[point.AEdges[edgePosition].point].AEdges[-1].angle;
    anglec = Math.PI - anglea - angleb;
  } else {
    console.log(this.points[point.AEdges[edgePosition+1].point].AEdges[0].angle);
    anglec = Math.PI - point.AEdges[edgePosition+1].angle +
      this.points[point.AEdges[edgePosition+1].point].AEdges[0].angle;
    angleb = Math.PI - anglea - anglec;
  }
  distC = distB*Math.sin(anglec)/Math.sin(angleb);
  console.log("B="+distB+", C="+distC+", a="+anglea+"π, b"+angleb+"π, c"+anglec);
  this.points[point.AEdges[edgePosition].point].setCartFromPED(point, edgePosition, distC);
};
//To string method
ATriangulation.prototype.toString = function(){
  var str = "";
  for (var point in this.points){
    str += "\nPoint " + point  + ":\n----------------\n" + this.points[point].toString();
  }
  return str;
};

