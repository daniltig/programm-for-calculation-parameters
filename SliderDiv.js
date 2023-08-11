const sections = document.querySelectorAll(".flippingThroughSlides");
let selectEl = selectFlippingThroughButton;

(function (){
   let iterator = 0;
   for (let num of document.querySelectorAll(".flippingThroughButtons")) {
      let it = iterator;
      num.onclick = function (event, _iterator=it) {
         let thisEl = event.target;
         sections[_iterator].scrollIntoView({inline: "start", behavior: "smooth"});

         selectEl.classList.toggle("clickFlippingThroughButton");
         thisEl.classList.toggle("clickFlippingThroughButton");

         selectEl = thisEl;
      }

      iterator++;
   }
})();
