class MyInput extends HTMLDivElement {
   connectedCallback() {
      let elBlock = this;
      this.classList.toggle("inputDivTextarea");

      let el1 = document.createElement("div");
      el1.classList.toggle("afterDivTextarea");
      el1.innerHTML = this.getAttribute('username') || "Имя не указано"

      el1.onclick = function(event){
         elBlock.style.minHeight = "20px";
         if (elBlock.style.height === el1.scrollHeight+"px") {
            elBlock.style.height = `${ elBlock.scrollHeight }px`
         } else {
            elBlock.style.height = `${ elBlock.scrollHeight }px`;
            window.getComputedStyle(elBlock, null).getPropertyValue("height");
            elBlock.style.height = el1.scrollHeight+"px";
         }
      };
      elBlock.addEventListener("transitionend", () => {
         if (elBlock.style.height !== el1.scrollHeight+"px") {
            elBlock.style.height = "auto"
         }
      });

      this.appendChild(el1);

      this.Clear = function (){
         let childrenEl = this.querySelector(".inputInputDivTextarea").children;
         let lengthChildrenEl = childrenEl.length;
         for (let iterator=0; iterator<lengthChildrenEl; iterator++){
            childrenEl[lengthChildrenEl - iterator - 1].remove();
         }
      }

      let el2 = document.createElement("div");
      el2.classList.toggle("inputInputDivTextarea");
      this.appendChild(el2);
   }
}

class MySpan extends HTMLDivElement {

   constructor(_username=null, _formula=null){
      super();
      if (_username)
         this.setAttribute('username', _username)
      if (_formula)
         this.setAttribute('formula', _formula)
   }
   connectedCallback() {
      this.classList.toggle("spanInputDivTextarea");
      this.innerHTML = this.getAttribute('username') || "Имя не указано"



      let el1 = document.createElement("div");
      el1.style.cssText=`
         //position: relative;
         width: fit-content;
         height: 100%;
         //border: 1px solid gray;
         //border-radius: 50%;
         user-select: none;
         padding-left: 5px;
         padding-right: 5px;

         display: flex;
         align-items: center;
         justify-content: center;
         font-size: 10px;
      `;
      el1.onclick = clickArrow;
      el1.innerHTML = "&#9668;"
      this.appendChild(el1)

      let el = document.createElement("div");
      el.style.cssText=`
         position: relative;
         width: fit-content;
         height: 100%;
         //border: 1px solid gray;
         //border-radius: 50%;
         user-select: none;

         display: none;
         align-items: center;
         justify-content: center;
      `;
      el.innerHTML = this.getAttribute('formula') || "Формула не указана"
      el.classList.add("arrowFormula")
      this.appendChild(el)

      clickArrow.clicked = false;
      function clickArrow(event){

         clickArrow.clicked = !clickArrow.clicked;
         if (clickArrow.clicked) {
            event.target.innerHTML = "&#9658"
            event.target.parentElement.querySelector(".arrowFormula").style.display = "flex";
         }
         else{
            event.target.innerHTML = "&#9668"
            event.target.parentElement.querySelector(".arrowFormula").style.display = "none";
         }

      }
   }
}

class MyFormulaForMySpan extends HTMLDivElement {

   constructor(_formula=null){
      super();
      if (_formula)
         this.setAttribute('formula', _formula)
   }
   connectedCallback() {
      this.classList.toggle("spanInputDivTextarea");
      this.innerHTML = this.getAttribute('formula') || "Формула не указана"
   }
}

class MyButton extends HTMLButtonElement {
   connectedCallback() {
      this.setAttribute('boolclicked', 'false');
      this.addEventListener(
         "click",
         function(event){
            let element = event.target;
            if (element.getAttribute('boolclicked') == 'false') {
               //element.innerHTML = 'Вверх';
               element.setAttribute('boolclicked', 'true');
            }
            else {
               if (element.getAttribute('mainText') != "" && element.getAttribute('mainText') != undefined)
               element.innerHTML = element.getAttribute('mainText');
               else
               //element.innerHTML = 'Рассчитать';
               element.setAttribute('boolclicked', 'false');
            }
         }
         ,false
      )

      this.CalcFunc = function(event){
         let sayHi = new Function(this.getAttribute('my-calcfunc'));

         sayHi(); // Hello
      }
   }
}

class MyDivWithVariables extends HTMLDivElement {
   connectedCallback() {
      this.classList.toggle("myDivWithVariables");

      this.addElCheck = function(){
         let el2 = document.createElement("div");
         el2.classList.toggle("zxc");
         this.appendChild(el2);

         const checkBox = document.createElement('input');
         checkBox.type = 'checkbox';
         checkBox.style.cssText = "margin: 0; padding: 0; height: 20px; width: 20px;";
         el2.appendChild(checkBox);

         const spanQ  = document.createElement('span');
         spanQ.style.cssText = "width: auto; height: 100%; margin-left: 5px;";
         spanQ.innerHTML= 'qqqsdfsdfdssfd';
         el2.appendChild(spanQ);

         const inputQ  = document.createElement('input');
         inputQ.style.cssText = "width: 50px; height: 100%; margin-left: 5px; box-sizing: border-box;";
         el2.appendChild(inputQ);

         const inputQ1  = document.createElement('input');
         inputQ1.style.cssText = "width: 50px; height: 100%; margin-left: 5px; box-sizing: border-box;";
         el2.appendChild(inputQ1);

         const inputQ2  = document.createElement('input');
         inputQ2.style.cssText = "width: 50px; height: 100%; margin-left: 5px; box-sizing: border-box;";
         el2.appendChild(inputQ2);

         this.markerDiv=document.createElement("div");
         this.markerDiv.style.cssText = "margin-left: auto; top:50%; width: 10px; height: 10px; border-radius: 50%; background: red;";
      }

      this.addElBack = function(){
         let el2 = document.createElement("div");
         el2.classList.toggle("zxc");
         this.appendChild(el2);

         const spanQ  = document.createElement('span');
         spanQ.style.cssText = "width: auto; height: 100%; margin-left: 5px;";
         spanQ.innerHTML= 'qqqsdfsdfdssfd';
         el2.appendChild(spanQ);

         const inputQ  = document.createElement("input");
         inputQ.type = "button";
         inputQ.style.cssText = "width: 50px; height: 20px; margin-left: 5px;";
         //inputQ.style.height = "18px";
         el2.appendChild(inputQ);
      }
   }
}

customElements.define("my-input", MyInput, {extends: 'div'});
customElements.define("my-span", MySpan, {extends: 'div'});
customElements.define("my-formula-for-my-span", MyFormulaForMySpan, {extends: 'div'});
customElements.define("my-button", MyButton, {extends: 'button'});
customElements.define("my-divwithvariables", MyDivWithVariables, {extends: 'div'});
