
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
  this.pointsLeft =[0];
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
      1 - this.points[point.AEdges[edgePosition].point].AEdges.slice(-1)[0].angle;
    anglec = 1 - anglea - angleb;
  } else {
    anglec = 1 - point.AEdges[edgePosition+1].angle +
      this.points[point.AEdges[edgePosition+1].point].AEdges[0].angle;
    angleb = 1 - anglea - anglec;
  }
  distC = distB*Math.sin(anglec*Math.PI)/Math.sin(angleb*Math.PI);
  //console.log("B="+distB+", C="+distC+", a="+anglea+"π, b="+angleb+"π, c="+anglec);
  this.points[point.AEdges[edgePosition].point].setCartFromPED(point, edgePosition, distC);
};
//Set cartesian coordinates of the first edge point of triangle.
ATriangulation.prototype.setCartesianOfSecondPoint = function(point, edgePosition){
  var distC = this.points[point.AEdges[edgePosition].point].distanceFrom(point);
  var distB;
  var anglea = point.AEdges[edgePosition+1].angle - point.AEdges[edgePosition].angle;
  var angleb, anglec;
  if (point.AEdges[edgePosition].point < point.AEdges[edgePosition+1].point){
    angleb = point.AEdges[edgePosition].angle +
      1 - this.points[point.AEdges[edgePosition].point].AEdges.slice(-1)[0].angle;
    anglec = 1 - anglea - angleb;
  } else {
    anglec = 1 - point.AEdges[edgePosition+1].angle +
      this.points[point.AEdges[edgePosition+1].point].AEdges[0].angle;
    angleb = 1 - anglea - anglec;
  }
  distB = distC*Math.sin(angleb*Math.PI)/Math.sin(anglec*Math.PI);
  //console.log("B="+distB+", C="+distC+", a="+anglea+"π, b="+angleb+"π, c="+anglec);
  this.points[point.AEdges[edgePosition+1].point].setCartFromPED(point, edgePosition+1, distB);
};
//Compute cartesian coordinates of the points of the triangulation
//given the coordinates of the first point and the length of the first edge.
ATriangulation.prototype.setCartesianOfPoints = function(x,y,length){
  //Check the restrictions
  this.checkRestrictions();
  //Set cartesian coordinates of the first point
  this.points[0].setCartesian(x,y);
  //Set cartesian coordinates of the point of the first edge in distance length
  this.points[this.points[0].AEdges[0].point].setCartFromPED(this.points[0],0,length);
  this.pointsLeft.push(this.points[0].AEdges[0].point);
  while (this.pointsLeft.length > 1){
    var pointIndex = this.pointsLeft.shift();
    var point = this.points[pointIndex];
    if (point.AEdges.length !== 0){
      if (this.points[point.AEdges[0].point].hasOwnProperty("x")){
        this.setCartFromFirstEdge(point);
      } else if (this.points[point.AEdges.slice(-1)[0].point].hasOwnProperty("x")){
        this.setCartFromLastEdge(point);
      } else {
        this.pointsLeft.push(pointIndex);
      }
    }
  }
};
//Set cartesian coordinates of the neighbouring points knowing the coordinates of first edge
ATriangulation.prototype.setCartFromFirstEdge = function(point){
  for (var i = 0; i<point.AEdges.length-1; i++){
    this.setCartesianOfSecondPoint(point, i);
    if (!(point.AEdges[i+1].point in this.pointsLeft)) this.pointsLeft.push(point.AEdges[i+1].point);
  }
};
//Set cartesian coordinates of the neighbouring points knowing the coordinates of last edge
ATriangulation.prototype.setCartFromLastEdge = function(point){
  for (var i = point.AEdges.length-2; i>=0; i--){
    this.setCartesianOfFirstPoint(point, i);
    if (!(point.AEdges[i].point in this.pointsLeft)) this.pointsLeft.push(point.AEdges[i].point);
  }
};
//Draw triangulation to canvas
ATriangulation.prototype.drawTriangulation = function(canvasId){
  var canvas = document.getElementById(canvasId);
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  var startPoint, endPoint;
  ctx.fillText(1,this.points[0].x-5,600-this.points[0].y-5);
  for (var i = 0; i < this.points.length; i++){
    for (var j = 0; j < this.points[i].AEdges.length; j++){
      endPoint = this.points[this.points[i].AEdges[j].point];
      startPoint = this.points[i];
      ctx.moveTo(startPoint.x, 600-startPoint.y);
      ctx.lineTo(endPoint.x, 600-endPoint.y);
      ctx.fillText(this.points[i].AEdges[j].point+1,endPoint.x-5,600-endPoint.y-5);
      ctx.stroke();
    }
  }
};
//Check restrictions method
ATriangulation.prototype.checkRestrictions = function(){
  for (var i = 0; i < this.points.length; i++){
    var point = this.points[i];
    for (var j = 0; j < point.AEdges.length; j++){
      if (point.AEdges[j].angle <= 0 || point.AEdges[j].angle > 1) throw "At point "+(i+1)+": The angles must be in the interval (0,π].";
      if (point.AEdges[j].point < 0 || point.AEdges[j].point >= this.points.length) throw "At point "+(i+1)+": The angle-point pairs must point to an existing point.";
      if ( i >= point.AEdges[j].point) throw "At point "+(i+1)+": The angle-point pairs should not point to a previous point, since in that case we need an angle bigger than π.";
      if (j < point.AEdges.length - 1)
        if (point.AEdges[j].point < point.AEdges[j+1].point){
          if (this.points[point.AEdges[j].point].AEdges.slice(-1)[0].point !== point.AEdges[j+1].point)
            throw "Two consecutive angle-point pairs must form a triangle. The angle-point pair, with the largest angle, of "+(point.AEdges[j].point+1)+" should point to point "+(point.AEdges[j+1].point+1)+".";
          if (this.points[point.AEdges[j].point].AEdges.slice(-1)[0].angle <= point.AEdges[j+1].angle)
            throw "The angle of the angle-point pair of point "+(i+1)+" that points to point "+(point.AEdges[j+1].point+1)+", must be smaller than the angle of the angle-point pair of point "+(point.AEdges[j].point+1)+" that points to point "+(point.AEdges[j+1].point+1)+", or else they will never meet to that point.";
        } else {
          if (this.points[point.AEdges[j+1].point].AEdges[0].point !== point.AEdges[j].point)
            throw "Two consecutive angle-point pairs must form a triangle. The angle-point pair, with the smallest angle, of "+(point.AEdges[j+1].point+1)+" should point to point "+(point.AEdges[j].point+1)+".";
          if (this.points[point.AEdges[j+1].point].AEdges[0].angle >= point.AEdges[j].angle)
            throw "The angle of the angle-point pair of point "+(i+1)+" that points to point "+(point.AEdges[j].point+1)+", must be larger than the angle of the angle-point pair of point "+(point.AEdges[j+1].point+1)+" that points to point "+(point.AEdges[j].point+1)+", or else they will never meet to that point.";
        }
    }
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

