
//A-Edge class
var AEdge = function(angle, point){
  this.angle = angle;
  this.point = point;
};

//A-Point class
var APoint = function(){
  this.AEdges = [];
};
//Method that adds A-Edges from array of pairs to APoint, as AEdges objects.
APoint.prototype.addAEdges = function(AEdges){
  //sorts the array
  AEdges.sort( function(a, b){
    var x=a[0];
    var y=b[0];
    return y-x;
  });
  //creates AEdge objects
  for (var pair in AEdges){
    var newAEdge = new AEdge(pair[0],pair[1]);
    this.AEdges.push(newAEdge);
  }
};
