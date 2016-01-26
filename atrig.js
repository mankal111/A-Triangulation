
//A-Edge class
var AEdge = function(angle, point){
  this.angle = angle;
  this.point = point;
};
//To String method
AEdge.prototype.toString = function(){
  return "Points with angle "+this.angle+" to point "+this.point+".";
};

//A-Point class
var APoint = function(){
  this.AEdges = [];
};
//Method that adds A-Edges from array of pairs to APoint, as AEdges objects.
APoint.prototype.addAEdges = function(AEdgesAr){
  //sorts the array
  AEdgesAr.sort( function(a, b){
    var x=a[0];
    var y=b[0];
    return x-y;
  });
  //creates AEdge objects
  for (var i = 0; i < AEdgesAr.length; i++){
    var newAEdge = new AEdge(AEdgesAr[i][0],AEdgesAr[i][1]);
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
