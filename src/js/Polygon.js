export class Point{
   constructor(x, y){
      this.x = x;
      this.y = y;
   }
}

export default class Polygon{
   constructor(){
      /** @type {Point[]} */
      this.points = [];
   }

   toSVGPath(){
      if(this.points.length === 0) return "";
      
      let output = "";

      output += `M${this.points[0].x} ${this.points[0].y}`;

      for(let i = 1; i < this.points.length; i++){
         output += `L${this.points[i].x} ${this.points[i].y}`;
      }

      return output;
   }
}