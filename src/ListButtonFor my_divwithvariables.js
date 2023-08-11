let CalculationToNull = function (_variables){
   _variables.calcedInstances.at(-1).uslOutput = false; // убирает вывод последнего посчитанного элемента, принадлежащего variables

   if (_variables.calcedInstances.length != 0)
      _variables.allInstances.unshift(_variables.calcedInstances.at(-1)); // добавляет элемент, принадлежащий variables, в список для расчёта из списка посчитанных элементов

   _variables.calcedInstances.pop(); // убирает из посчитанных элементов элемент, принадлежащий  variables
}

let AddListVariables = function (_thisStructSch) {
      myDivWithVariables1.children=[];
      while (myDivWithVariables1.firstChild) {
         myDivWithVariables1.removeChild(myDivWithVariables1.lastChild);
      }

      variables.allInstances = [];

      if (_thisStructSch.arrCulcFunc[_thisStructSch.schButtonClick] instanceof Array) {
         _thisStructSch.arrCulcFunc[_thisStructSch.schButtonClick].forEach(func => func());
      }
      else {
         _thisStructSch.arrCulcFunc[_thisStructSch.schButtonClick]();
      }


      let sch=0;
      for (let num of variables.allInstances) {
         myDivWithVariables1.addElCheck();
         let checkEl = myDivWithVariables1.children[myDivWithVariables1.children.length-1].children[0];
         checkEl.parentVal = num;
         checkEl.checked = num.uslStop;

         checkEl.onchange = function (event) {
            if (event.target.checked == true) {
               this.parentVal.uslStop = true;
            }
            else {
               this.parentVal.uslStop = false;
            }
         }


         let spanEl = myDivWithVariables1.children[myDivWithVariables1.children.length-1].children[1];
         spanEl.innerHTML =  num.parent.designation
         +(function () {
            if (num==num.parent.val){
               return "";
            }
            else if (num==num.parent.maxVal){
               return " max";
            }
            else if (num==num.parent.minVal){
               return " min";
            }

         })()
         +" = ";


         num.childDiv = myDivWithVariables1.children[myDivWithVariables1.children.length-1];

         if (num.parent.uslAddInListButton == false || num.uslAddInListButton == false) {
            myDivWithVariables1.children[sch].hidden = true;
         }
         sch++;
      }

      if (_thisStructSch.uslCompleted==false){
         myDivWithVariables1.children[_thisStructSch.calcedInstances.length-1].appendChild(myDivWithVariables1.markerDiv); // добавление маркера, показывающего на какой строке остановлен расчёт
      }
}

let AddListBack = function (_variables, _thisStructSch) {
   if (_thisStructSch.calcedInstances.length > 1){
      myDivWithVariables1.children=[];
      while (myDivWithVariables1.firstChild) {
         myDivWithVariables1.removeChild(myDivWithVariables1.lastChild);
      }

      let listBack = 0
      if (_thisStructSch.uslCompleted == true){
         if (_thisStructSch.arrCulcFunc[_thisStructSch.schButtonClick] instanceof Array) {
            _thisStructSch.arrCulcFunc[_thisStructSch.schButtonClick].forEach(func => func());
            console.log(variables.allInstances);
         }
         else {
            _thisStructSch.arrCulcFunc[_thisStructSch.schButtonClick]();
         }

         _thisStructSch.calcedInstances = variables.allInstances;
      }
      listBack = _thisStructSch.calcedInstances;
      //let quantityAddListBack = (_thisStructSch.uslCompleted == true) ? _thisStructSch.calcedInstances.length : _thisStructSch.calcedInstances.length-1;


      for (let iterator=0; iterator<listBack.length-1; iterator++) {
         let num = listBack[iterator];

         if (num.parent.uslAddInListButton == true || (num.parent.uslAddInListButton == false && num.uslAddInListButton == true)) {
            myDivWithVariables1.addElBack();
            let buttonEl = myDivWithVariables1.children[myDivWithVariables1.children.length-1].children[1];
            buttonEl.parentVal = num;


            let spanEl = myDivWithVariables1.children[myDivWithVariables1.children.length-1].children[0];
            spanEl.innerHTML =  num.parent.designation
            +(function () {
               if (num==num.parent.val){
                  return "";
               }
               else if (num==num.parent.maxVal){
                  return " max";
               }
               else if (num==num.parent.minVal){
                  return " min";
               }

            })()
            +" = ";


            num.childDiv = myDivWithVariables1.children[myDivWithVariables1.children.length-1];


            buttonEl.onclick = function (event, _thisStructSch1 = _thisStructSch) {
               if (_thisStructSch1.uslCompleted==true){
                  if (_thisStructSch1.schButtonClick==_thisStructSch1.arrCulcFunc.length-1){
                     document.querySelector(_thisStructSch1.forwardButton).disabled = false;
                  }
               }


               let thisEl = event.target;
               let reverseCalcedInstances=[];

               for (let num1 of _thisStructSch1.calcedInstances) {
                  reverseCalcedInstances.push(num1)
               }
               reverseCalcedInstances.reverse();

               for (let num1 of reverseCalcedInstances) {
                  for (let iterator=0; iterator<_thisStructSch1.calcedInstances.length; iterator++) {
                     _thisStructSch1.calcedInstances[iterator].parent.uslOutput = true;

                     _thisStructSch1.calcedInstances[iterator].uslOutput = true;
                  }

                  if (num1 == thisEl.parentVal) {
                     break;
                  }
                  CalculationToNull(_thisStructSch1);
                  //variables.OutputAllInstances(arrOutputFunc[schCulc]);
                  if (_thisStructSch1.arrOutputFunc[_thisStructSch1.schButtonClick] instanceof Array) {
                     _thisStructSch.arrOutputFunc[_thisStructSch.schButtonClick].forEach(func => func());
                     console.log(variables.allInstances);
                  }
                  else {
                     OutputAllInstances(_thisStructSch1.arrOutputFunc[_thisStructSch1.schButtonClick],_thisStructSch1);
                  }
               }
               _thisStructSch1.uslCompleted = false;


               myDivWithVariables1.children=[];
               while (myDivWithVariables1.firstChild) {
                  myDivWithVariables1.removeChild(myDivWithVariables1.lastChild);
               }

               document.querySelector(_thisStructSch1.backButton).disabled = false;

               AddListVariables(_thisStructSch1);
            }
         }
      }
   }
}
