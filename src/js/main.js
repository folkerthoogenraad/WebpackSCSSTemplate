document.addEventListener("DOMContentLoaded", ()=>{
   // Do my animation stuff here!
   let element = document.querySelector("#animate");

   console.log("Hello there general kenobi");

   let fadeUp = element.querySelector("#fadeup");
   let fadeDown = element.querySelector("#fadedown");
   let circle = element.querySelector("#circle");

   let timer = 0;

   let lerp = (a, b, f) => a + (b - a) * f;

   let callback = ()=>{
      // Count in about secconds
      timer += 1/60;

      let f = timer / 2;

      if(f > 1) f = 1;

      fadeUp.setAttribute("y", "" + lerp(0, -50, f));
      fadeDown.setAttribute("y", "" + lerp(50, 100, f));

      circle.setAttribute("cx", 50 + Math.cos(f * Math.PI * 2) * 20);
      circle.setAttribute("cy", 50 + Math.sin(f * Math.PI * 2) * 20);

      if(f <= 1) requestAnimationFrame(callback);
   };

   setTimeout(callback, 1000);
});