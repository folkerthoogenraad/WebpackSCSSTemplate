import Vue from "vue";

import App from "../views/App.vue";

document.addEventListener("DOMContentLoaded", ()=>{
   console.log("Typescript loaded.");

   let vue = new Vue({
      el: "#app",
      components: { App }
   });
});
