import Polygon, {Point} from "./Polygon";

document.addEventListener("DOMContentLoaded", ()=>{
   // Do my animation stuff here!
   let element = document.querySelector("#animate");

   console.log("Hello there general kenobi");

   let fadeUp = element.querySelector("#fadeup");
   let fadeDown = element.querySelector("#fadedown");
   let circle = element.querySelector("#circle");
   let dynamic = element.querySelector("#dynamic");

   let polygon = new Polygon();
   const subdivisions = 600;
   

   for(let i = 0; i < subdivisions; i++){
      let dist = 50;
      let s = Math.sin(i / subdivisions * Math.PI * 2);
      let c = Math.cos(i / subdivisions * Math.PI * 2);

      let point = new Point(50 + c * dist, 50 + s * dist);

      polygon.points.push(point);
   }

   dynamic.setAttribute("d", polygon.toSVGPath());

   let timer = 0;

   let lerp = (a, b, f) => a + (b - a) * f;

   let callback = ()=>{
      // Count in about secconds
      timer += 1/60;

      let f = timer / 2;

      // f %= 1;

      // fadeUp.setAttribute("style", "transform:rotate(90deg); transform-origin:50% 100%");
      // fadeDown.setAttribute("style", "transform:rotate(90deg); transform-origin:50% 100%");

      fadeUp.setAttribute("y", "" + lerp(0, -10, Math.sin(f * 8) * 0.5 + 0.5));
      fadeDown.setAttribute("y", "" + lerp(50, 60, Math.sin(f * 8) * 0.5 + 0.5));

      circle.setAttribute("r", Math.sin(f * 6) * 10 + 10);

      for(let i = 0; i < subdivisions; i++){
         let dist = Math.sin(f * 100 * i / subdivisions) * 20 + 30;

         let s = Math.sin(i / subdivisions * Math.PI * 2);
         let c = Math.cos(i / subdivisions * Math.PI * 2);
   
         let point = new Point(50 + c * dist, 50 + s * dist);
   
         polygon.points[i] = point;
      }
      
      dynamic.setAttribute("d", polygon.toSVGPath());

      // circle.setAttribute("cx", 50 + Math.cos(f * Math.PI * 2) * 20);
      // circle.setAttribute("cy", 50 + Math.sin(f * Math.PI * 2) * 20);

      // if(f <= 1) 
      requestAnimationFrame(callback);
   };

   setTimeout(callback, 1000);
});